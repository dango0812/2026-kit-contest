import { sprinkles, vars } from '@shared/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
  }),
  {
    flex: 1,
  },
]);

export const section = sprinkles({
  display: 'flex',
  flexDirection: 'column',
  gap: '8',
});

export const memberGroup = sprinkles({
  display: 'flex',
  gap: '10',
});

export const memberFieldset = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
  }),
  {
    border: 'none',
    padding: 0,
    margin: 0,
  },
]);

export const radioInput = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
});

export const memberButton = style([
  sprinkles({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'lg',
  }),
  {
    flex: 1,
    height: '44px',
    border: `1.5px solid ${vars.color.grey[200]}`,
    fontWeight: vars.fontWeight.medium,
    fontSize: vars.typography.t16.fontSize,
    color: vars.color.grey[700],
    transition: 'border-color 0.15s ease, background-color 0.15s ease',
    ':hover': {
      backgroundColor: vars.color.grey[50],
    },
    selectors: {
      '&:has(input:focus-visible)': {
        outline: `2px solid ${vars.color.green[500]}`,
        outlineOffset: '1px',
      },
      '&:has(input:disabled)': {
        cursor: 'not-allowed',
      },
      '&:has(input:disabled):hover': {
        backgroundColor: 'initial',
      },
    },
  },
]);

export const memberButtonSelected = style([
  memberButton,
  {
    borderColor: vars.color.green[500],
    backgroundColor: vars.color.green[50],
    color: vars.color.green[600],
    fontWeight: vars.fontWeight.bold,
    ':hover': {
      backgroundColor: vars.color.green[50],
    },
    selectors: {
      '&:has(input:disabled):hover': {
        backgroundColor: vars.color.green[50],
      },
    },
  },
]);

export const codeBox = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 'lg',
    padding: '16',
  }),
  {
    backgroundColor: vars.color.grey[50],
    border: `1.5px solid ${vars.color.grey[200]}`,
    cursor: 'default',
  },
]);

export const copyButton = style([
  sprinkles({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'md',
  }),
  {
    width: '32px',
    height: '32px',
    color: vars.color.grey[500],
    transition: 'background-color 0.15s ease, color 0.15s ease',
    ':hover': {
      backgroundColor: vars.color.grey[200],
      color: vars.color.grey[700],
    },
    ':focus-visible': {
      outline: `2px solid ${vars.color.green[500]}`,
      outlineOffset: '2px',
    },
  },
]);

export const participantRow = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    gap: '10',
    padding: '10',
    borderRadius: 'lg',
  }),
  {
    backgroundColor: vars.color.grey[50],
  },
]);

export const submitButton = style({
  marginTop: 'auto',
  paddingTop: '20px',
  paddingBottom: '12px',
});
