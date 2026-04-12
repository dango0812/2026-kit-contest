import { useEffect, useRef } from 'react';

import lottie, { type AnimationConfigWithData, type AnimationItem, type RendererType } from 'lottie-web';

export interface LottieProps {
  /**
   * URL 경로(string) 또는 JSON 객체(import한 데이터) 모두 가능
   * @example '/animations/loading.json'
   * @example import animData from './animation.json'
   */
  src: string | AnimationConfigWithData['animationData'];
  /**
   * 애니메이션 반복 여부
   * @default true
   */
  loop?: boolean;
  /**
   * 자동 재생 여부
   * @default true
   */
  autoplay?: boolean;
  /**
   * 재생 속도 배수 (1 = 기본 속도, 2 = 2배 빠르게, 0.5 = 느리게)
   * @default 1
   */
  speed?: number;
  /**
   * 렌더러 타입
   * @default 'svg'
   */
  renderer?: RendererType;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function Lottie({
  src,
  loop = true,
  autoplay = true,
  speed = 1,
  renderer = 'svg',
  width,
  height,
  className,
}: LottieProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    // src가 문자열이면 path로, 객체면 animationData로 설정
    const animationSource = typeof src === 'string' ? { path: src } : { animationData: src };

    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      ...animationSource,
      loop,
      autoplay,
      renderer,
    });

    animationRef.current.setSpeed(speed);

    return () => {
      animationRef.current?.destroy();
      animationRef.current = null;
    };

    // speed는 별도 처리하여 의존성에서 제외
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, renderer, loop, autoplay]);

  // speed 변경 시 애니메이션 재생성 없이 속도만 업데이트
  useEffect(() => {
    animationRef.current?.setSpeed(speed);
  }, [speed]);

  return <div ref={containerRef} className={className} style={{ width, height }} aria-hidden="true" />;
}

Lottie.displayName = 'Lottie';
