import { vars } from '@shared/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const HOVERED = '&:hover:not(:disabled):not([aria-disabled="true"])';
const PRESSED = '&:active:not(:disabled):not([aria-disabled="true"])';

export const button = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: vars.fontWeight.semibold,
    transition: 'background-color 0.2s ease, transform 0.15s ease',
    selectors: {
      [PRESSED]: {
        transform: 'scale(0.96)',
      },
    },
  },
  variants: {
    color: {
      primary: {
        backgroundColor: vars.color.blue[500],
        color: vars.color.white,
        selectors: {
          [HOVERED]: { backgroundColor: vars.color.blue[600] },
          [PRESSED]: { backgroundColor: vars.color.blue[700] },
        },
      },
      secondary: {
        backgroundColor: vars.color.grey[100],
        color: vars.color.grey[800],
        selectors: {
          [HOVERED]: { backgroundColor: vars.color.grey[200] },
          [PRESSED]: { backgroundColor: vars.color.grey[300] },
        },
      },
      success: {
        backgroundColor: vars.color.green[500],
        color: vars.color.white,
        selectors: {
          [HOVERED]: { backgroundColor: vars.color.green[600] },
          [PRESSED]: { backgroundColor: vars.color.green[700] },
        },
      },
      error: {
        backgroundColor: vars.color.red[500],
        color: vars.color.white,
        selectors: {
          [HOVERED]: { backgroundColor: vars.color.red[600] },
          [PRESSED]: { backgroundColor: vars.color.red[700] },
        },
      },
      warning: {
        backgroundColor: vars.color.orange[500],
        color: vars.color.white,
        selectors: {
          [HOVERED]: { backgroundColor: vars.color.orange[600] },
          [PRESSED]: { backgroundColor: vars.color.orange[700] },
        },
      },
      black: {
        backgroundColor: vars.color.black,
        color: vars.color.white,
        selectors: {
          [HOVERED]: { backgroundColor: vars.color.grey[800] },
          [PRESSED]: { backgroundColor: vars.color.grey[700] },
        },
      },
    },
    size: {
      large: {
        height: '56px',
        paddingLeft: '32px',
        paddingRight: '32px',
        borderRadius: vars.borderRadius.xl,
        fontSize: vars.typography.t16.fontSize,
        lineHeight: vars.lineHeight.medium,
      },
      medium: {
        height: '48px',
        paddingLeft: '24px',
        paddingRight: '24px',
        borderRadius: vars.borderRadius.lg,
        fontSize: vars.typography.t14.fontSize,
        lineHeight: vars.lineHeight.medium,
      },
      small: {
        height: '36px',
        paddingLeft: '16px',
        paddingRight: '16px',
        borderRadius: vars.borderRadius.md,
        fontSize: vars.typography.t12.fontSize,
        lineHeight: vars.lineHeight.medium,
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    disabled: {
      true: {
        backgroundColor: vars.color.grey[200],
        color: vars.color.grey[400],
        cursor: 'not-allowed',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'large',
    disabled: false,
    fullWidth: false,
  },
});

export const content = style({
  transition: 'opacity 0.15s',
  selectors: {
    '[aria-busy="true"] &': {
      visibility: 'hidden',
    },
  },
});

export const loaderOverlay = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
