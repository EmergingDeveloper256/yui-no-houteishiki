import Link from "next/link";
import { TOPICS } from "../utils/topics";
import { homeJsonLd } from "../utils/jsonLd";
import "./globals.css";

export const metadata = {
  title: "結の方程式 | 九星気学×AI占い｜本命星で紐解く運命鑑定",
  description:
    "九星気学とAIを融合した次世代の占いサービス。生年月日から本命星・月命星を算出し、恋愛・引越し・仕事・不倫など、あなたの人生に寄り添う精密な運命鑑定をお届けします。",
};

export default function Home() {
  return (
    <main
      style={{
        padding: "var(--nav-padding) 1rem",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <header style={{ marginBottom: "3rem", textAlign: "center" }}>
        {/* 九星気学バッジ */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            border: "1px solid rgba(212, 175, 55, 0.5)",
            padding: "0.3rem 1rem",
            marginBottom: "1.5rem",
            borderRadius: "2px",
            background: "rgba(212, 175, 55, 0.05)",
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              color: "var(--accent)",
              letterSpacing: "3px",
            }}
          >
            ☯ 九星気学 × AI
          </span>
        </div>

        <p className="scanning-label" style={{ marginBottom: "0.5rem" }}>
          Kyusei-Kigaku Oracle Engine // Ready
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
          九星気学×AIで紐解く、あなたの運命
        </p>

        <p
          style={{
            marginTop: "1.5rem",
            opacity: 0.8,
            fontSize: "0.9rem",
            maxWidth: "600px",
            margin: "1.5rem auto 0",
            lineHeight: "1.8",
          }}
        >
          生年月日から
          <strong style={{ color: "var(--accent)" }}>本命星・月命星</strong>
          を算出。
          古来からの叡智「九星気学」と最先端AIが融合し、恋愛・仕事・引越しの方位まで、あなたの運命を精密に解読します。
        </p>

        {/* 九つの星 */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "2rem",
            maxWidth: "600px",
            margin: "2rem auto 0",
          }}
        >
          {[
            "一白水星",
            "二黒土星",
            "三碧木星",
            "四緑木星",
            "五黄土星",
            "六白金星",
            "七赤金星",
            "八白土星",
            "九紫火星",
          ].map((star, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.65rem",
                padding: "0.2rem 0.6rem",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                color: "rgba(212, 175, 55, 0.6)",
                letterSpacing: "1px",
              }}
            >
              {star}
            </span>
          ))}
        </div>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {Object.values(TOPICS).map((topic) => (
          <Link key={topic.id} href={`/input?type=${topic.id}`}>
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
                {topic.icon} {topic.label}
              </h2>
              <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                {topic.description}
              </p>
              <div
                className="scanning-label"
                style={{ marginTop: "1.5rem", textAlign: "right" }}
              >
                Analysis Mode: {topic.mode}
              </div>
            </div>
          </Link>
        ))}
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
