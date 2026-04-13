import { sprinkles, vars } from '@shared/styles';
import { style } from '@vanilla-extract/css';

export const scrollArea = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
  }),
  {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 0px',
  },
]);

const scopeItemBase = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    borderRadius: 'lg',
  }),
  {
    padding: '14px 16px',
    border: `1.5px solid ${vars.color.grey[200]}`,
    backgroundColor: vars.color.white,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'border-color 0.15s ease, background-color 0.15s ease',
    ':hover': {
      backgroundColor: vars.color.grey[50],
    },
    ':focus-visible': {
      outline: `2px solid ${vars.color.blue[500]}`,
      outlineOffset: '2px',
    },
  },
]);

export const scopeItem = scopeItemBase;

export const scopeItemSelected = style([
  scopeItemBase,
  {
    borderColor: vars.color.blue[500],
    backgroundColor: vars.color.blue[50],
    ':hover': {
      backgroundColor: vars.color.blue[50],
    },
  },
]);

export const submitButton = style({
  marginTop: 'auto',
  paddingBottom: '12px',
});
