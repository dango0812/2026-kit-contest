import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    primary: '#3182F6',
    secondary: '#F2F4F6',
    background: '#FFFFFF',
    greyBackground: '#F2F4F6',
    layeredBackground: '#FFFFFF',
    floatedBackground: '#FFFFFF',
    white: '#FFFFFF',
    black: '#191F28',

    grey: {
      50: '#F9FAFB',
      100: '#F2F4F6',
      200: '#E5E8EB',
      300: '#D1D6DB',
      400: '#B0B8C1',
      500: '#8B95A1',
      600: '#6B7684',
      700: '#4E5968',
      800: '#333D4B',
      900: '#191F28',
    },
    greyOpacity: {
      50: 'rgba(0, 23, 51, 0.02)',
      100: 'rgba(2, 32, 71, 0.05)',
      200: 'rgba(0, 27, 55, 0.1)',
      300: 'rgba(0, 29, 58, 0.18)',
      400: 'rgba(0, 25, 54, 0.31)',
      500: 'rgba(3, 24, 50, 0.46)',
      600: 'rgba(0, 19, 43, 0.58)',
      700: 'rgba(3, 18, 40, 0.7)',
      800: 'rgba(0, 12, 30, 0.8)',
      900: 'rgba(2, 9, 19, 0.91)',
    },
    blue: {
      50: '#E8F3FF',
      100: '#C9E2FF',
      200: '#90C2FF',
      300: '#64A8FF',
      400: '#4593FC',
      500: '#3182F6',
      600: '#2272EB',
      700: '#1B64DA',
      800: '#1957C2',
      900: '#194AA6',
    },
    red: {
      50: '#FFEEEE',
      100: '#FFD4D6',
      200: '#FEAFB4',
      300: '#FB8890',
      400: '#F66570',
      500: '#F04452',
      600: '#E42939',
      700: '#D22030',
      800: '#BC1B2A',
      900: '#A51926',
    },
    orange: {
      50: '#FFF3E0',
      100: '#FFE0B0',
      200: '#FFCD80',
      300: '#FFBD51',
      400: '#FFA927',
      500: '#FE9800',
      600: '#FB8800',
      700: '#F57800',
      800: '#ED6700',
      900: '#E45600',
    },
    yellow: {
      50: '#FFF9E7',
      100: '#FFEFBF',
      200: '#FFE69B',
      300: '#FFDD78',
      400: '#FFD158',
      500: '#FFC342',
      600: '#FFB331',
      700: '#FAA131',
      800: '#EE8F11',
      900: '#DD7D02',
    },
    green: {
      50: '#F0FAF6',
      100: '#AEEFD5',
      200: '#76E4B8',
      300: '#3FD599',
      400: '#15C47E',
      500: '#03B26C',
      600: '#02A262',
      700: '#029359',
      800: '#028450',
      900: '#027648',
    },
    teal: {
      50: '#EDF8F8',
      100: '#BCE9E9',
      200: '#89D8D8',
      300: '#58C7C7',
      400: '#30B6B6',
      500: '#18A5A5',
      600: '#109595',
      700: '#0C8585',
      800: '#097575',
      900: '#076565',
    },
    purple: {
      50: '#F9F0FC',
      100: '#EDCCF8',
      200: '#DA9BEF',
      300: '#C770E4',
      400: '#B44BD7',
      500: '#A234C7',
      600: '#9128B4',
      700: '#8222A2',
      800: '#73228E',
      900: '#65237B',
    },
  },
  space: {
    none: '0',
    '2': '2px',
    '4': '4px',
    '6': '6px',
    '8': '8px',
    '10': '10px',
    '12': '12px',
    '16': '16px',
    '20': '20px',
    '24': '24px',
    '32': '32px',
    '40': '40px',
    '48': '48px',
    '56': '56px',
    '64': '64px',
  },
  typography: {
    /** 3.5rem, 56px */
    t56: { fontSize: '3.5rem' },
    /** 3rem, 48px */
    t48: { fontSize: '3rem' },
    /** 2.5rem, 40px */
    t40: { fontSize: '2.5rem' },
    /** 2.25rem, 36px */
    t36: { fontSize: '2.25rem' },
    /** 2rem, 32px */
    t32: { fontSize: '2rem' },
    /** 1.75rem, 28px */
    t28: { fontSize: '1.75rem' },
    /** 1.5rem, 24px */
    t24: { fontSize: '1.5rem' },
    /** 1.375rem, 22px */
    t22: { fontSize: '1.375rem' },
    /** 1.25rem, 20px */
    t20: { fontSize: '1.25rem' },
    /** 1.125rem, 18px */
    t18: { fontSize: '1.125rem' },
    /** 1rem, 16px */
    t16: { fontSize: '1rem' },
    /** 0.875rem, 14px */
    t14: { fontSize: '0.875rem' },
    /** 0.75rem, 12px */
    t12: { fontSize: '0.75rem' },
  },
  fontWeight: {
    /** light 300 */
    light: '300',
    /** regular 400 */
    regular: '400',
    /** medium 500 */
    medium: '500',
    /** semibold 600 */
    semibold: '600',
    /** bold 700 */
    bold: '700',
  },
  lineHeight: {
    /** 제목, 타이틀용 (1.2) */
    small: '1.2',
    /** 본문 텍스트용 (1.5) */
    medium: '1.5',
    /** 넓은 간격 본문용 (1.8) */
    large: '1.8',
  },
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
    frame: '20px',
  },
  shadow: {
    none: 'none',
    sm: '0 2px 8px rgba(0, 0, 0, 0.10)',
    md: '0 4px 16px rgba(0, 0, 0, 0.16)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.20)',
  },
  zIndex: {
    hide: '-1',
    base: '0',
    dropdown: '100',
    overlay: '400',
    modal: '500',
    toast: '600',
  },
});
