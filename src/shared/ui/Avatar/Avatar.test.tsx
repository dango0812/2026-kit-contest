import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('기본 상태에서 이미지를 렌더링한다', () => {
    const { container } = render(<Avatar />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', '');
  });

  it('fallback 텍스트를 렌더링한다', () => {
    const { container } = render(<Avatar fallback="김" />);
    expect(container).toHaveTextContent('김');
  });

  it('src가 주어지면 이미지를 렌더링한다', () => {
    render(<Avatar src="/test.png" alt="테스트" />);
    const img = screen.getByRole('img', { hidden: true });
    expect(img).toHaveAttribute('src', '/test.png');
    expect(img).toHaveAttribute('alt', '테스트');
  });

  it('aria-hidden이 설정된다', () => {
    const { container } = render(<Avatar />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('variant="empty" 스타일이 적용된다', () => {
    const { container, rerender } = render(<Avatar variant="filled" />);
    const filledClass = (container.firstChild as HTMLElement).className;

    rerender(<Avatar variant="empty" />);
    expect((container.firstChild as HTMLElement).className).not.toBe(filledClass);
  });

  it('size에 따라 className이 변경된다', () => {
    const { container, rerender } = render(<Avatar size="small" />);
    const smallClass = (container.firstChild as HTMLElement).className;

    rerender(<Avatar size="large" />);
    expect((container.firstChild as HTMLElement).className).not.toBe(smallClass);
  });

  it('className이 병합된다', () => {
    const { container } = render(<Avatar className="custom" />);
    expect((container.firstChild as HTMLElement).className).toContain('custom');
  });
});
