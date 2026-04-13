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
  paddingBottom: '4px',
});

export const roomListWrapper = style({
  maxHeight: '200px',
  overflowY: 'auto',
  scrollbarWidth: 'thin',
});

export const emptyRoom = style({
  padding: '32px 0',
  border: `1px dashed ${vars.color.grey[300]}`,
  borderRadius: '12px',
  minHeight: '80px',
});

export const roomList = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

export const roomCard = style({
  display: 'block',
  width: '100%',
  textAlign: 'left',
  padding: '14px 16px',
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.grey[200]}`,
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease, border-color 0.15s ease',
  ':hover': {
    backgroundColor: vars.color.grey[50],
    borderColor: vars.color.green[300],
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.green[500]}`,
    outlineOffset: '2px',
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});
