import { style } from '@vanilla-extract/css';

import { sprinkles, vars } from '@/shared/styles';

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

export const mobileWrapper = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
  }),
  {
    minHeight: '100dvh',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '40px 20px 20px',
  },
]);

export const tip = style([
  sprinkles({
    justifyContent: 'center',
    padding: '12',
  }),
  {
    borderTop: `1px solid ${vars.color.grey[100]}`,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: vars.color.white,
    zIndex: 10,
  },
]);
