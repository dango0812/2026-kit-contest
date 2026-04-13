import { vars } from '@shared/styles';
import { recipe } from '@vanilla-extract/recipes';

export const cardRecipe = recipe({
  base: {
    boxSizing: 'border-box',
    padding: '20px',
    borderRadius: vars.borderRadius.frame,
  },
  variants: {
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
      outline: {},
    },
    rounded: {
      none: { borderRadius: vars.borderRadius.none },
      sm: { borderRadius: vars.borderRadius.sm },
      md: { borderRadius: vars.borderRadius.md },
      lg: { borderRadius: vars.borderRadius.lg },
      xl: { borderRadius: vars.borderRadius.xl },
      '2xl': { borderRadius: vars.borderRadius['2xl'] },
      full: { borderRadius: vars.borderRadius.full },
      frame: { borderRadius: vars.borderRadius.frame },
    },
    shadow: {
      none: { boxShadow: 'none' },
      light: { boxShadow: vars.shadow.sm },
      medium: { boxShadow: vars.shadow.md },
      strong: { boxShadow: vars.shadow.lg },
    },
  },
  compoundVariants: [
    // solid
    {
      variants: { color: 'primary', variant: 'solid' },
      style: { backgroundColor: vars.color.green[50] },
    },
    {
      variants: { color: 'secondary', variant: 'solid' },
      style: { backgroundColor: vars.color.grey[100] },
    },
    {
      variants: { color: 'success', variant: 'solid' },
      style: { backgroundColor: vars.color.green[50] },
    },
    {
      variants: { color: 'error', variant: 'solid' },
      style: { backgroundColor: vars.color.red[50] },
    },
    {
      variants: { color: 'warning', variant: 'solid' },
      style: { backgroundColor: vars.color.orange[50] },
    },
    {
      variants: { color: 'black', variant: 'solid' },
      style: { backgroundColor: vars.color.grey[900], color: vars.color.white },
    },
    // outline
    {
      variants: { color: 'primary', variant: 'outline' },
      style: { backgroundColor: vars.color.white, border: `1.5px solid ${vars.color.green[300]}` },
    },
    {
      variants: { color: 'secondary', variant: 'outline' },
      style: { backgroundColor: vars.color.white, border: `1.5px solid ${vars.color.grey[200]}` },
    },
    {
      variants: { color: 'success', variant: 'outline' },
      style: { backgroundColor: vars.color.white, border: `1.5px solid ${vars.color.green[300]}` },
    },
    {
      variants: { color: 'error', variant: 'outline' },
      style: { backgroundColor: vars.color.white, border: `1.5px solid ${vars.color.red[300]}` },
    },
    {
      variants: { color: 'warning', variant: 'outline' },
      style: { backgroundColor: vars.color.white, border: `1.5px solid ${vars.color.orange[300]}` },
    },
    {
      variants: { color: 'black', variant: 'outline' },
      style: { backgroundColor: vars.color.white, border: `1.5px solid ${vars.color.grey[800]}` },
    },
  ],
  defaultVariants: {
    color: 'secondary',
    variant: 'solid',
    rounded: 'frame',
    shadow: 'light',
  },
});
