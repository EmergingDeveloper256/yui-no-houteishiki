/**
 * 九星気学 計算ロジック
 */

// 九星の定義
export const KYUSEI_NAMES = [
  "",
  "一白水星",
  "二黒土星",
  "三碧木星",
  "四緑木星",
  "五黄土星",
  "六白金星",
  "七赤金星",
  "八白土星",
  "九紫火星",
];

/**
 * 本命星（年盤の星）を算出
 * @param {Date} date
 * @returns {number} 1〜9
 */
export function getHonmeiSei(date) {
  let year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 節分（立春）の前なら前年とする（簡易的に2/4を境界とする）
  if (month < 2 || (month === 2 && day < 4)) {
    year--;
  }

  // 2024 = 3 (三碧) を基準とする
  let star = (3 + ((2024 - year) % 9) + 9) % 9;
  return star === 0 ? 9 : star;
}

/**
 * 月命星（月盤の星）を算出
 * @param {Date} date
 * @returns {number} 1〜9
 */
export function getGetsumeiSei(date) {
  const honmei = getHonmeiSei(date);
  let month = date.getMonth() + 1;
  const day = date.getDate();

  // 各月の節（24節気）の開始日（簡易化）
  const setsuStart = [0, 5, 4, 6, 5, 5, 6, 7, 8, 8, 8, 7, 7]; // 1月〜12月
  if (day < setsuStart[month]) {
    month--;
  }
  if (month === 0) month = 12;

  // 月命星の計算
  // 基準: 本命星 1,4,7 -> 1月は6, 2月は5...
  // 本命星 2,5,8 -> 1月は9, 2月は8...
  // 本命星 3,6,9 -> 1月は3, 2月は2...

  let base;
  if ([1, 4, 7].includes(honmei))
    base = 10; // (10 - month + 6 - 1) % 9 ...? 複雑なのでテーブル化
  else if ([2, 5, 8].includes(honmei)) base = 1;
  else base = 4;

  let offset = (month + 10) % 12; // 2月(立春)を0とする

  // 簡易計算 (1,4,7グループの2月(立春月)は5, 3月は4...)
  const groups = {
    A: [5, 4, 3, 2, 1, 9, 8, 7, 6, 5, 4, 3], // 1,4,7
    B: [8, 7, 6, 5, 4, 3, 2, 1, 9, 8, 7, 6], // 2,5,8
    C: [2, 1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 9], // 3,6,9
  };

  let groupKey;
  if ([1, 4, 7].includes(honmei)) groupKey = "A";
  else if ([2, 5, 8].includes(honmei)) groupKey = "B";
  else groupKey = "C";

  // Index 0 is Feb, 1 is Mar ... 10 is Dec, 11 is Jan
  const idx = (month + 10) % 12;
  return groups[groupKey][idx];
}

/**
 * 総合的な九星情報を取得
 */
export function getKyuseiInfo(dobString) {
  if (!dobString) return null;
  const date = new Date(dobString);
  if (isNaN(date.getTime())) return null;

  const honmei = getHonmeiSei(date);
  const getsumei = getGetsumeiSei(date);

  return {
    honmei: {
      num: honmei,
      name: KYUSEI_NAMES[honmei],
    },
    getsumei: {
      num: getsumei,
      name: KYUSEI_NAMES[getsumei],
    },
  };
}

/**
 * 相性・運勢等のキーワードを生成（AIへのヒント用）
 */
export function getKyuseiKeywords(selfDob, partnerDob, type) {
  const self = getKyuseiInfo(selfDob);
  const partner = partnerDob ? getKyuseiInfo(partnerDob) : null;

  // 五行（木火土金水）
  const gogyo = ["", "水", "土", "木", "木", "土", "金", "金", "土", "火"];

  return {
    self: self,
    partner: partner,
    selfGogyo: gogyo[self.honmei.num],
    partnerGogyo: partner ? gogyo[partner.honmei.num] : null,
    type: type,
  };
}
