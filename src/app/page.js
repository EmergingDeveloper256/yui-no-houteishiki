import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <main
      style={{
        padding: "var(--nav-padding) 1rem",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <header style={{ marginBottom: "3rem", textAlign: "center" }}>
        <p className="scanning-label" style={{ marginBottom: "0.5rem" }}>
          AI Oracle System v2.4 // Ready
        </p>
        <h1 className="title-mystic">結の方程式</h1>
        <p
          style={{
            color: "var(--accent)",
            fontSize: "clamp(1rem, 4vw, 1.2rem)",
            marginTop: "-0.5rem",
            letterSpacing: "4px",
            fontFamily: "serif",
          }}
        >
          AIによってあなたの運命を精密に占います
        </p>
        <p
          style={{
            marginTop: "1.5rem",
            opacity: 0.7,
            fontSize: "0.85rem",
            maxWidth: "600px",
            margin: "1.5rem auto 0",
            lineHeight: "1.6",
          }}
        >
          最先端のAIアルゴリズムが、あなたの生データから目に見えない運命の糸を読み解き、真実の道を示します。
        </p>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Link href="/input?type=compatibility">
          <div
            className="mystic-card"
            style={{
              cursor: "pointer",
              height: "100%",
              borderColor: "rgba(212, 175, 55, 0.4)",
            }}
          >
            <h2
              style={{
                color: "var(--accent)",
                marginBottom: "1rem",
                borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
                paddingBottom: "0.5rem",
                fontSize: "1.2rem",
              }}
            >
              ✨ 真実の愛占い
            </h2>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
              二人の魂のデータセットを照合し、**真実の相性**を算出。絆を最大化するためのパラメータを特定する相性占いです。
            </p>
            <div
              className="scanning-label"
              style={{ marginTop: "1.5rem", textAlign: "right" }}
            >
              Analysis Mode: Entity_Match
            </div>
          </div>
        </Link>

        <Link href="/input?type=affair">
          <div
            className="mystic-card"
            style={{
              cursor: "pointer",
              height: "100%",
              borderColor: "rgba(212, 175, 55, 0.4)",
            }}
          >
            <h2
              style={{
                color: "var(--accent)",
                marginBottom: "1rem",
                borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
                paddingBottom: "0.5rem",
                fontSize: "1.2rem",
              }}
            >
              🌑 秘密の愛占い
            </h2>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
              誰にも言えない**不倫の関係性**をAIが多角的に解析。不可視の因果と、辿り着くべき終着点を導き出す不倫占いです。
            </p>
            <div
              className="scanning-label"
              style={{ marginTop: "1.5rem", textAlign: "right" }}
            >
              Analysis Mode: Secret_Logic
            </div>
          </div>
        </Link>
      </section>

      <footer
        style={{
          marginTop: "6rem",
          textAlign: "center",
          fontSize: "0.75rem",
          color: "rgba(212, 175, 55, 0.4)",
          letterSpacing: "2px",
        }}
      >
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <Link
            href="/privacy"
            style={{ color: "rgba(212, 175, 55, 0.6)", textDecoration: "none" }}
          >
            プライバシーポリシー
          </Link>
          <Link
            href="/disclaimer"
            style={{ color: "rgba(212, 175, 55, 0.6)", textDecoration: "none" }}
          >
            免責事項
          </Link>
        </div>
        <p>&copy; 2026 結の方程式 - QUANTUM DESTINY ENGINE</p>
      </footer>
    </main>
  );
}
