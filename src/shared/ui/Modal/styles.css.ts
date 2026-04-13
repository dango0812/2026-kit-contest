import { sprinkles, vars } from '@shared/styles';
import { style } from '@vanilla-extract/css';

export const overlay = style([
  sprinkles({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: vars.zIndex.overlay,
  },
]);

export const panel = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '16',
    borderRadius: 'xl',
  }),
  {
    backgroundColor: vars.color.white,
    padding: '24px 20px',
    width: 'calc(100% - 40px)',
    maxWidth: '320px',
    boxShadow: vars.shadow.lg,
  },
]);

export const buttonGroup = sprinkles({
  display: 'flex',
  gap: '8',
});
