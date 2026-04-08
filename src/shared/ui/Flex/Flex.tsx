import { type Sprinkles, sprinkles } from '@shared/styles';
import type { ElementType, HTMLAttributes } from 'react';

type FlexSprinkles = Pick<
  Sprinkles,
  | 'flexDirection'
  | 'alignItems'
  | 'justifyContent'
  | 'gap'
  | 'flexWrap'
  | 'borderRadius'
  | 'flexGrow'
  | 'flexShrink'
  | 'textAlign'
>;

export interface FlexProps extends HTMLAttributes<HTMLElement> {
  /**
   * 렌더링할 HTML 엘리먼트를 지정합니다.
   * @default 'div'
   */
  as?: ElementType;
  /**
   * flex-direction을 지정합니다.
   * @default 'row'
   */
  direction?: FlexSprinkles['flexDirection'];
  /**
   * align-items를 지정합니다.
   * @default 'start'
   */
  align?: FlexSprinkles['alignItems'];
  /**
   * justify-content를 지정합니다.
   * @default 'start'
   */
  justify?: FlexSprinkles['justifyContent'];
  /**
   * gap을 지정합니다.
   * @default 'none'
   */
  gap?: FlexSprinkles['gap'];
  /**
   * flex-wrap을 지정합니다.
   * @default 'nowrap'
   */
  flexWrap?: FlexSprinkles['flexWrap'];
  /**
   * border-radius를 지정합니다.
   * @default 'none'
   */
  rounded?: FlexSprinkles['borderRadius'];
  /**
   * flex-grow를 지정합니다.
   * @default '0'
   */
  flexGrow?: FlexSprinkles['flexGrow'];
  /**
   * flex-shrink를 지정합니다.
   * @default '1'
   */
  flexShrink?: FlexSprinkles['flexShrink'];
  /**
   * text-align을 지정합니다.
   * @default 'start'
   */
  textAlign?: FlexSprinkles['textAlign'];
}

export function Flex({
  as: Component = 'div',
  direction,
  align,
  justify,
  gap,
  rounded,
  flexWrap,
  flexGrow,
  flexShrink,
  textAlign,
  children,
  ...rest
}: FlexProps) {
  return (
    <Component
      className={sprinkles({
        display: 'flex',
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        gap: gap,
        borderRadius: rounded,
        flexWrap: flexWrap,
        flexGrow: flexGrow,
        flexShrink: flexShrink,
        textAlign: textAlign,
      })}
      {...rest}
    >
      {children}
    </Component>
  );
}

Flex.displayName = 'Flex';
