import { extendTheme } from '@mui/material/styles';

// MUI v6: Enable CSS variables + colorSchemes for modern dark/light theming
export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: { main: '#1976d2' },
        secondary: { main: '#9c27b0' },
        error: { main: '#DC2626' }, // red-600
        warning: { main: '#D97706' }, // amber-600
        info: { main: '#0891B2' }, // cyan-600
        success: { main: '#16A34A' }, // green-600
        background: {
          default: '#fafafa',
          paper: '#FFFFFF',
        },
        text: {
          primary: '#0F172A', // slate-900 for maximum contrast
          secondary: '#475569', // slate-600 for better visibility
          disabled: '#94A3B8', // slate-400
        },
        divider: '#CBD5E1', // slate-300 for better visibility
        action: {
          hover: '#E2E8F0', // slate-200 for more visible hover
          selected: '#BFDBFE', // blue-100 for better selected state visibility
          disabled: '#F1F5F9', // slate-50
          disabledBackground: '#E2E8F0', // slate-200
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: { main: '#3B82F6' }, // blue-500 for dark backgrounds
        secondary: { main: '#A78BFA' }, // violet-400
        error: { main: '#EF4444' }, // red-500
        warning: { main: '#F59E0B' }, // amber-500
        info: { main: '#06B6D4' }, // cyan-500
        success: { main: '#10B981' }, // emerald-500
        background: {
          default: '#0F172A', // slate-900
          paper: '#1E293B', // slate-800
        },
        text: {
          primary: '#F1F5F9', // slate-100
          secondary: '#94A3B8', // slate-400
          disabled: '#64748B', // slate-500
        },
        divider: '#334155', // slate-700
        action: {
          hover: '#1E293B', // slate-800
          selected: '#1E40AF', // blue-800
          disabled: '#475569', // slate-600
          disabledBackground: '#334155', // slate-700
        },
      },
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: ['Inter', 'system-ui', 'Arial', 'sans-serif'].join(','),
  },
});
