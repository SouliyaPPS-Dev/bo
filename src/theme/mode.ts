import { useColorScheme } from '@mui/material/styles';
import { useEffect } from 'react';

export function useThemeMode() {
  const colorScheme = useColorScheme();

  const { mode, setMode, systemMode } = colorScheme || {};

  // Ensure we have a fallback for systemMode
  const resolvedSystemMode = systemMode || 'light';
  const currentMode = mode === 'system' ? resolvedSystemMode : (mode || 'light');
  const isDark = currentMode === 'dark';

  // Debug logging on mount and when mode changes
  // This must be called unconditionally before any early returns
  useEffect(() => {
    if (colorScheme) {
      console.log('[Theme] Current state:', {
        mode,
        systemMode: resolvedSystemMode,
        currentMode,
        isDark,
      });
    }
  }, [colorScheme, mode, resolvedSystemMode, currentMode, isDark]);

  // Check if useColorScheme is properly initialized
  if (!colorScheme) {
    console.error('useColorScheme returned undefined. Make sure ThemeProvider with cssVariables is configured.');
    return {
      mode: 'light' as const,
      systemMode: 'light' as const,
      currentMode: 'light' as const,
      isDark: false,
      setLight: () => console.warn('Theme not initialized'),
      setDark: () => console.warn('Theme not initialized'),
      setSystem: () => console.warn('Theme not initialized'),
      toggle: () => console.warn('Theme not initialized'),
    };
  }

  const toggle = () => {
    // Always toggle between light and dark, never system
    const newMode = isDark ? 'light' : 'dark';
    console.log(`[Theme] Toggling from ${currentMode} to ${newMode}`);
    setMode(newMode);
  };

  return {
    mode,
    systemMode: resolvedSystemMode,
    currentMode,
    isDark,
    setLight: () => {
      console.log('[Theme] Setting to light mode');
      setMode('light');
    },
    setDark: () => {
      console.log('[Theme] Setting to dark mode');
      setMode('dark');
    },
    setSystem: () => {
      console.log('[Theme] Setting to system mode');
      setMode('system');
    },
    toggle,
  } as const;
}

