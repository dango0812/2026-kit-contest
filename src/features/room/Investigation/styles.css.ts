import { sprinkles, vars } from '@shared/styles';
import { keyframes, style } from '@vanilla-extract/css';

export const wrapper = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
  }),
  {
    flex: 1,
    overflow: 'auto',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
  },
]);

export const header = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12',
  }),
  {
    borderBottom: `1px solid ${vars.color.grey[100]}`,
  },
]);

export const progressBar = style([
  sprinkles({
    display: 'flex',
    gap: '4',
    padding: '12',
    marginBottom: '10',
  }),
]);

export const progressDot = style({
  flex: 1,
  height: '4px',
  borderRadius: '2px',
  backgroundColor: vars.color.grey[200],
  transition: 'background-color 0.3s ease',
});

export const progressDotActive = style({
  backgroundColor: vars.color.green[400],
});

export const progressDotDone = style({
  backgroundColor: vars.color.green[600],
});

export const missionContent = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '16',
  }),
  {
    flex: 1,
  },
]);

export const missionLabel = style([
  sprinkles({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6',
    padding: '6',
    borderRadius: 'md',
  }),
  {
    backgroundColor: vars.color.green[50],
    color: vars.color.green[600],
    alignSelf: 'flex-start',
  },
]);

export const clueCard = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
    padding: '16',
    borderRadius: 'lg',
  }),
  {
    background: `linear-gradient(135deg, ${vars.color.orange[50]}, ${vars.color.yellow[50]})`,
    border: `1.5px solid ${vars.color.orange[200]}`,
  },
]);

export const choiceList = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
  }),
]);

export const choiceButton = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    gap: '12',
    padding: '12',
    borderRadius: 'lg',
  }),
  {
    backgroundColor: vars.color.white,
    border: `1.5px solid ${vars.color.grey[200]}`,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'border-color 0.2s ease, background-color 0.2s ease',
    ':hover': {
      borderColor: vars.color.green[300],
      backgroundColor: vars.color.green[50],
    },
  },
]);

export const choiceButtonSelected = style({
  borderColor: vars.color.green[500],
  backgroundColor: vars.color.green[50],
});

export const choiceButtonCorrect = style({
  borderColor: vars.color.green[500],
  backgroundColor: vars.color.green[50],
});

export const choiceButtonWrong = style({
  borderColor: vars.color.red[500],
  backgroundColor: vars.color.red[50],
});

export const choiceIndex = style([
  sprinkles({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'full',
  }),
  {
    width: '24px',
    height: '24px',
    backgroundColor: vars.color.grey[100],
    fontSize: vars.typography.t12.fontSize,
    fontWeight: vars.fontWeight.semibold,
    flexShrink: 0,
  },
]);

export const imageBox = style([
  sprinkles({
    borderRadius: 'lg',
  }),
  {
    width: '100%',
    aspectRatio: '16 / 10',
    objectFit: 'cover',
    backgroundColor: vars.color.grey[100],
  },
]);

export const answerSection = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
  }),
  {
    marginTop: 'auto',
    padding: '0 20px 12px',
  },
]);

export const explanationBox = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
    padding: '16',
    borderRadius: 'lg',
  }),
  {
    backgroundColor: vars.color.green[50],
    border: `1.5px solid ${vars.color.green[200]}`,
  },
]);

export const explanationBoxWrong = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
    padding: '16',
    borderRadius: 'lg',
  }),
  {
    backgroundColor: vars.color.red[50],
    border: `1.5px solid ${vars.color.red[200]}`,
  },
]);

export const aiHintButton = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    gap: '6',
    padding: '10',
    borderRadius: 'lg',
  }),
  {
    backgroundColor: vars.color.green[50],
    border: `1.5px solid ${vars.color.green[200]}`,
    color: vars.color.green[600],
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: vars.color.green[100],
    },
  },
]);

export const aiHintSection = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
    padding: '12',
    borderRadius: 'lg',
  }),
  {
    backgroundColor: vars.color.green[50],
    border: `1.5px solid ${vars.color.green[200]}`,
    paddingBottom: '20px',
  },
]);

export const clueRevealCard = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
    padding: '16',
    borderRadius: 'lg',
  }),
  {
    background: `linear-gradient(135deg, ${vars.color.green[50]}, ${vars.color.teal[50]})`,
    border: `1.5px solid ${vars.color.green[200]}`,
  },
]);

