import "./globals.css";

export const metadata = {
  title: "結の方程式 | 九星気学×AI占い｜本命星で紐解く運命鑑定",
  description:
    "九星気学とAIを融合した次世代の占いサービス。生年月日から本命星・月命星を算出し、恋愛・引越し・仕事・不倫など、あなたの人生に寄り添う精密な運命鑑定をお届けします。",
  keywords: [
    "九星気学",
    "本命星",
    "月命星",
    "九星気学占い",
    "AI占い",
    "本命星占い",
    "吉方位",
    "九星気学 恋愛",
    "九星気学 引越し",
    "九星気学 仕事",
  ],
  openGraph: {
    title: "結の方程式 | 九星気学×AI占い",
    description:
      "生年月日から本命星を算出。九星気学とAIが融合した新感覚の運命鑑定。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
