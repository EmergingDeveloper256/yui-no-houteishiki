import { NextResponse } from "next/server";
import { getKyuseiKeywords } from "../../../utils/kyuseiLogic";
import { getTopic } from "../../../utils/topics";

// ==========================================
// セキュリティ: インメモリ レート制限
// 本番では Redis 等の外部ストアを推奨
// ==========================================
const rateMap = new Map(); // key: IP, value: { count, resetAt }
const RATE_LIMIT = 10; // リクエスト上限
const RATE_WINDOW_MS = 60_000; // 1分間

function getRateLimitResult(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= RATE_LIMIT) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count++;
  return { allowed: true };
}

export async function POST(req) {
  // ----- レート制限チェック -----
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const rl = getRateLimitResult(ip);

  if (!rl.allowed) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。しばらくお待ちください。" },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfter) },
      },
    );
  }

  // ----- 入力バリデーション -----
  // クライアントからは生のプロンプトではなく、パラメータのみ受け取る
  // （プロンプトインジェクション防止のため、プロンプトはサーバー側で構築する）
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { type, selfDob, partnerDob, selfName, partnerName } = body;

  // 型チェック・長さ制限
  if (
    typeof type !== "string" ||
    !["love", "affair", "moving", "work"].includes(type)
  ) {
    return NextResponse.json({ error: "Invalid type." }, { status: 400 });
  }
  if (typeof selfDob !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(selfDob)) {
    return NextResponse.json(
      { error: "Invalid selfDob format." },
      { status: 400 },
    );
  }
  // 名前は最大20文字に制限（インジェクション対策）
  const safeSelfName = (selfName ?? "あなた").slice(0, 20).replace(/[<>]/g, "");
  const safePartnerName = (partnerName ?? "あの人")
    .slice(0, 20)
    .replace(/[<>]/g, "");

  // ----- プロンプトをサーバー側で構築 -----
  const topic = getTopic(type);
  const kyusei = getKyuseiKeywords(selfDob, partnerDob, type);

  const prompt = buildPrompt({
    topic,
    kyusei,
    selfName: safeSelfName,
    partnerName: safePartnerName,
    selfDob,
    partnerDob,
  });

  // ----- Gemini API 呼び出し -----
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. Using mock response.");
    return NextResponse.json(getMockResponse(kyusei));
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { response_mime_type: "application/json" },
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Empty response from Gemini");

    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(getMockResponse(kyusei));
  }
}

// プロンプトはすべてサーバー側で生成（外部からの操作不可）
function buildPrompt({
  topic,
  kyusei,
  selfName,
  partnerName,
  selfDob,
  partnerDob,
}) {
  return `
あなたは優れた占い師であり、九星気学とAIを融合させた「結の方程式」というサービスのAIエンジンです。
以下の情報を元に、ユーザーに寄り添う、自然で深い洞察に基づいた占い結果を生成してください。

【ユーザー情報】
- 相談内容: ${topic.label}
- ユーザー名: ${selfName}
- ユーザーの生年月日: ${selfDob}
- ユーザーの九星: ${kyusei.self.honmei.name} (月命星: ${kyusei.self.getsumei.name})
${partnerDob ? `- 相手の名前: ${partnerName}\n- 相手の九星: ${kyusei.partner?.honmei.name}` : ""}

【占いの指針】
${topic.promptHint}

【制約事項】
1. 相手との九星気学的な相性や運勢を具体的に織り交ぜてください。
2. 専門用語を使いつつ、分かりやすく心に響く文章にしてください。
3. 以下のJSONフォーマットのみで返答してください（他のテキストは不要）：
{"summary":"150文字程度の要約","detail":"400文字程度の詳細","affinity":数値0-100}
`;
}

function getMockResponse(kyusei) {
  const selfStar = kyusei?.self?.honmei?.name ?? "本命星";
  return {
    summary: `${selfStar}のあなたの元に、今、運命の波動が届いています。AIの解析によると、内面を整えることで外部との同期がスムーズになる時期です。`,
    detail: `九星気学の観点から見ると、${selfStar}のあなたは強い意志と柔軟性を持ちます。今は「静」の時。${kyusei?.self?.getsumei?.name ?? "月命星"}の影響で感情が揺れやすい場面もありますが、自分を信じて進むことで、望む未来へと方程式は解かれていくでしょう。`,
    affinity: 70 + (new Date().getDate() % 25),
  };
}
