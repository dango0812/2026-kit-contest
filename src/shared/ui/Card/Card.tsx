import clsx from 'clsx';
import type { ElementType, HTMLAttributes } from 'react';

import type { Color } from '../types';

import { cardRecipe } from './styles.css';

type CardRecipeProps = NonNullable<Parameters<typeof cardRecipe>[0]>;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * 렌더링할 HTML 엘리먼트를 지정합니다.
   * @default 'div'
   */
  as?: ElementType;
  /**
   * 카드의 색상을 지정합니다.
   * @default 'secondary'
   */
  color?: Color;
  /**
   * 카드의 스타일 변형을 지정합니다.
   * - `solid`: 배경색이 채워진 카드
   * - `outline`: 테두리만 있는 카드
   * @default 'solid'
   */
  variant?: CardRecipeProps['variant'];
  /**
   * 카드의 모서리 둥글기를 지정합니다.
   * @default 'frame'
   */
  rounded?: CardRecipeProps['rounded'];
  /**
   * 카드의 그림자를 지정합니다.
   * @default 'light'
   */
  shadow?: CardRecipeProps['shadow'];
}

export function Card({
  as: Component = 'div',
  color,
  variant,
  rounded,
  shadow,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Component className={clsx(cardRecipe({ color, variant, rounded, shadow }), className)} {...rest}>
      {children}
    </Component>
  );
}

Card.displayName = 'Card';
