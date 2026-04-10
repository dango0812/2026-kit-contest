import { sprinkles, vars } from '@shared/styles';
import { style } from '@vanilla-extract/css';

export const headerWrapper = style([
  sprinkles({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '8',
  }),
]);

export const frame = style([
  sprinkles({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }),
  {
    width: '375px',
    height: '700px',
    backgroundColor: vars.color.white,
    border: `6px solid ${vars.color.black}`,
    borderRadius: '40px',
    boxShadow: vars.shadow.md,
  },
]);

export const notch = style([
  sprinkles({
    position: 'absolute',
  }),
  {
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '130px',
    height: '28px',
    backgroundColor: vars.color.black,
    borderBottomLeftRadius: '16px',
    borderBottomRightRadius: '16px',
    zIndex: 10,
  },
]);

export const content = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    paddingTop: '40',
    px: '20',
  }),
  {
    flex: 1,
    '::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
  },
]);
