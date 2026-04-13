import { vars } from '@shared/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const avatarRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    flexShrink: 0,
    overflow: 'hidden',
    userSelect: 'none',
  },
  variants: {
    size: {
      large: {
        width: '48px',
        height: '48px',
      },
      medium: {
        width: '32px',
        height: '32px',
      },
      small: {
        width: '24px',
        height: '24px',
      },
    },
    variant: {
      filled: {
        backgroundColor: vars.color.green[100],
        color: vars.color.green[600],
      },
      empty: {
        backgroundColor: vars.color.grey[200],
        color: vars.color.grey[400],
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    variant: 'filled',
  },
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const icon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
