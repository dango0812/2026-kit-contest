import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

import { vars } from './vars.css';

const layoutProperties = defineProperties({
  properties: {
    position: ['absolute', 'fixed', 'relative', 'static', 'sticky'],
    display: ['none', 'flex', 'grid', 'block', 'inline', 'inline-flex', 'inline-block'],
    flexDirection: ['row', 'column', 'row-reverse', 'column-reverse'],
    justifyContent: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
    flexWrap: ['nowrap', 'wrap'],
    flexGrow: [0, 1],
    flexShrink: [0, 1],
    textAlign: ['left', 'center', 'right'],
    overflow: ['hidden', 'auto', 'visible', 'scroll'],
    borderRadius: vars.borderRadius,
  },
});

const spacingProperties = defineProperties({
  properties: {
    gap: vars.space,
    padding: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    margin: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
  },
  shorthands: {
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
  },
});

const colorProperties = defineProperties({
  properties: {
    color: {
      primary: vars.color.primary,
      secondary: vars.color.grey[600],
      tertiary: vars.color.grey[400],
      inverse: vars.color.white,
      error: vars.color.red[500],
      success: vars.color.green[500],
      warning: vars.color.orange[500],
    },
    backgroundColor: {
      primary: vars.color.primary,
      secondary: vars.color.secondary,
      surface: vars.color.white,
      inverse: vars.color.black,
      error: vars.color.red[50],
      success: vars.color.green[50],
      warning: vars.color.orange[50],
      disabled: vars.color.grey[200],
      transparent: 'transparent',
    },
    borderColor: {
      default: vars.color.grey[200],
      strong: vars.color.grey[300],
      selected: vars.color.primary,
      error: vars.color.red[500],
      transparent: 'transparent',
    },
    shadowColor: {
      none: 'transparent',
      light: vars.shadow.sm,
      medium: vars.shadow.md,
      strong: vars.shadow.lg,
    },
  },
});

export const sprinkles = createSprinkles(layoutProperties, spacingProperties, colorProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
