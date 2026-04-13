import { vars } from '@shared/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const textFieldRecipe = recipe({
  base: {
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: vars.borderRadius.lg,
    border: `1.5px solid ${vars.color.grey[200]}`,
    backgroundColor: vars.color.grey[50],
    fontFamily: 'inherit',
    color: vars.color.grey[900],
    transition: 'border-color 0.15s ease, background-color 0.15s ease',
    outline: 'none',
    '::placeholder': {
      color: vars.color.grey[400],
    },
    ':focus': {
      borderColor: vars.color.green[500],
    },
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    selectors: {
      '&:read-only': {
        backgroundColor: vars.color.grey[100],
        cursor: 'not-allowed',
      },
      '&:read-only:focus': {
        borderColor: vars.color.grey[200],
      },
      '&:read-only:hover': {
        borderColor: vars.color.grey[200],
      },
    },
  },
  variants: {
    size: {
      large: {
        height: '56px',
        padding: '0 16px',
        fontSize: vars.typography.t16.fontSize,
      },
      medium: {
        height: '48px',
        padding: '0 16px',
        fontSize: vars.typography.t16.fontSize,
      },
      small: {
        height: '40px',
        padding: '0 12px',
        fontSize: vars.typography.t14.fontSize,
      },
    },
    error: {
      true: {
        borderColor: vars.color.red[500],
        backgroundColor: vars.color.red[50],
        ':focus': {
          borderColor: vars.color.red[500],
        },
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    error: false,
  },
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});
