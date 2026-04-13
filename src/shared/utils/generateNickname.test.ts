import { describe, expect, it } from 'vitest';

import { generateNickname } from './generateNickname';

const VALID_NICKNAMES = new Set([
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
]);

describe('generateNickname', () => {
  it('미리 정의된 닉네임 목록 중 하나를 반환한다', () => {
    const nickname = generateNickname();
    expect(VALID_NICKNAMES.has(nickname)).toBe(true);
  });

  it('문자열을 반환한다', () => {
    expect(typeof generateNickname()).toBe('string');
  });

  it('빈 문자열을 반환하지 않는다', () => {
    expect(generateNickname().length).toBeGreaterThan(0);
  });

  it('반복 호출 시 동일한 닉네임을 생성하지 않는다', () => {
    const nicknames = new Set(Array.from({ length: 30 }, () => generateNickname()));
    expect(nicknames.size).toBeGreaterThan(1);
  });

  it('반환된 닉네임이 항상 목록 범위 내에 있다', () => {
    for (let i = 0; i < 50; i++) {
      expect(VALID_NICKNAMES.has(generateNickname())).toBe(true);
    }
  });
});
