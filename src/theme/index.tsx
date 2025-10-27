import { createTheme } from '@mui/material/styles';

// MUI v7: Enable CSS variables + colorSchemes for modern dark/light theming
export const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        // Modern primary colors with better contrast
        primary: {
          main: '#2563EB', // blue-600 - more vibrant than default
          light: '#3B82F6', // blue-500
          dark: '#1D4ED8', // blue-700
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#7C3AED', // violet-600 - more modern than magenta
          light: '#8B5CF6', // violet-500
          dark: '#6D28D9', // violet-700
          contrastText: '#FFFFFF',
        },
        error: {
          main: '#DC2626', // red-600
          light: '#EF4444', // red-500
          dark: '#B91C1C', // red-700
        },
        warning: {
          main: '#D97706', // amber-600
          light: '#F59E0B', // amber-500
          dark: '#B45309', // amber-700
        },
        info: {
          main: '#0891B2', // cyan-600
          light: '#06B6D4', // cyan-500
          dark: '#0E7490', // cyan-700
        },
        success: {
          main: '#059669', // emerald-600
          light: '#10B981', // emerald-500
          dark: '#047857', // emerald-700
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
        // Optimized dark mode colors
        primary: {
          main: '#3B82F6', // blue-500 - perfect for dark backgrounds
          light: '#60A5FA', // blue-400
          dark: '#2563EB', // blue-600
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#A78BFA', // violet-400
          light: '#C4B5FD', // violet-300
          dark: '#8B5CF6', // violet-500
          contrastText: '#FFFFFF',
        },
        error: {
          main: '#F87171', // red-400
          light: '#FCA5A5', // red-300
          dark: '#EF4444', // red-500
        },
        warning: {
          main: '#FBBF24', // amber-400
          light: '#FCD34D', // amber-300
          dark: '#F59E0B', // amber-500
        },
        info: {
          main: '#22D3EE', // cyan-400
          light: '#67E8F9', // cyan-300
          dark: '#06B6D4', // cyan-500
        },
        success: {
          main: '#34D399', // emerald-400
          light: '#6EE7B7', // emerald-300
          dark: '#10B981', // emerald-500
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
        // Dark grey palette
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
  typography: {
    fontFamily: [
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
