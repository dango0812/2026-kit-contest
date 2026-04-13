import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    primary: '#0BB56F',
    secondary: '#F3F5F7',
    background: '#FFFFFF',
    greyBackground: '#F3F5F7',
    layeredBackground: '#FFFFFF',
    floatedBackground: '#FFFFFF',
    white: '#FFFFFF',
    black: '#1A2030',

    grey: {
      50: '#FAFBFC',
      100: '#F3F5F7',
      200: '#E6E9ED',
      300: '#D2D7DD',
      400: '#B2BAC3',
      500: '#8D97A3',
      600: '#6D7886',
      700: '#505B6A',
      800: '#353F4D',
      900: '#1A2030',
    },
    greyOpacity: {
      50: 'rgba(0, 20, 48, 0.02)',
      100: 'rgba(2, 30, 68, 0.05)',
      200: 'rgba(0, 25, 52, 0.1)',
      300: 'rgba(0, 27, 55, 0.18)',
      400: 'rgba(0, 23, 50, 0.31)',
      500: 'rgba(3, 22, 48, 0.46)',
      600: 'rgba(0, 17, 40, 0.58)',
      700: 'rgba(3, 16, 38, 0.7)',
      800: 'rgba(0, 10, 28, 0.8)',
      900: 'rgba(2, 8, 18, 0.91)',
    },
    blue: {
      50: '#EAF4FF',
      100: '#CCE4FF',
      200: '#94C6FF',
      300: '#68ACFF',
      400: '#4A98FD',
      500: '#3688F2',
      600: '#2678E8',
      700: '#1E68D8',
      800: '#1C5BC0',
      900: '#1C4EA5',
    },
    red: {
      50: '#FFF0EF',
      100: '#FFD6D8',
      200: '#FFB2B7',
      300: '#FC8B93',
      400: '#F76873',
      500: '#F14755',
      600: '#E52C3C',
      700: '#D32333',
      800: '#BD1E2C',
      900: '#A61B28',
    },
    orange: {
      50: '#FFF4E2',
      100: '#FFE2B3',
      200: '#FFCF84',
      300: '#FFBF55',
      400: '#FFAB2B',
      500: '#FF9B04',
      600: '#FC8B03',
      700: '#F67B03',
      800: '#EE6A03',
      900: '#E55903',
    },
    yellow: {
      50: '#FFFAE9',
      100: '#FFF1C2',
      200: '#FFE89E',
      300: '#FFDF7B',
      400: '#FFD35C',
      500: '#FFC546',
      600: '#FFB635',
      700: '#FBA434',
      800: '#EF9214',
      900: '#DE8006',
    },
    green: {
      50: '#EDFCF4',
      100: '#B2F1D8',
      200: '#7AE6BB',
      300: '#47D89E',
      400: '#1DC883',
      500: '#0BB56F',
      600: '#05A462',
      700: '#039558',
      800: '#02874E',
      900: '#027845',
    },
    teal: {
      50: '#EEFAF9',
      100: '#BFEBEB',
      200: '#8DDBDB',
      300: '#5DCACA',
      400: '#35B9B9',
      500: '#1CA8A8',
      600: '#149898',
      700: '#108888',
      800: '#0C7878',
      900: '#0A6868',
    },
    purple: {
      50: '#FAF2FD',
      100: '#EFCFF9',
      200: '#DC9FF1',
      300: '#C974E6',
      400: '#B650D9',
      500: '#A438CA',
      600: '#932CB7',
      700: '#8426A5',
      800: '#752691',
      900: '#67277E',
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
