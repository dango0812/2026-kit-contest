import type { RecipeVariants } from '@vanilla-extract/recipes';
import type { ElementType, ReactNode } from 'react';

import { textRecipe } from './Text.css';

type TextVariants = NonNullable<RecipeVariants<typeof textRecipe>>;

export interface TextProps {
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

export function Text({ as: Component = 'p', fontSize, fontWeight, lineHeight, color, children, ...rest }: TextProps) {
  return (
    <Component
      className={textRecipe({ fontSize, fontWeight, lineHeight })}
      style={{ ...(color && { color }) }}
      {...rest}
    >
      {children}
    </Component>
  );
}

Text.displayName = 'Text';
