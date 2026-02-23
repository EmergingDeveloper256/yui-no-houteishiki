import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <main
      style={{
        padding: "4rem 1rem",
        maxWidth: "800px",
        margin: "0 auto",
        color: "#fff",
        lineHeight: "1.8",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 className="title-mystic" style={{ fontSize: "2rem" }}>
          免責事項
        </h1>
      </header>

      <section className="mystic-card">
        <h2
          style={{
            color: "var(--accent)",
            marginBottom: "1rem",
            borderBottom: "1px solid rgba(212,175,55,0.2)",
            paddingBottom: "0.5rem",
          }}
        >
          サービスのご利用にあたって
        </h2>

        <h3 style={{ color: "var(--accent-blue)", marginTop: "2rem" }}>
          1. 鑑定結果について
        </h3>
        <p>
          当サイト「結の方程式」で提供される鑑定結果は、独自のアルゴリズムに基づいたシミュレーションであり、科学的根拠や将来の出来事を保証するものではありません。あくまでエンターテインメントとしてお楽しみください。
        </p>

        <h3 style={{ color: "var(--accent-blue)", marginTop: "2rem" }}>
          2. 損害への責任
        </h3>
        <p>
          当サイトの利用により生じたトラブルや損失・損害等について、当サイト運営者は一切の責任を負いかねます。鑑定内容を参考にされる際は、ご自身の責任においてご判断ください。
        </p>

        <h3 style={{ color: "var(--accent-blue)", marginTop: "2rem" }}>
          3. 外部リンクについて
        </h3>
        <p>
          当サイトには、第三者のウェブサイトへのリンク（広告やアフィリエイトリンク等）が含まれています。移動先のサイトで提供される情報やサービス、個人情報の取り扱いについては、当サイトは一切の責任を負いません。リンク先のプライバシーポリシーや利用規約をご確認ください。
        </p>
      </section>

      <div style={{ marginTop: "3rem", textAlign: "center" }}>
        <Link
          href="/"
          style={{ color: "var(--accent)", textDecoration: "underline" }}
        >
          トップページに戻る
        </Link>
      </div>
    </main>
  );
}
