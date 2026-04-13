import { vars } from '@shared/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style([
  {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
]);

export const codeInput = style({
  fontFamily: 'monospace',
  fontSize: vars.typography.t20.fontSize,
  fontWeight: vars.fontWeight.bold,
  letterSpacing: '2px',
  textAlign: 'center',
});

export const submitButton = style({
  marginTop: 'auto',
  paddingBottom: '12px',
});
