const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';

const segment = (len: number): string => {
  return Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
};

/**
 * 입장 코드를 생성하는 유틸 함수입니다.
 * @param segmentLength {number} 각 세그먼트의 길이 (기본값: 3)
 * @param segmentCount {number} 세그먼트 개수 (기본값: 2)
 * @param separator {string} 세그먼트 구분자 (기본값: '-')
 * @returns {string} 생성된 입장 코드 문자열
 *
 * @example
 * generateCode(); // "4G7-K9P"
 * generateCode(4, 3, ':'); // "1A3F:9B2D:5C8E"
 */
export function generateCode(segmentLength = 3, segmentCount = 2, separator = '-'): string {
  if (!Number.isInteger(segmentLength) || segmentLength <= 0) {
    throw new Error('segmentLength는 1 이상의 정수여야 합니다.');
  }
  if (!Number.isInteger(segmentCount) || segmentCount <= 0) {
    throw new Error('segmentCount는 1 이상의 정수여야 합니다.');
  }
  return Array.from({ length: segmentCount }, () => segment(segmentLength)).join(separator);
}
