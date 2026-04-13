import type { Color, Size } from './types';

/** 공통 Size 옵션 */
export const SIZE_OPTIONS: readonly Size[] = ['small', 'medium', 'large'] as const;

/** 공통 Color 옵션 */
export const COLOR_OPTIONS: readonly Color[] = [
  'primary',
  'secondary',
  'success',
  'error',
  'warning',
  'black',
] as const;

/** Storybook 공통 argTypes 프리셋 */
export const commonArgTypes = {
  size: { control: 'select' as const, options: [...SIZE_OPTIONS] },
  color: { control: 'select' as const, options: [...COLOR_OPTIONS] },
  className: { table: { disable: true } },
} as const;
