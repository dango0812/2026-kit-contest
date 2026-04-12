import { style } from '@vanilla-extract/css';

import { sprinkles } from '@/shared/styles';

export const container = style([
  sprinkles({
    display: 'flex',
    gap: '32',
  }),
]);
