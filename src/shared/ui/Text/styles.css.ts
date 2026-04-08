import { vars } from '@shared/styles';
import { recipe } from '@vanilla-extract/recipes';

export const textRecipe = recipe({
  base: {
    fontSize: vars.typography.t16.fontSize,
    lineHeight: vars.lineHeight.medium,
  },
  variants: {
    fontSize: {
      h1: {
        fontSize: vars.typography.t56.fontSize,
        fontWeight: vars.fontWeight.bold,
        lineHeight: vars.lineHeight.small,
      },
      h2: {
        fontSize: vars.typography.t48.fontSize,
        fontWeight: vars.fontWeight.bold,
        lineHeight: vars.lineHeight.small,
      },
      h3: {
        fontSize: vars.typography.t40.fontSize,
        fontWeight: vars.fontWeight.semibold,
        lineHeight: vars.lineHeight.medium,
      },
      h4: {
        fontSize: vars.typography.t36.fontSize,
        fontWeight: vars.fontWeight.semibold,
        lineHeight: vars.lineHeight.medium,
      },
      h5: {
        fontSize: vars.typography.t32.fontSize,
        fontWeight: vars.fontWeight.semibold,
        lineHeight: vars.lineHeight.medium,
      },
      h6: {
        fontSize: vars.typography.t28.fontSize,
        fontWeight: vars.fontWeight.semibold,
        lineHeight: vars.lineHeight.medium,
      },
      title1: {
        fontSize: vars.typography.t24.fontSize,
        fontWeight: vars.fontWeight.semibold,
        lineHeight: vars.lineHeight.medium,
      },
      title2: {
        fontSize: vars.typography.t22.fontSize,
        fontWeight: vars.fontWeight.semibold,
        lineHeight: vars.lineHeight.medium,
      },
      subtitle1: {
        fontSize: vars.typography.t20.fontSize,
        fontWeight: vars.fontWeight.semibold,
        lineHeight: vars.lineHeight.medium,
      },
      subtitle2: {
        fontSize: vars.typography.t18.fontSize,
        fontWeight: vars.fontWeight.semibold,
        lineHeight: vars.lineHeight.medium,
      },
      body1: {
        fontSize: vars.typography.t16.fontSize,
        fontWeight: vars.fontWeight.regular,
        lineHeight: vars.lineHeight.medium,
      },
      body2: {
        fontSize: vars.typography.t14.fontSize,
        fontWeight: vars.fontWeight.regular,
        lineHeight: vars.lineHeight.medium,
      },
      caption: {
        fontSize: vars.typography.t12.fontSize,
        fontWeight: vars.fontWeight.regular,
        lineHeight: vars.lineHeight.medium,
      },
    },
    fontWeight: {
      light: { fontWeight: vars.fontWeight.light },
      regular: { fontWeight: vars.fontWeight.regular },
      medium: { fontWeight: vars.fontWeight.medium },
      semibold: { fontWeight: vars.fontWeight.semibold },
      bold: { fontWeight: vars.fontWeight.bold },
    },
    lineHeight: {
      small: { lineHeight: vars.lineHeight.small },
      medium: { lineHeight: vars.lineHeight.medium },
      large: { lineHeight: vars.lineHeight.large },
    },
  },
  defaultVariants: {
    fontSize: 'body1',
  },
});
