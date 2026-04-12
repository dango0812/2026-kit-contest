import { breakpoints } from '@constants/breakpoints';
import { style } from '@vanilla-extract/css';

import { sprinkles } from '@/shared/styles';

export const wrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    minHeight: '100dvh',
  },
]);

export const desktopContent = style({
  '@media': {
    [`(max-width: ${breakpoints.md}px)`]: {
      display: 'none',
    },
  },
});

export const mobileContent = style({
  display: 'none',
  '@media': {
    [`(max-width: ${breakpoints.md}px)`]: {
      display: 'flex',
      textAlign: 'center',
      whiteSpace: 'pre-line',
      padding: '0px 20px',
    },
  },
});
