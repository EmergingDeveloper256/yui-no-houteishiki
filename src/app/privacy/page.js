import Link from "next/link";

export default function PrivacyPage() {
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
          プライバシーポリシー
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
          個人情報の取り扱いについて
        </h2>
        <p>
          当サイト「結の方程式」（以下、「当サイト」）は、ユーザーの個人情報の保護を重要な責務と認識し、以下の通りプライバシーポリシーを定めます。
        </p>

        <h3 style={{ color: "var(--accent-blue)", marginTop: "2rem" }}>
          1. 収集する情報
        </h3>
        <p>
          当サイトでは、鑑定サービスの提供にあたり、ユーザーのニックネームおよび生年月日を入力いただきます。これらの情報は、ブラウザ内での演算および結果表示のためにのみ使用され、当サイトのサーバーに永続的に保存されることはありません。
        </p>

        <h3 style={{ color: "var(--accent-blue)", marginTop: "2rem" }}>
          2. 広告利用について
        </h3>
        <p>
          当サイトでは、第三者配信の広告サービス（Googleアドセンス等）を利用しています。広告配信事業者は、ユーザーの興味に応じた広告を表示するために、クッキー（Cookie）を使用することがあります。これによってユーザーのブラウザを識別できるようになりますが、個人を特定するものではありません。Cookieを無効にする方法については、Googleの広告設定等をご確認ください。
        </p>

        <h3 style={{ color: "var(--accent-blue)", marginTop: "2rem" }}>
          3. アクセス解析ツールについて
        </h3>
        <p>
          当サイトでは、サイトの利用状況を把握するためにアクセス解析ツールを利用することがあります。このツールもCookieを使用しますが、匿名で収集されており、個人を特定する情報は含まれません。
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
