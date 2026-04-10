import { vars } from '@shared/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  userSelect: 'none',
});

const ICON_SIZE = 24;

export const indicatorRecipe = recipe({
  base: {
    position: 'relative',
    width: ICON_SIZE,
    height: ICON_SIZE,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
    border: `2px solid ${vars.color.grey[300]}`,
    backgroundColor: vars.color.white,
    color: vars.color.white,
    ':focus-visible': {
      outline: `2px solid ${vars.color.blue[400]}`,
      outlineOffset: 2,
    },
  },
  variants: {
    shape: {
      squircle: { borderRadius: vars.borderRadius.sm },
      circle: { borderRadius: '50%' },
      line: {
        border: 'none',
        backgroundColor: 'transparent',
        color: vars.color.grey[300],
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
    checked: { true: {}, false: {} },
    disabled: { true: { cursor: 'not-allowed' }, false: {} },
  },
  compoundVariants: [
    // Checked
    {
      variants: { shape: 'squircle', checked: true, disabled: false },
      style: { backgroundColor: vars.color.blue[500], borderColor: vars.color.blue[500] },
    },
    {
      variants: { shape: 'circle', checked: true, disabled: false },
      style: { backgroundColor: vars.color.blue[500], borderColor: vars.color.blue[500] },
    },

    // Disabled
    {
      variants: { shape: 'squircle', checked: false, disabled: true },
      style: { backgroundColor: vars.color.grey[100], borderColor: vars.color.grey[200] },
    },
    {
      variants: { shape: 'circle', checked: false, disabled: true },
      style: { backgroundColor: vars.color.grey[100], borderColor: vars.color.grey[200] },
    },
    {
      variants: { shape: 'squircle', checked: true, disabled: true },
      style: { backgroundColor: vars.color.blue[200], borderColor: vars.color.blue[200] },
    },
    {
      variants: { shape: 'circle', checked: true, disabled: true },
      style: { backgroundColor: vars.color.blue[200], borderColor: vars.color.blue[200] },
    },

    // Line checked
    { variants: { shape: 'line', checked: true, disabled: false }, style: { color: vars.color.blue[500] } },
    { variants: { shape: 'line', checked: true, disabled: true }, style: { color: vars.color.blue[200] } },

    // Squircle
    {
      variants: { shape: 'squircle', color: 'secondary', checked: true, disabled: false },
      style: { backgroundColor: vars.color.grey[500], borderColor: vars.color.grey[500] },
    },
    {
      variants: { shape: 'squircle', color: 'success', checked: true, disabled: false },
      style: { backgroundColor: vars.color.green[500], borderColor: vars.color.green[500] },
    },
    {
      variants: { shape: 'squircle', color: 'error', checked: true, disabled: false },
      style: { backgroundColor: vars.color.red[500], borderColor: vars.color.red[500] },
    },
    {
      variants: { shape: 'squircle', color: 'warning', checked: true, disabled: false },
      style: { backgroundColor: vars.color.orange[500], borderColor: vars.color.orange[500] },
    },
    {
      variants: { shape: 'squircle', color: 'black', checked: true, disabled: false },
      style: { backgroundColor: vars.color.black, borderColor: vars.color.black },
    },
    // Circle
    {
      variants: { shape: 'circle', color: 'secondary', checked: true, disabled: false },
      style: { backgroundColor: vars.color.grey[500], borderColor: vars.color.grey[500] },
    },
    {
      variants: { shape: 'circle', color: 'success', checked: true, disabled: false },
      style: { backgroundColor: vars.color.green[500], borderColor: vars.color.green[500] },
    },
    {
      variants: { shape: 'circle', color: 'error', checked: true, disabled: false },
      style: { backgroundColor: vars.color.red[500], borderColor: vars.color.red[500] },
    },
    {
      variants: { shape: 'circle', color: 'warning', checked: true, disabled: false },
      style: { backgroundColor: vars.color.orange[500], borderColor: vars.color.orange[500] },
    },
    {
      variants: { shape: 'circle', color: 'black', checked: true, disabled: false },
      style: { backgroundColor: vars.color.black, borderColor: vars.color.black },
    },
    // Line
    {
      variants: { shape: 'line', color: 'secondary', checked: true, disabled: false },
      style: { color: vars.color.grey[500] },
    },
    {
      variants: { shape: 'line', color: 'success', checked: true, disabled: false },
      style: { color: vars.color.green[500] },
    },
    {
      variants: { shape: 'line', color: 'error', checked: true, disabled: false },
      style: { color: vars.color.red[500] },
    },
    {
      variants: { shape: 'line', color: 'warning', checked: true, disabled: false },
      style: { color: vars.color.orange[500] },
    },
    { variants: { shape: 'line', color: 'black', checked: true, disabled: false }, style: { color: vars.color.black } },
  ],
  defaultVariants: {
    shape: 'squircle',
    color: 'primary',
    checked: false,
    disabled: false,
  },
});

export const checkIconRecipe = recipe({
  base: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  variants: {
    // Squircle/Circle: draw-in 애니메이션 사용
    // Line: 아이콘 항상 표시, 색상만 전환
    animation: {
      draw: {},
      none: {},
    },
    checked: { true: {}, false: {} },
  },
  defaultVariants: {
    animation: 'draw',
    checked: false,
  },
});
