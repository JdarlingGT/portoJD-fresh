// Theme Configuration for PortoJD Fresh
// Centralizes colors, typography, and design tokens

export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#88ABF2', // Custom primary blue
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    secondary: '#595959', // Medium Gray
    background: {
      light: '#F7F7F7',
      dark: '#0D0D0D',
    },
    accent: {
      start: '#88ABF2',
      end: '#FF7F50', // Coral
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
      950: '#030712',
    },
  },
  typography: {
    fonts: {
      heading: ['Inter', 'sans-serif'], // Geometric sans
      body: ['Outfit', 'sans-serif'], // Neutral humanist
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  spacing: {
    container: {
      maxWidth: '1400px',
      padding: '2rem',
    },
    section: {
      paddingY: '4rem',
    },
  },
  animations: {
    duration: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.5s',
    },
    easing: {
      easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
};

export default theme;
