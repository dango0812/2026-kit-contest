import { sprinkles } from '@shared/styles';
import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import type { Color, Size } from '../types';

import { badgeRecipe, dotRecipe } from './Badge.css';

type BadgeVariants = NonNullable<Parameters<typeof badgeRecipe>[0]>['variant'];

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * 배지의 색상을 지정합니다.
   * @default 'primary'
   */
  color?: Color;
  /**
   * 배지의 크기를 지정합니다.
   * @default 'medium'
   */
  size?: Size;
  /**
   * 배지의 스타일 변형을 지정합니다.
   * - `solid`: 채워진 배지
   * - `subtle`: 연한 배지
   * @default 'solid'
   */
  variant?: BadgeVariants;
  /**
   * 값이 `true`라면 좌측에 동그란 점(dot)이 렌더링됩니다.
   * @default false
   */
  dot?: boolean;
}

export function Badge({ color, size, variant, dot = false, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={clsx(
        sprinkles({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8' }),
        badgeRecipe({ color, size, variant }),
        className,
      )}
      {...rest}
    >
      {dot && <span className={dotRecipe({ color, size, variant })} aria-hidden={true} />}
      {children}
    </span>
  );
}

Badge.displayName = 'Badge';
