import { sprinkles, vars } from '@shared/styles';
import { style } from '@vanilla-extract/css';

export const lobbyWrapper = sprinkles({ paddingTop: '20' });

export const textPreLine = style({
  whiteSpace: 'pre-line',
});

export const cardBase = style([
  sprinkles({
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    padding: '20',
    borderRadius: 'frame',
  }),
  {
    width: '100%',
    textAlign: 'left',
  },
]);

export const primaryCard = style([
  cardBase,
  {
    backgroundColor: vars.color.blue[500],
    transition: 'background-color 0.15s ease',
    ':hover': {
      backgroundColor: vars.color.blue[600],
    },
    ':focus-visible': {
      outline: `2px solid ${vars.color.blue[300]}`,
      outlineOffset: '2px',
    },
  },
]);

export const outlineCard = style([
  cardBase,
  {
    backgroundColor: vars.color.white,
    border: `1.5px solid ${vars.color.grey[200]}`,
    boxShadow: vars.shadow.sm,
    transition: 'background-color 0.15s ease',
    ':hover': {
      backgroundColor: vars.color.grey[50],
    },
    ':focus-visible': {
      outline: `2px solid ${vars.color.blue[500]}`,
      outlineOffset: '2px',
    },
  },
]);

export const iconCircle = style([
  sprinkles({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'full',
  }),
  {
    bottom: '16px',
    right: '16px',
    width: '52px',
    height: '52px',
  },
]);

export const iconCirclePrimary = style([
  iconCircle,
  sprinkles({ color: 'inverse' }),
  {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    '::before': {
      content: '""',
      position: 'absolute',
      width: '72px',
      height: '72px',
      borderRadius: vars.borderRadius.full,
      border: `1.5px solid rgba(255, 255, 255, 0.15)`,
    },
    '::after': {
      content: '""',
      position: 'absolute',
      width: '96px',
      height: '96px',
      borderRadius: vars.borderRadius.full,
      border: `1.5px solid rgba(255, 255, 255, 0.1)`,
    },
  },
]);

export const iconCircleOutline = style([
  iconCircle,
  {
    backgroundColor: vars.color.blue[500],
    color: vars.color.white,
    '::before': {
      content: '""',
      position: 'absolute',
      width: '72px',
      height: '72px',
      borderRadius: vars.borderRadius.full,
      border: `1.5px solid ${vars.color.blue[100]}`,
    },
    '::after': {
      content: '""',
      position: 'absolute',
      width: '96px',
      height: '96px',
      borderRadius: vars.borderRadius.full,
      border: `1.5px solid ${vars.color.blue[50]}`,
    },
  },
]);
