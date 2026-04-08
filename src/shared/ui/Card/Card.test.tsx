import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './Card';

describe('Card', () => {
  it('children을 렌더링한다', () => {
    render(<Card>카드 내용</Card>);
    expect(screen.getByText('카드 내용')).toBeInTheDocument();
  });

  it('기본으로 div를 렌더링한다', () => {
    const { container } = render(<Card>내용</Card>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('as 속성으로 다른 엘리먼트를 렌더링한다', () => {
    const { container } = render(<Card as="section">내용</Card>);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('className을 통해 외부 스타일을 받을 수 있다', () => {
    const { container } = render(<Card className="custom">내용</Card>);
    expect((container.firstChild as HTMLElement).className).toContain('custom');
  });

  it('color 속성에 따라 스타일이 적용된다', () => {
    const { container } = render(<Card color="primary">내용</Card>);
    expect((container.firstChild as HTMLElement).className).toContain('color_primary');
  });

  it('variant 속성에 따라 스타일이 적용된다', () => {
    const { container } = render(<Card variant="outline">내용</Card>);
    expect((container.firstChild as HTMLElement).className).toContain('variant_outline');
  });

  it('rounded 속성에 따라 스타일이 적용된다', () => {
    const { container } = render(<Card rounded="full">내용</Card>);
    expect((container.firstChild as HTMLElement).className).toContain('rounded_full');
  });

  it('shadow 속성에 따라 스타일이 적용된다', () => {
    const { container } = render(<Card shadow="light">내용</Card>);
    expect((container.firstChild as HTMLElement).className).toContain('shadow_light');
  });
});
