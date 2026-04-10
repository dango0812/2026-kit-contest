import type { RecipeVariants } from '@vanilla-extract/recipes';
import clsx from 'clsx';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

import * as styles from './styles.css';

type TextVariants = NonNullable<RecipeVariants<typeof styles.textRecipe>>;

export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
  /**
   * 렌더링할 HTML 태그를 지정합니다.
   * @default 'p'
   */
  as?: ElementType;
  /**
   * 텍스트의 크기를 지정합니다.
   * @default 'body1'
   */
  fontSize?: TextVariants['fontSize'];
  /**
   * 텍스트의 두께를 지정합니다.
   * @default 'regular'
   */
  fontWeight?: TextVariants['fontWeight'];
  /**
   * 텍스트의 줄 간격을 지정합니다.
   * @default 'medium'
   */
  lineHeight?: TextVariants['lineHeight'];
  /**
   * 텍스트의 색상을 지정합니다.
   */
  color?: string;
  /**
   * 렌더링할 텍스트 내용을 지정합니다.
   */
  children: ReactNode;
}

export function Text({
  as: Component = 'p',
  fontSize,
  fontWeight,
  lineHeight,
  color,
  children,
  className,
  ...rest
}: TextProps) {
  return (
    <Component
      className={clsx(styles.textRecipe({ fontSize, fontWeight, lineHeight }), className)}
      style={{ ...(color && { color }) }}
      {...rest}
    >
      {children}
    </Component>
  );
}

Text.displayName = 'Text';
