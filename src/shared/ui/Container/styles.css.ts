import { breakpoints } from '@constants/breakpoints';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/shared/styles';

const marginAuto = style({
  marginLeft: 'auto',
  marginRight: 'auto',
});

export const containerRecipe = recipe({
  base: {
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: vars.space[20],
    paddingRight: vars.space[20],
  },
  variants: {
    maxWidth: {
      xs: [marginAuto, { maxWidth: `${breakpoints.xs}px` }],
      sm: [marginAuto, { maxWidth: `${breakpoints.sm}px` }],
      md: [marginAuto, { maxWidth: `${breakpoints.md}px` }],
      lg: [marginAuto, { maxWidth: `${breakpoints.lg}px` }],
      xl: [marginAuto, { maxWidth: `${breakpoints.xl}px` }],
      '2xl': [marginAuto, { maxWidth: `${breakpoints['2xl']}px` }],
    },
  },
});
