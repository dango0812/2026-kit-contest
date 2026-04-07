import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Text } from './Text';

describe('Text', () => {
  it('children을 렌더링한다', () => {
    render(<Text>안녕하세요</Text>);
    expect(screen.getByText('안녕하세요')).toBeInTheDocument();
  });

  it('기본 태그는 p이다', () => {
    render(<Text>텍스트</Text>);
    expect(screen.getByText('텍스트').tagName).toBe('P');
  });

  it('as prop으로 렌더링 태그를 변경한다', () => {
    render(<Text as="h2">제목</Text>);
    expect(screen.getByText('제목').tagName).toBe('H2');
  });

  it('as="span"으로 인라인 요소로 렌더링된다', () => {
    render(<Text as="span">인라인</Text>);
    expect(screen.getByText('인라인').tagName).toBe('SPAN');
  });

  it('color prop이 inline style로 적용된다', () => {
    render(<Text color="#3182F6">색상</Text>);
    expect(screen.getByText('색상')).toHaveStyle({ color: '#3182F6' });
  });

  it('color prop이 없으면 style 속성이 없다', () => {
    render(<Text>노컬러</Text>);
    expect(screen.getByText('노컬러')).not.toHaveAttribute('style');
  });

  it('fontSize variant가 적용되면 className이 부여된다', () => {
    render(<Text fontSize="h1">대제목</Text>);
    expect(screen.getByText('대제목').className).toBeTruthy();
  });

  it('fontWeight variant가 적용되면 className이 부여된다', () => {
    render(<Text fontWeight="bold">굵게</Text>);
    expect(screen.getByText('굵게').className).toBeTruthy();
  });

  it('lineHeight variant가 적용되면 className이 부여된다', () => {
    render(<Text lineHeight="large">넓은 줄간격</Text>);
    expect(screen.getByText('넓은 줄간격').className).toBeTruthy();
  });

  it('variant 조합에 따라 className이 달라진다', () => {
    const { rerender } = render(<Text fontSize="body1">본문</Text>);
    const body1Class = screen.getByText('본문').className;

    rerender(<Text fontSize="caption">본문</Text>);
    expect(screen.getByText('본문').className).not.toBe(body1Class);
  });
});
