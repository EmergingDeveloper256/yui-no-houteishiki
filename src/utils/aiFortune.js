/**
 * AIによる占い文章生成の制御
 */
import { getTopic } from "./topics";
import { getKyuseiKeywords } from "./kyuseiLogic";

export async function generateAIFortune(params) {
  const { type, selfDob, partnerDob, selfName, partnerName } = params;
  const topic = getTopic(type);
  const kyusei = getKyuseiKeywords(selfDob, partnerDob, type);

  // プロンプト構築
  const prompt = `
あなたは優れた占い師であり、九星気学とAIを融合させた「結の方程式」という占いサービスのAIエンジンです。
以下の情報を元に、ユーザーに寄り添う、自然で深い洞察に基づいた占い結果を生成してください。

【ユーザー情報】
- 相談内容: ${topic.label} (${type})
- ユーザー名: ${selfName || "あなた"}
- ユーザーの生年月日: ${selfDob}
- ユーザーの九星: ${kyusei.self.honmei.name} (月命星: ${kyusei.self.getsumei.name})
${partnerDob ? `- 相手の名前: ${partnerName || "あの人"}\n- 相手の九星: ${kyusei.partner.honmei.name} (月命星: ${kyusei.partner.getsumei.name})` : ""}

【占いの指針】
${topic.promptHint}

【制約事項】
1. 相手との九星気学的な相性や運勢のバイオリズムを具体的に織り交ぜてください。
2. 専門用語（本命星、月命星など）を使いつつ、一般の人が読んでも分かりやすく、心に響く文章にしてください。
3. 占い結果の形式は以下のJSONフォーマットで返してください。
{
  "summary": "150文字程度の要約。ユーザーへの最初の寄り添いと核心。",
  "detail": "400文字程度の詳細。具体的な時期やアクション、九星の解説を含む。",
  "affinity": 0から100の数値（相性または運気の強さ）
}
`;

  // プロンプトはサーバー側で構築するため、パラメータのみ送信
  try {
    const response = await fetch("/api/fortune", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        selfDob,
        partnerDob,
        selfName,
        partnerName,
      }),
    });

    if (response.status === 429) {
      console.warn("Rate limited");
      return getFallbackFortune(kyusei, topic, partnerName);
    }

    if (!response.ok) throw new Error("AI API Error");
    return await response.json();
  } catch (error) {
    console.error("AI Generation failed, using fallback:", error);
    return getFallbackFortune(kyusei, topic, partnerName);
  }
}

function getFallbackFortune(kyusei, topic, partnerName) {
  // AIが失敗した時のための動的なテンプレート（従来よりは高度）
  const selfStar = kyusei.self.honmei.name;
  return {
    summary: `${kyusei.self.honmei.name}のあなたの元に、今、${topic.label}に関する運命の波動が届いています。AIの解析によると、現在は内面を整えることで外部との同期がスムーズになる時期です。`,
    detail: `九星気学の観点から見ると、${selfStar}のあなたは本来、強い意志と柔軟性を兼ね備えています。${partnerName ? partnerName + "さんとの関係" : topic.label}においては、焦りは禁物です。今は「静」の時。${kyusei.self.getsumei.name}の影響で感情が揺れやすい場面もありますが、自分を信じて進むことで、望む未来へと方程式は解かれていくでしょう。`,
    affinity: 70 + (new Date().getDate() % 25),
  };
}
