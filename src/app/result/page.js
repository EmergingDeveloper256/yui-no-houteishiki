"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { TOPICS } from "../../utils/topics";
import { getKyuseiInfo } from "../../utils/kyuseiLogic";
import { generateAIFortune } from "../../utils/aiFortune";
import "../globals.css";

function ResultContent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const type = searchParams.get("type");
    const selfDob = searchParams.get("selfDob");
    const partnerDob = searchParams.get("partnerDob");
    const selfName = searchParams.get("selfName");
    const partnerName = searchParams.get("partnerName");

    if (typeof window !== "undefined" && !shareUrl) {
      setShareUrl(window.location.origin);
    }

    const timer = setTimeout(async () => {
      try {
        const data = await generateAIFortune({
          selfDob,
          partnerDob,
          selfName,
          partnerName,
          type,
        });

        // 九星情報を付加
        const kyusei = getKyuseiInfo(selfDob);
        setResult({
          ...data,
          kyusei: kyusei,
          typeLabel: TOPICS[type]?.label || "総合精密鑑定",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const getShareText = () => {
    if (!result) return "";
    const name = searchParams.get("partnerName") || "自分";
    const topic = TOPICS[searchParams.get("type")]?.label || "AI鑑定";
    return `【結の方程式】${topic}の結果、私の運勢指数は ${result.affinity}% でした！本命星は「${result.kyusei?.honmei?.name}」。あなたの運命もAIで占ってみませんか？ #AI占い #九星気学`;
  };

  const shareX = () => {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(shareUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
    );
  };

  const shareLine = () => {
    const text = encodeURIComponent(getShareText() + " " + shareUrl);
    window.open(
      `https://social-plugins.line.me/lineit/share?url=${text}`,
      "_blank",
    );
  };

  if (loading) {
    return (
      <div
        style={{
          height: "60vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="ai-spinner"></div>
        <p
          className="scanning-label"
          style={{ marginTop: "2rem", letterSpacing: "2px" }}
        >
          DECRYPTING_DESTINY_DATA...
        </p>
        <style jsx>{`
          .ai-spinner {
            width: 60px;
            height: 60px;
            border: 1px solid var(--accent);
            position: relative;
            animation: rotate 10s infinite linear;
          }
          .ai-spinner::after {
            content: "";
            position: absolute;
            top: 8px;
            left: 8px;
            right: 8px;
            bottom: 8px;
            border: 1px solid var(--accent-blue);
            animation: rotate 5s infinite reverse linear;
          }
          @keyframes rotate {
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (!result)
    return (
      <div
        className="scanning-label"
        style={{ textAlign: "center", padding: "5rem" }}
      >
        ERROR: DESTINY_INDEX_NOT_FOUND
      </div>
    );

  return (
    <>
      {/* 景品表示法・ステマ規制対応の広告表記 */}
      <div
        style={{
          textAlign: "center",
          padding: "0.4rem",
          background: "rgba(0,0,0,0.4)",
          fontSize: "0.65rem",
          color: "rgba(212,175,55,0.6)",
          letterSpacing: "2px",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
          marginBottom: "1rem",
        }}
      >
        【PR】本ページにはプロモーションが含まれています
      </div>

      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div className="scanning-label" style={{ marginBottom: "0.6rem" }}>
          Analysis_Report_Verified
        </div>
        <h1 className="title-mystic" style={{ marginBottom: "1rem" }}>
          鑑定結果報告書
        </h1>

        <div
          style={{
            margin: "1.5rem auto",
            width: "min(75vw, 220px)",
            height: "min(75vw, 220px)",
            borderRadius: "50%",
            border: "4px double var(--accent)",
            background:
              "radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 0 30px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(212, 175, 55, 0.1)",
          }}
        >
          <span className="scanning-label" style={{ fontSize: "0.65rem" }}>
            FORTUNE_INDEX
          </span>
          <div
            style={{
              fontSize: "clamp(3rem, 14vw, 4.2rem)",
              fontWeight: "900",
              color: "var(--accent)",
              textShadow: "0 0 15px var(--accent-glow)",
              lineHeight: "1",
            }}
          >
            {result.affinity}
            <span style={{ fontSize: "1.2rem" }}>%</span>
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              color: "#fff",
              opacity: 0.7,
              marginTop: "0.4rem",
              letterSpacing: "1px",
            }}
          >
            {result.kyusei?.honmei?.name}
          </span>
          <span
            style={{
              fontSize: "0.6rem",
              color: "var(--accent)",
              opacity: 0.8,
              marginTop: "0.2rem",
            }}
          >
            {result.typeLabel}
          </span>
        </div>
      </header>

      {/* 鑑定結果セクション */}
      <section className="mystic-card" style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            borderBottom: "1px solid rgba(212,175,55,0.1)",
            paddingBottom: "0.8rem",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              color: "var(--accent)",
              fontSize: "1.1rem",
              fontFamily: "serif",
            }}
          >
            &gt; AI鑑定の助言
          </h2>
          <div className="scanning-label" style={{ fontSize: "0.6rem" }}>
            Accuracy: {result.accuracy}
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            padding: "1.5rem",
            borderRadius: "4px",
            borderLeft: "3px solid var(--accent)",
          }}
        >
          <p
            style={{
              fontSize: "1rem",
              lineHeight: "1.9",
              color: "#f0e0ff",
              fontFamily: "serif",
            }}
          >
            {result.summary}
          </p>
        </div>

        <div
          style={{
            marginTop: "2rem",
            color: "#fff",
            opacity: 0.9,
            fontSize: "0.9rem",
            lineHeight: "1.7",
          }}
        >
          <p>{result.detail}</p>
        </div>

        {/* アフィリエイト誘導 */}
        {(() => {
          const topic = TOPICS[searchParams.get("type")] || TOPICS.love;
          const affiliate = topic.affiliate;
          return (
            <div
              style={{
                position: "relative",
                background: "rgba(0,0,0,0.6)",
                padding: "1.5rem",
                border: "1px solid var(--accent)",
                marginTop: "3rem",
                boxShadow: "0 0 30px rgba(0, 0, 0, 0.8)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "1rem",
                  background: "var(--accent)",
                  color: "#000",
                  fontSize: "0.6rem",
                  padding: "0 0.5rem",
                  fontWeight: "bold",
                }}
              >
                AD / PR
              </div>
              <div
                className="scanning-label"
                style={{ marginBottom: "0.8rem", color: "var(--accent)" }}
              >
                Expert_Cognitive_Sync
              </div>
              <h3
                style={{
                  marginBottom: "1.2rem",
                  color: "#fff",
                  fontSize: "1.1rem",
                  fontFamily: "serif",
                }}
              >
                {affiliate.text}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  opacity: 0.8,
                  marginBottom: "2rem",
                  lineHeight: "1.7",
                }}
              >
                {affiliate.description}
                <br />
                九星気学の演算結果をより深く、あなたの現実に適用するための個別鑑定プロトコルをご用意しました。
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <a
                  href={affiliate.url}
                  target="_blank"
                  className="mystic-button"
                  style={{
                    textAlign: "center",
                    fontSize: "1rem",
                    padding: "1rem",
                  }}
                >
                  {affiliate.text}
                </a>
                <p
                  className="scanning-label"
                  style={{
                    textAlign: "center",
                    fontSize: "0.6rem",
                    opacity: 0.5,
                  }}
                >
                  ※外部の提携先プラットフォームへ接続します
                </p>
              </div>
            </div>
          );
        })()}
      </section>

      {/* シェアセクション */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <p className="scanning-label" style={{ marginBottom: "1rem" }}>
          Share_Destiny_Frequency
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button
            onClick={shareX}
            style={{
              background: "#000",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "0.6rem 1.2rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>𝕏</span> Share
          </button>
          <button
            onClick={shareLine}
            style={{
              background: "#06c755",
              color: "#fff",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>LINE</span> Share
          </button>
        </div>
      </div>

      {/* 広告枠 */}
      <div style={{ marginBottom: "4rem", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              height: "1px",
              background: "rgba(212,175,55,0.2)",
              flex: 1,
            }}
          ></div>
          <p className="scanning-label" style={{ fontSize: "0.65rem" }}>
            Advertisement / PR
          </p>
          <div
            style={{
              height: "1px",
              background: "rgba(212,175,55,0.2)",
              flex: 1,
            }}
          ></div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[1, 2].map((i) => (
            <div
              key={i}
              style={{
                padding: "1.5rem",
                background: "rgba(255,255,255,0.01)",
                border: "1px solid rgba(212,175,55,0.1)",
              }}
            >
              <p className="scanning-label" style={{ fontSize: "0.6rem" }}>
                DESTINY_PATCH_0{i}
              </p>
              <div
                style={{
                  marginTop: "0.8rem",
                  color: "var(--accent)",
                  fontSize: "0.9rem",
                }}
              >
                無料でもらえる特典をチェック &gt;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 免責一文 */}
      <p
        style={{
          textAlign: "center",
          fontSize: "0.65rem",
          opacity: 0.5,
          marginBottom: "2rem",
          padding: "0 1rem",
        }}
      >
        ※鑑定結果はAIのシミュレーションであり、将来を保証するものではありません。エンターテインメントとしてお楽しみください。
      </p>

      <div style={{ textAlign: "center", marginBottom: "6rem" }}>
        <Link
          href="/"
          style={{
            fontSize: "0.85rem",
            color: "var(--accent)",
            textDecoration: "underline",
            letterSpacing: "2px",
          }}
        >
          NEW_ANALYSIS_QUERY
        </Link>
      </div>

      <style jsx>{`
        .ad-box {
          font-size: 0.65rem;
        }
      `}</style>
    </>
  );
}

export default function ResultPage() {
  return (
    <main
      style={{
        padding: "2rem 1rem",
        maxWidth: "800px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      <Suspense
        fallback={
          <div className="scanning-label" style={{ textAlign: "center" }}>
            BUFFERING_RESULTS...
          </div>
        }
      >
        <ResultContent />
      </Suspense>
      <footer
        style={{
          marginTop: "4rem",
          paddingBottom: "2rem",
          textAlign: "center",
          fontSize: "0.75rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
            opacity: 0.6,
          }}
        >
          <Link
            href="/privacy"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            プライバシーポリシー
          </Link>
          <Link
            href="/disclaimer"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            免責事項
          </Link>
        </div>
      </footer>
    </main>
  );
}
