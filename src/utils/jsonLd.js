// ホームページ用の JSON-LD 構造化データ (SEO)
export const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "結の方程式 | 九星気学×AI占い",
  description:
    "九星気学とAIを融合した次世代の占いサービス。生年月日から本命星・月命星を算出し、恋愛・引越し・仕事など、あなたの人生に寄り添う精密な運命鑑定をお届けします。",
  url: "https://mystic-edge.example.com",
  inLanguage: "ja",
  about: {
    "@type": "Thing",
    name: "九星気学",
    description:
      "九星気学（きゅうせいきがく）は、生年月日から導き出される本命星・月命星によって、個人の運勢・相性・吉方位などを占う日本の伝統的な占術です。",
  },
};

// 各トピックページ用 構造化データ
export function getTopicJsonLd(topic) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${topic.label}（九星気学×AI）`,
    description: topic.description,
    provider: {
      "@type": "Organization",
      name: "結の方程式",
    },
  };
}
