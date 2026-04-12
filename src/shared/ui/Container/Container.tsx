import clsx from 'clsx';
import type { ElementType, HTMLAttributes } from 'react';

import * as styles from './styles.css';

export type MaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  /**
   * 렌더링할 HTML 엘리먼트를 지정합니다.
   * @default 'div'
   */
  as?: ElementType;
  /**
   * 컨테이너의 최대 너비를 지정합니다.
   * - xs: 479px
   * - sm: 639px
   * - md: 779px
   * - lg: 1023px
   * - xl: 1279px
   * - 2xl: 1599px
   * @default 'lg'
   */
  maxWidth?: MaxWidth;
  /**
   * true이면 maxWidth 제한 없이 너비 100%로 늘어납니다.
   * @default false
   */
  fullWidth?: boolean;
}

export function Container({
  as: Component = 'div',
  maxWidth = 'lg',
  fullWidth = false,
  className,
  ...rest
}: ContainerProps) {
  return (
    <Component
      className={clsx(styles.containerRecipe({ maxWidth: fullWidth ? undefined : maxWidth }), className)}
      {...rest}
    />
  );
}

Container.displayName = 'Container';
