import { vars } from '@shared/styles';
import { recipe } from '@vanilla-extract/recipes';

export const badgeRecipe = recipe({
  base: {
    fontWeight: vars.fontWeight.semibold,
    borderRadius: vars.borderRadius.full,
  },
  variants: {
    size: {
      small: {
        fontSize: vars.typography.t12.fontSize,
        paddingTop: '2px',
        paddingBottom: '2px',
        paddingLeft: '8px',
        paddingRight: '8px',
      },
      medium: {
        fontSize: vars.typography.t14.fontSize,
        paddingTop: '4px',
        paddingBottom: '4px',
        paddingLeft: '10px',
        paddingRight: '10px',
      },
      large: {
        fontSize: vars.typography.t16.fontSize,
        paddingTop: '6px',
        paddingBottom: '6px',
        paddingLeft: '12px',
        paddingRight: '12px',
      },
    },
    color: {
      primary: {},
      secondary: {},
      success: {},
      error: {},
      warning: {},
      black: {},
    },
    variant: {
      solid: {},
      subtle: {},
    },
  },
  compoundVariants: [
    // solid
    {
      variants: { color: 'primary', variant: 'solid' },
      style: { backgroundColor: vars.color.blue[500], color: vars.color.white },
    },
    {
      variants: { color: 'secondary', variant: 'solid' },
      style: { backgroundColor: vars.color.grey[500], color: vars.color.white },
    },
    {
      variants: { color: 'success', variant: 'solid' },
      style: { backgroundColor: vars.color.green[500], color: vars.color.white },
    },
    {
      variants: { color: 'error', variant: 'solid' },
      style: { backgroundColor: vars.color.red[500], color: vars.color.white },
    },
    {
      variants: { color: 'warning', variant: 'solid' },
      style: { backgroundColor: vars.color.orange[500], color: vars.color.white },
    },
    {
      variants: { color: 'black', variant: 'solid' },
      style: { backgroundColor: vars.color.black, color: vars.color.white },
    },
    // subtle
    {
      variants: { color: 'primary', variant: 'subtle' },
      style: { backgroundColor: vars.color.blue[50], color: vars.color.blue[500] },
    },
    {
      variants: { color: 'secondary', variant: 'subtle' },
      style: { backgroundColor: vars.color.grey[100], color: vars.color.grey[600] },
    },
    {
      variants: { color: 'success', variant: 'subtle' },
      style: { backgroundColor: vars.color.green[50], color: vars.color.green[500] },
    },
    {
      variants: { color: 'error', variant: 'subtle' },
      style: { backgroundColor: vars.color.red[50], color: vars.color.red[500] },
    },
    {
      variants: { color: 'warning', variant: 'subtle' },
      style: { backgroundColor: vars.color.orange[50], color: vars.color.orange[500] },
    },
    {
      variants: { color: 'black', variant: 'subtle' },
      style: { backgroundColor: vars.color.grey[100], color: vars.color.grey[800] },
    },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'large',
    variant: 'solid',
  },
});

export const dotRecipe = recipe({
  base: {
    display: 'inline-block',
    borderRadius: vars.borderRadius.full,
    flexShrink: 0,
  },
  variants: {
    size: {
      small: { width: '6px', height: '6px' },
      medium: { width: '8px', height: '8px' },
      large: { width: '10px', height: '10px' },
    },
    color: {
      primary: { backgroundColor: vars.color.blue[500] },
      secondary: { backgroundColor: vars.color.grey[600] },
      success: { backgroundColor: vars.color.green[500] },
      error: { backgroundColor: vars.color.red[500] },
      warning: { backgroundColor: vars.color.orange[500] },
      black: { backgroundColor: vars.color.black },
    },
    variant: {
      solid: {},
      subtle: {},
    },
  },
  compoundVariants: [
    // solid
    { variants: { color: 'primary', variant: 'solid' }, style: { backgroundColor: 'rgba(255,255,255,0.85)' } },
    { variants: { color: 'secondary', variant: 'solid' }, style: { backgroundColor: 'rgba(255,255,255,0.85)' } },
    { variants: { color: 'success', variant: 'solid' }, style: { backgroundColor: 'rgba(255,255,255,0.85)' } },
    { variants: { color: 'error', variant: 'solid' }, style: { backgroundColor: 'rgba(255,255,255,0.85)' } },
    { variants: { color: 'warning', variant: 'solid' }, style: { backgroundColor: 'rgba(255,255,255,0.85)' } },
    { variants: { color: 'black', variant: 'solid' }, style: { backgroundColor: 'rgba(255,255,255,0.85)' } },
    // subtle
    { variants: { color: 'primary', variant: 'subtle' }, style: { backgroundColor: vars.color.blue[500] } },
    { variants: { color: 'secondary', variant: 'subtle' }, style: { backgroundColor: vars.color.grey[600] } },
    { variants: { color: 'success', variant: 'subtle' }, style: { backgroundColor: vars.color.green[500] } },
    { variants: { color: 'error', variant: 'subtle' }, style: { backgroundColor: vars.color.red[500] } },
    { variants: { color: 'warning', variant: 'subtle' }, style: { backgroundColor: vars.color.orange[500] } },
    { variants: { color: 'black', variant: 'subtle' }, style: { backgroundColor: vars.color.grey[800] } },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'large',
  },
});
