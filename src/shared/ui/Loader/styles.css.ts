import { vars } from '@shared/styles';
import { animationSpin } from '@shared/styles/animations';
import { recipe } from '@vanilla-extract/recipes';

export const loaderRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    animationName: animationSpin,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDuration: '1000ms',
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        animation: 'none',
      },
    },
  },
  variants: {
    size: {
      small: { width: '20px', height: '20px' },
      medium: { width: '24px', height: '24px' },
      large: { width: '26px', height: '26px' },
    },
    color: {
      primary: { color: vars.color.blue[500] },
      secondary: { color: vars.color.grey[500] },
      success: { color: vars.color.green[500] },
      error: { color: vars.color.red[500] },
      warning: { color: vars.color.orange[500] },
      black: { color: vars.color.black },
    },
  },
  defaultVariants: {
    size: 'medium',
    color: 'primary',
  },
});
