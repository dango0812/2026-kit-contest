import { sprinkles, vars } from '@shared/styles';
import { keyframes, style } from '@vanilla-extract/css';

export const wrapper = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
  }),
  {
    flex: 1,
  },
]);

export const content = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '20',
  }),
  {
    flex: 1,
  },
]);

export const caseTitleBox = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
    padding: '20',
    borderRadius: 'xl',
  }),
  {
    background: `linear-gradient(135deg, ${vars.color.green[500]}, ${vars.color.green[700]})`,
    color: vars.color.white,
  },
]);

export const cardList = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
  }),
]);

export const missionPreview = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    gap: '12',
    padding: '12',
    borderRadius: 'lg',
  }),
  {
    backgroundColor: vars.color.grey[50],
    border: `1.5px solid ${vars.color.grey[200]}`,
  },
]);

export const missionIndex = style([
  sprinkles({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'full',
  }),
  {
    width: '24px',
    height: '24px',
    backgroundColor: vars.color.green[100],
    color: vars.color.green[600],
    fontSize: vars.typography.t12.fontSize,
    fontWeight: vars.fontWeight.bold,
    flexShrink: 0,
  },
]);

export const submitButton = style({
  padding: '12px 20px',
  marginTop: 'auto',
});

const pulse = keyframes({
  '0%, 100%': { opacity: '1' },
  '50%': { opacity: '0.4' },
});

export const loadingWrapper = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16',
  }),
  {
    flex: 1,
  },
]);

export const loadingDots = style([
  sprinkles({
    display: 'flex',
    gap: '8',
  }),
]);

export const dot = style({
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  backgroundColor: vars.color.green[400],
  animation: `${pulse} 1.4s ease-in-out infinite`,
  selectors: {
    '&:nth-child(2)': { animationDelay: '0.2s' },
    '&:nth-child(3)': { animationDelay: '0.4s' },
  },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});

const textSlide = keyframes({
  from: { opacity: '0', transform: 'translateY(8px)' },
  to: { opacity: '1', transform: 'translateY(0)' },
});

export const cyclingText = style({
  margin: 0,
  fontSize: vars.typography.t16.fontSize,
  color: vars.color.grey[500],
  textAlign: 'center',
  animation: `${textSlide} 0.4s ease`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});
