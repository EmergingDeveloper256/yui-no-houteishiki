import "./globals.css";

export const metadata = {
  title: "結の方程式 | AIが導く真実の相性と未来",
  description:
    "AIによる精密な運命鑑定。相性、不倫、復縁など、誰にも言えない悩みをAIが独自のアルゴリズムで解析し、希望の未来へと導きます。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
