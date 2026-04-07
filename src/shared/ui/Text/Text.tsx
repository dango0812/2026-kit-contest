import type { RecipeVariants } from '@vanilla-extract/recipes';
import type { ElementType, ReactNode } from 'react';

import { textRecipe } from './Text.css';

type TextVariants = NonNullable<RecipeVariants<typeof textRecipe>>;

export interface TextProps {
  as?: ElementType;
  fontSize?: TextVariants['fontSize'];
  fontWeight?: TextVariants['fontWeight'];
  color?: string;
  lineHeight?: TextVariants['lineHeight'];
  children: ReactNode;
}

/**
 * Text 컴포넌트
 *
 * @param {TextProps} props - 컴포넌트의 Props
 * @param {ElementType} [props.as='p'] - 렌더링할 HTML 태그
 * @param {TextVariants['fontSize']} [props.fontSize] - 폰트 크기
 * @param {TextVariants['fontWeight']} [props.fontWeight] - 폰트 굵기
 * @param {string} [props.color] - 텍스트 색상
 * @param {TextVariants['lineHeight']} [props.lineHeight] - 줄 높이
 * @param {ReactNode} props.children - 텍스트 내용
 *
 * @example
 * <Text as="h1" fontSize="h1" fontWeight="bold" color={vars.colors.primary}>
 *   텍스트
 * </Text>
 */
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
