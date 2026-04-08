import { IconLoader } from '@assets/icons';
import clsx from 'clsx';

import type { Color, Size } from '../types';

import { loaderRecipe } from './styles.css';

export interface LoaderProps {
  /**
   * 로더의 크기를 지정합니다.
   * @default 'medium'
   */
  size?: Size;
  /**
   * 로더의 색상을 지정합니다.
   * @default 'primary'
   */
  color?: Color;
  /**
   * 회전 애니메이션 주기(ms)를 지정합니다. 값이 클수록 느리게 회전합니다.
   * @default 1000
   */
  duration?: number;
  /**
   * 추가적인 CSS 클래스를 지정합니다.
   */
  className?: string;
}

export function Loader({ size, color, duration = 1000, className }: LoaderProps) {
  return (
    <IconLoader
      className={clsx(loaderRecipe({ size, color }), className)}
      style={{ animationDuration: `${duration}ms` }}
      aria-hidden="true"
    />
  );
}

Loader.displayName = 'Loader';
