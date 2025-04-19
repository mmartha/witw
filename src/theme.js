import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  
  // Custom font sizes
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },

  // Custom spacing
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },

  // Custom radius for components
  radius: {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '1rem',
  },

  // Custom breakpoints
  breakpoints: {
    xs: '36em',     // 576px
    sm: '48em',     // 768px
    md: '62em',     // 992px
    lg: '75em',     // 1200px
    xl: '88em',     // 1408px
  },

  // Custom shadows
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },

  // Default component styles
  components: {
    Card: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm',
      },
    },
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Container: {
      defaultProps: {
        size: 'lg',
      },
    },
  },

  // Other theme configurations
  other: {
    headerHeight: '60px',
    footerHeight: '250px',
  },
}); 