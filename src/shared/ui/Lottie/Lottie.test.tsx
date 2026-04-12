import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockSetSpeed, mockDestroy, mockLoadAnimation } = vi.hoisted(() => {
  const mockSetSpeed = vi.fn();
  const mockDestroy = vi.fn();
  const mockLoadAnimation = vi.fn(() => ({ setSpeed: mockSetSpeed, destroy: mockDestroy }));
  return { mockSetSpeed, mockDestroy, mockLoadAnimation };
});

vi.mock('lottie-web', () => ({
  default: { loadAnimation: mockLoadAnimation },
}));

import { Lottie } from './Lottie';

describe('Lottie', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('div 요소를 렌더링한다', () => {
    const { container } = render(<Lottie src="/animation.json" />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('aria-hidden="true" 속성이 적용된다', () => {
    const { container } = render(<Lottie src="/animation.json" />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('width, height 스타일이 적용된다', () => {
    const { container } = render(<Lottie src="/animation.json" width={200} height={150} />);
    expect(container.firstChild).toHaveStyle({ width: '200px', height: '150px' });
  });

  it('className이 적용된다', () => {
    const { container } = render(<Lottie src="/animation.json" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('src가 문자열이면 path로 loadAnimation을 호출한다', () => {
    render(<Lottie src="/animation.json" />);
    expect(mockLoadAnimation).toHaveBeenCalledWith(expect.objectContaining({ path: '/animation.json' }));
  });

  it('src가 객체이면 animationData로 loadAnimation을 호출한다', () => {
    const animData = { v: '5.0', layers: [] };
    render(<Lottie src={animData} />);
    expect(mockLoadAnimation).toHaveBeenCalledWith(expect.objectContaining({ animationData: animData }));
  });

  it('loop, autoplay 옵션이 loadAnimation에 전달된다', () => {
    render(<Lottie src="/animation.json" loop={false} autoplay={false} />);
    expect(mockLoadAnimation).toHaveBeenCalledWith(expect.objectContaining({ loop: false, autoplay: false }));
  });

  it('renderer 옵션이 loadAnimation에 전달된다', () => {
    render(<Lottie src="/animation.json" renderer="canvas" />);
    expect(mockLoadAnimation).toHaveBeenCalledWith(expect.objectContaining({ renderer: 'canvas' }));
  });

  it('speed prop이 setSpeed에 반영된다', () => {
    render(<Lottie src="/animation.json" speed={2} />);
    expect(mockSetSpeed).toHaveBeenCalledWith(2);
  });

  it('언마운트 시 애니메이션이 destroy된다', () => {
    const { unmount } = render(<Lottie src="/animation.json" />);
    unmount();
    expect(mockDestroy).toHaveBeenCalled();
  });
});
