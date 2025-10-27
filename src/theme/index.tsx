import { extendTheme } from '@mui/material/styles';

// Export the useThemeMode hook for easy access
export { useThemeMode } from './mode';

// MUI v7: Enable CSS variables + colorSchemes for modern dark/light theming
export const theme = extendTheme({
  colorSchemeSelector: 'class',
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        // Light mode - vibrant and bright colors
        primary: {
          main: '#2563EB', // Deeper blue for light mode
          light: '#3B82F6',
          dark: '#1D4ED8',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#7C3AED', // Deeper violet for light mode
          light: '#8B5CF6',
          dark: '#6D28D9',
          contrastText: '#FFFFFF',
        },
        error: {
          main: '#DC2626', // Deeper red for light mode
          light: '#EF4444',
          dark: '#B91C1C',
        },
        warning: {
          main: '#D97706', // Deeper amber for light mode
          light: '#F59E0B',
          dark: '#B45309',
        },
        info: {
          main: '#0891B2', // Deeper cyan for light mode
          light: '#06B6D4',
          dark: '#0E7490',
        },
        success: {
          main: '#059669', // Deeper emerald for light mode
          light: '#10B981',
          dark: '#047857',
        },
        // Modern neutral backgrounds
        background: {
          default: '#F8FAFC', // slate-50 - softer than pure white
          paper: '#FFFFFF', // Pure white for cards/papers
        },
        // High contrast text for accessibility
        text: {
          primary: '#0F172A', // slate-900 - maximum contrast
          secondary: '#334155', // slate-700 - better readability
          disabled: '#94A3B8', // slate-400
        },
        // Subtle dividers and borders
        divider: '#E2E8F0', // slate-200 - subtle but visible
        action: {
          hover: '#F1F5F9', // slate-100 - subtle hover
          selected: '#DBEAFE', // blue-100 - clear selection state
          disabled: '#F8FAFC', // slate-50
          disabledBackground: '#F1F5F9', // slate-100
          focus: '#DBEAFE', // blue-100 - clear focus state
        },
        // Modern grey palette
        grey: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        // Dark mode - lighter and more vibrant colors for better visibility
        primary: {
          main: '#60A5FA', // Lighter blue for dark mode
          light: '#93C5FD',
          dark: '#3B82F6',
          contrastText: '#0F172A',
        },
        secondary: {
          main: '#A78BFA', // Lighter violet for dark mode
          light: '#C4B5FD',
          dark: '#8B5CF6',
          contrastText: '#0F172A',
        },
        error: {
          main: '#F87171', // Lighter red for dark mode
          light: '#FCA5A5',
          dark: '#EF4444',
        },
        warning: {
          main: '#FBBF24', // Lighter amber for dark mode
          light: '#FCD34D',
          dark: '#F59E0B',
        },
        info: {
          main: '#22D3EE', // Lighter cyan for dark mode
          light: '#67E8F9',
          dark: '#06B6D4',
        },
        success: {
          main: '#34D399', // Lighter emerald for dark mode
          light: '#6EE7B7',
          dark: '#10B981',
        },
        // Dark backgrounds with proper contrast
        background: {
          default: '#0F172A', // slate-900 - deep dark
          paper: '#1E293B', // slate-800 - elevated surfaces
        },
        // Optimized text colors for dark mode
        text: {
          primary: '#F1F5F9', // slate-100 - high contrast
          secondary: '#CBD5E1', // slate-300 - good readability
          disabled: '#64748B', // slate-500
        },
        // Dark mode dividers
        divider: '#334155', // slate-700 - subtle but visible
        action: {
          hover: '#334155', // slate-700 - subtle hover
          selected: '#1E40AF', // blue-800 - clear selection
          disabled: '#475569', // slate-600
          disabledBackground: '#334155', // slate-700
          focus: '#1E40AF', // blue-800 - clear focus
        },
        // Dark grey palette (inverted for dark mode)
        grey: {
          50: '#0F172A',
          100: '#1E293B',
          200: '#334155',
          300: '#475569',
          400: '#64748B',
          500: '#94A3B8',
          600: '#CBD5E1',
          700: '#E2E8F0',
          800: '#F1F5F9',
          900: '#F8FAFC',
        },
      },
    },
  },
  // Modern shape and spacing
  shape: {
    borderRadius: 12, // Slightly more rounded for modern look
  },
  // Enhanced typography with better font stack
  // Noto Sans Lao is prioritized for Lao script support, Inter for English
  typography: {
    fontFamily: [
      '"Noto Sans Lao"',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    // Improved font weights and sizes
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none' as const, // More modern - no uppercase
    },
  },
  // Enhanced component defaults with smooth theme transitions
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // Smooth transition for background color changes
          transition:
            'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          transition:
            'background-color 0.3s ease-in-out, border-color 0.3s ease-in-out',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition:
            'background-color 0.3s ease-in-out, border-color 0.3s ease-in-out',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          transition:
            'background-color 0.3s ease-in-out, border-color 0.3s ease-in-out',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          transition:
            'background-color 0.3s ease-in-out, border-color 0.3s ease-in-out',
        },
      },
    },
  },
});
