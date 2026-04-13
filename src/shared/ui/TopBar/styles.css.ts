import { sprinkles, vars } from '@shared/styles';
import { style } from '@vanilla-extract/css';

export const topBar = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: '4',
  }),
  {
    minHeight: '36px',
  },
]);

export const backButton = style([
  sprinkles({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'md',
  }),
  {
    width: '32px',
    height: '32px',
    color: vars.color.grey[800],
    transition: 'background-color 0.15s ease',
    ':hover': {
      backgroundColor: vars.color.grey[100],
    },
    ':focus-visible': {
      outline: `2px solid ${vars.color.blue[500]}`,
      outlineOffset: '2px',
    },
  },
]);

export const title = style({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  whiteSpace: 'nowrap',
});

export const rightContent = style({
  marginLeft: 'auto',
});
