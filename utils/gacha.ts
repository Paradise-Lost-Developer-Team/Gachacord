import db from './database';

type State = { [userId: string]: { pity5: number } };

const BASE_5_RATE = 0.006;
const SOFT_PITY_START = 74;
const HARD_PITY = 90;
const SOFT_SLOPE = (1 - BASE_5_RATE) / (HARD_PITY - (SOFT_PITY_START - 1));

function get5Rate(pity: number) {
  if (pity < SOFT_PITY_START) return BASE_5_RATE;
  const extra = (pity - (SOFT_PITY_START - 1)) * SOFT_SLOPE;
  return Math.min(BASE_5_RATE + extra, 1);
}

// DB から現在の pity を取得（未登録なら 0）
function getPity(userId: string): number {
  const row = db.prepare('SELECT pity5 FROM gacha_state WHERE user_id = ?').get(userId) as { pity5: number } | undefined;
  return row ? row.pity5 : 0;
}
// pity を更新（INSERT OR REPLACE）
function setPity(userId: string, pity: number) {
  db.prepare(
    'INSERT OR REPLACE INTO gacha_state(user_id, pity5) VALUES (?, ?)'
  ).run(userId, pity);
}

export function singlePull(userId: string): number {
  let pity = getPity(userId) + 1;
  const rate5 = get5Rate(pity);
  let result: number;

  if (Math.random() < rate5 || pity >= HARD_PITY) {
    result = 5;
    pity = 0;
  } else if (Math.random() < 0.06) {
    result = 4;
  } else {
    result = 3;
  }

  setPity(userId, pity);
  return result;
}

export function multiPull(userId: string, count = 10): number[] {
  const results: number[] = [];
  let has4plus = false;
  for (let i = 0; i < count - 1; i++) {
    const r = singlePull(userId);
    if (r >= 4) has4plus = true;
    results.push(r);
  }
  let last = singlePull(userId);
  if (!has4plus && last < 4) last = 4;
  results.push(last);
  return results;
}
