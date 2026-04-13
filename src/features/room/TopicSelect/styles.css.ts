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
    display: 'grid',
    gap: '12',
    paddingTop: '24',
  }),
  {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
]);

export const topicCard = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8',
    borderRadius: 'xl',
  }),
  {
    padding: '20px 12px',
    border: `1.5px solid ${vars.color.grey[200]}`,
    backgroundColor: vars.color.white,
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

export const topicCardSelected = style([
  topicCard,
  {
    borderColor: vars.color.green[500],
    backgroundColor: vars.color.green[50],
    ':hover': {
      backgroundColor: vars.color.green[50],
    },
  },
]);

export const topicIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.green[500],
});

export const submitButton = style({
  marginTop: 'auto',
  paddingTop: '20px',
  paddingBottom: '12px',
});
