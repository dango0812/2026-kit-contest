import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Flex } from './Flex';

describe('Flex', () => {
  it('children을 렌더링한다', () => {
    render(<Flex>안녕하세요</Flex>);
    expect(screen.getByText('안녕하세요')).toBeInTheDocument();
  });

  it('기본으로 div를 렌더링한다', () => {
    const { container } = render(<Flex>내용</Flex>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('as 속성으로 다른 엘리먼트를 렌더링한다', () => {
    const { container } = render(<Flex as="section">내용</Flex>);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('className을 통해 외부 스타일을 받을 수 있다', () => {
    const { container } = render(<Flex className="custom">내용</Flex>);
    expect((container.firstChild as HTMLElement).className).toContain('custom');
  });
});