export const wrongHintBox = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
    padding: '16',
    borderRadius: 'lg',
  }),
  {
    backgroundColor: vars.color.orange[50],
    border: `1.5px solid ${vars.color.orange[200]}`,
  },
]);

export const keywordList = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
    borderRadius: 'md',
  }),
  {
    marginTop: '8px',
    padding: '10px',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
]);

export const keywordItem = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
  }),
]);

export const conceptBox = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
    padding: '16',
    borderRadius: 'lg',
  }),
  {
    backgroundColor: vars.color.green[50],
    border: `1.5px solid ${vars.color.green[200]}`,
  },
]);

export const footer = style({
  padding: '12px 20px',
  marginTop: 'auto',
});

export const resultWrapper = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16',
  }),
  {
    flex: 1,
    padding: '40px 20px',
  },
]);

const fadeIn = keyframes({
  from: { opacity: '0', transform: 'translateY(12px)' },
  to: { opacity: '1', transform: 'translateY(0)' },
});

export const resultCard = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12',
    padding: '32',
    borderRadius: 'xl',
  }),
  {
    backgroundColor: vars.color.white,
    boxShadow: vars.shadow.md,
    animation: `${fadeIn} 0.5s ease`,
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        animation: 'none',
      },
    },
  },
]);

const scaleIn = keyframes({
  from: { opacity: '0', transform: 'scale(0.5)' },
  to: { opacity: '1', transform: 'scale(1)' },
});

export const celebrationWrapper = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24',
  }),
  {
    flex: 1,
    padding: '40px 20px',
    animation: `${fadeIn} 0.6s ease`,
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        animation: 'none',
      },
    },
  },
]);

export const celebrationIconArea = style({
  position: 'relative',
  width: '120px',
  height: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const celebrationCircle = style({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: vars.color.green[500],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${scaleIn} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`,
  boxShadow: `0 0 0 12px ${vars.color.green[50]}, 0 0 0 24px rgba(11, 181, 111, 0.08)`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});

const floatAnimation = keyframes({
  '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
  '25%': { transform: 'translate(8px, -12px) scale(1.2)' },
  '50%': { transform: 'translate(-4px, 6px) scale(0.8)' },
  '75%': { transform: 'translate(12px, 8px) scale(1.1)' },
});

export const floatingDot = style({
  position: 'absolute',
  borderRadius: '50%',
  animation: `${floatAnimation} 3s ease-in-out infinite`,
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none',
    },
  },
});

export const floatingDot1 = style({
  width: '10px',
  height: '10px',
  backgroundColor: vars.color.green[400],
  top: '8px',
  left: '12px',
  animationDelay: '0s',
});

export const floatingDot2 = style({
  width: '8px',
  height: '8px',
  backgroundColor: vars.color.orange[400],
  top: '4px',
  right: '16px',
  animationDelay: '0.5s',
});

export const floatingDot3 = style({
  width: '6px',
  height: '6px',
  backgroundColor: vars.color.green[300],
  bottom: '12px',
  left: '8px',
  animationDelay: '1s',
});

export const floatingDot4 = style({
  width: '12px',
  height: '12px',
  backgroundColor: vars.color.yellow[400],
  bottom: '4px',
  right: '8px',
  animationDelay: '1.5s',
});

export const floatingDot5 = style({
  width: '7px',
  height: '7px',
  backgroundColor: vars.color.green[500],
  top: '50%',
  left: '0px',
  animationDelay: '0.8s',
});

export const summaryWrapper = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '20',
  }),
  {
    flex: 1,
    padding: '20px 0',
    animation: `${fadeIn} 0.5s ease`,
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        animation: 'none',
      },
    },
  },
]);

export const summaryCard = style([
  sprinkles({
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
    padding: '16',
    borderRadius: 'lg',
  }),
  {
    backgroundColor: vars.color.grey[50],
    border: `1.5px solid ${vars.color.grey[200]}`,
  },
]);

export const summaryMissionIndex = style([
  sprinkles({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'full',
  }),
  {
    width: '24px',
    height: '24px',
    backgroundColor: vars.color.green[500],
    color: vars.color.white,
    fontSize: vars.typography.t12.fontSize,
    fontWeight: vars.fontWeight.bold,
    flexShrink: 0,
  },
]);
