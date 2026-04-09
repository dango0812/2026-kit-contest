import { keyframes } from '@vanilla-extract/css';

export const animationSlideInTop = keyframes({
  from: { transform: 'translateY(-100%)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
});

export const animationSlideInTopCenter = keyframes({
  from: { transform: 'translateX(-50%) translateY(-100%)', opacity: 0 },
  to: { transform: 'translateX(-50%) translateY(0)', opacity: 1 },
});

export const animationSlideInBottom = keyframes({
  from: { transform: 'translateY(100%)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 },
});

export const animationSlideInBottomCenter = keyframes({
  from: { transform: 'translateX(-50%) translateY(100%)', opacity: 0 },
  to: { transform: 'translateX(-50%) translateY(0)', opacity: 1 },
});
