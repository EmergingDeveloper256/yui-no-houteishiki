/**
 * 占いトピックとアフィリエイトの定義
 */

export const TOPICS = {
  love: {
    id: "love",
    label: "真実の愛占い",
    mode: "EMOTION_SYNC",
    description:
      "二人の魂のデータを照合し、真実の相性を算出。絆を最大化するためのパラメータを特定します。",
    icon: "✨",
    promptHint:
      "恋愛相性、相手の本音、今後の進展について、九星気学の観点から詳しく解説してください。",
    affiliate: {
      url: "https://example.com/affiliate/love",
      text: "専門鑑定士に恋の行方を相談する",
      description:
        "AIの演算では見きれない、あの人の「今の本心」を霊視で解明します。",
    },
  },
  affair: {
    id: "affair",
    label: "秘密の愛占い",
    mode: "SECRET_LOGIC",
    description:
      "誰にも言えない不倫の関係性をAIが多角的に解析。不可視の因果と、辿り着くべき終着点を導き出します。",
    icon: "🌑",
    promptHint:
      "不倫・複雑愛の葛藤、相手の家庭状況との兼ね合い、二人の因縁を九星気学で読み解き、寄り添うアドバイスをしてください。",
    affiliate: {
      url: "https://example.com/affiliate/affair",
      text: "秘密の恋の結末をプロに聞く",
      description:
        "この恋を成就させるための具体的な戦略と、訪れる転機を教えます。",
    },
  },
  moving: {
    id: "moving",
    label: "運命の引越し占い",
    mode: "LOCATION_SYNC",
    description:
      "吉方位とタイミングをAIが演算。新しい門出を最高のものにするための場所と時期を特定します。",
    icon: "🏠",
    promptHint:
      "引越しの吉方位、最適な時期、新天地での運勢について、九星気学（方位学）の観点から詳しく解説してください。",
    affiliate: {
      url: "https://example.com/affiliate/moving",
      text: "開運方位のプロに相談する",
      description:
        "あなたの星に合わせた、最高に運気が上がる物件選びをサポートします。",
    },
  },
  work: {
    id: "work",
    label: "天職・仕事占い",
    mode: "CAREER_LOGIC",
    description:
      "あなたの特性と現在のビジネスサイクルを同期。成功への最短ルートと、取るべきアクションを提示します。",
    icon: "💼",
    promptHint:
      "適職、転職のタイミング、職場での人間関係、才能の開花について、九星気学の観点からアドバイスしてください。",
    affiliate: {
      url: "https://example.com/affiliate/work",
      text: "成功を呼ぶキャリア相談を試す",
      description:
        "あなたの才能を120%引き出すための方法と、仕事運を爆上げする秘訣を伝授します。",
    },
  },
};

export function getTopic(id) {
  return TOPICS[id] || TOPICS.love;
}
