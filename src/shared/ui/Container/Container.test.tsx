import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Container } from './Container';

describe('Container', () => {
  it('children을 렌더링한다', () => {
    render(<Container>안녕하세요</Container>);
    expect(screen.getByText('안녕하세요')).toBeInTheDocument();
  });

  it('기본으로 div를 렌더링한다', () => {
    const { container } = render(<Container>내용</Container>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('as 속성으로 다른 엘리먼트를 렌더링한다', () => {
    const { container } = render(<Container as="section">내용</Container>);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('className을 통해 외부 스타일을 받을 수 있다', () => {
    const { container } = render(<Container className="custom">내용</Container>);
    expect((container.firstChild as HTMLElement).className).toContain('custom');
  });

  it('maxWidth에 따라 스타일이 적용된다', () => {
    const { rerender, container } = render(<Container maxWidth="xs">내용</Container>);
    expect(container.firstChild).toHaveClass('maxWidth-xs');

    rerender(<Container maxWidth="sm">내용</Container>);
    expect(container.firstChild).toHaveClass('maxWidth-sm');

    rerender(<Container maxWidth="md">내용</Container>);
    expect(container.firstChild).toHaveClass('maxWidth-md');

    rerender(<Container maxWidth="lg">내용</Container>);
    expect(container.firstChild).toHaveClass('maxWidth-lg');

    rerender(<Container maxWidth="xl">내용</Container>);
    expect(container.firstChild).toHaveClass('maxWidth-xl');

    rerender(<Container maxWidth="2xl">내용</Container>);
    expect(container.firstChild).toHaveClass('maxWidth-2xl');
  });

  it('fullWidth가 true이면 maxWidth 스타일이 적용되지 않는다', () => {
    const { container } = render(
      <Container fullWidth maxWidth="sm">
        내용
      </Container>,
    );
    expect(container.firstChild).not.toHaveClass('maxWidth-sm');
  });
});
