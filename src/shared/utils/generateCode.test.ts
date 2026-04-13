import { describe, expect, it } from 'vitest';

import { generateCode } from './generateCode';

const VALID_CHARS = new Set('ABCDEFGHJKLMNPQRSTUVWXYZ0123456789');

describe('generateCode', () => {
  it('기본값으로 "XXX-XXX" 형식의 코드를 생성한다', () => {
    const code = generateCode();
    expect(code).toMatch(/^[A-Z0-9]{3}-[A-Z0-9]{3}$/);
  });

  it('허용된 문자(I, O 제외)만 포함한다', () => {
    for (let i = 0; i < 50; i++) {
      const code = generateCode();
      const chars = code.replace(/-/g, '');
      expect([...chars].every(c => VALID_CHARS.has(c))).toBe(true);
    }
  });

  it('I, O 문자를 포함하지 않는다', () => {
    for (let i = 0; i < 50; i++) {
      const code = generateCode();
      expect(code).not.toMatch(/[IO]/);
    }
  });

  it('segmentLength에 따라 각 세그먼트 길이가 달라진다', () => {
    const code = generateCode(4);
    const parts = code.split('-');
    expect(parts).toHaveLength(2);
    parts.forEach(part => expect(part).toHaveLength(4));
  });

  it('segmentCount에 따라 세그먼트 개수가 달라진다', () => {
    const code = generateCode(3, 3);
    const parts = code.split('-');
    expect(parts).toHaveLength(3);
  });

  it('separator를 커스텀할 수 있다', () => {
    const code = generateCode(3, 2, ':');
    expect(code).toMatch(/^[A-Z0-9]{3}:[A-Z0-9]{3}$/);
  });

  it('segmentLength=4, segmentCount=3, separator=":" 조합이 동작한다', () => {
    const code = generateCode(4, 3, ':');
    expect(code).toMatch(/^[A-Z0-9]{4}:[A-Z0-9]{4}:[A-Z0-9]{4}$/);
  });

  it('반복 호출 시 동일한 코드를 생성하지 않는다', () => {
    const codes = new Set(Array.from({ length: 20 }, () => generateCode()));
    expect(codes.size).toBeGreaterThan(1);
  });
});
