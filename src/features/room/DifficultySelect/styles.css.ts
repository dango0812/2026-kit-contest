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

export const topSection = sprinkles({
  display: 'flex',
  flexDirection: 'column',
  gap: '10',
});

export const textPreLine = style({
  whiteSpace: 'pre-line',
});

export const grid = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '12',
    paddingTop: '24',
  }),
]);

export const card = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
    borderRadius: 'xl',
  }),
  {
    padding: '20px 16px',
    border: `1.5px solid ${vars.color.grey[200]}`,
    backgroundColor: vars.color.white,
    textAlign: 'left',
    transition: 'border-color 0.15s ease, background-color 0.15s ease',
    ':hover': {
      backgroundColor: vars.color.grey[50],
    },
    ':focus-visible': {
      outline: `2px solid ${vars.color.green[500]}`,
      outlineOffset: '2px',
    },
  },
]);

export const cardSelected = style([
  card,
  {
    borderColor: vars.color.green[500],
    backgroundColor: vars.color.green[50],
    ':hover': {
      backgroundColor: vars.color.green[50],
    },
  },
]);

export const submitButton = style({
  marginTop: 'auto',
  paddingBottom: '12px',
});
