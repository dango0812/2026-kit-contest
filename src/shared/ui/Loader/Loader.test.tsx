import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Loader } from './Loader';

describe('Loader', () => {
  it('SVG 요소를 렌더링한다', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('aria-hidden 속성이 적용된다', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('duration에 따라 애니메이션 속도가 적용된다', () => {
    const { container } = render(<Loader duration={2000} />);
    const svgElement = container.querySelector('svg');
    expect(svgElement).toHaveStyle({ animationDuration: '2000ms' });
  });

  it('className을 전달할 수 있다', () => {
    const { container } = render(<Loader className="custom" />);
    expect(container.querySelector('svg')).toHaveClass('custom');
  });
});
