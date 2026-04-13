const NICKNAMES = [
  '날카로운 독수리',
  '고독한 탐정',
  '빠른 여우',
  '침묵의 수사관',
  '날렵한 고양이',
  '붉은 매',
  '차가운 늑대',
  '번개 수사관',
  '그림자 탐정',
  '호기심 많은 올빼미',
  '냉철한 분석가',
  '불꽃 수사대',
  '밤의 탐정',
  '예리한 눈매',
  '조용한 추적자',
] as const;

/**
 * 수사대 테마의 랜덤 닉네임을 반환합니다.
 * @returns {string} 무작위로 선택된 닉네임 문자열
 *
 * @example
 * generateNickname(); // "고독한 탐정"
 * generateNickname(); // "번개 수사관"
 */
export function generateNickname(): string {
  return NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)];
}
