import { sprinkles, vars } from '@shared/styles';
import {
  animationSlideInBottom,
  animationSlideInBottomCenter,
  animationSlideInTop,
  animationSlideInTopCenter,
} from '@shared/styles/animations';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const toastRecipe = recipe({
  base: [
    sprinkles({
      display: 'flex',
      position: 'fixed',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12',
      borderRadius: 'lg',
    }),
    {
      zIndex: vars.zIndex.toast,
      padding: '14px 16px',
      color: vars.color.white,
      boxShadow: vars.shadow.md,
      maxWidth: '380px',
      minWidth: '200px',
      animationDuration: '0.3s',
      animationTimingFunction: 'ease',
      animationFillMode: 'forwards',
      '@media': {
        '(prefers-reduced-motion: reduce)': {
          animationDuration: '0.01ms',
        },
      },
    },
  ],
  variants: {
    color: {
      primary: { backgroundColor: vars.color.blue[500] },
      secondary: { backgroundColor: vars.color.grey[500] },
      success: { backgroundColor: vars.color.green[500] },
      error: { backgroundColor: vars.color.red[500] },
      warning: { backgroundColor: vars.color.orange[500] },
      black: { backgroundColor: vars.color.black },
    },
    position: {
      'top-left': {
        top: vars.space['20'],
        left: vars.space['20'],
        animationName: animationSlideInTop,
      },
      'top-center': {
        top: vars.space['20'],
        left: '50%',
        animationName: animationSlideInTopCenter,
      },
      'top-right': {
        top: vars.space['20'],
        right: vars.space['20'],
        animationName: animationSlideInTop,
      },
      'bottom-left': {
        bottom: vars.space['20'],
        left: vars.space['20'],
        animationName: animationSlideInBottom,
      },
      'bottom-center': {
        bottom: vars.space['20'],
        left: '50%',
        animationName: animationSlideInBottomCenter,
      },
      'bottom-right': {
        bottom: vars.space['20'],
        right: vars.space['20'],
        animationName: animationSlideInBottom,
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    position: 'top-center',
  },
});

export const closeButton = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }),
  { width: '20px', height: '20px', color: vars.color.white },
]);
