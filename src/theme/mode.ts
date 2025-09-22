import { useColorScheme } from '@mui/material/styles';

export function useThemeMode() {
  const { mode, setMode, systemMode } = useColorScheme();

  const isDark = (mode === 'system' ? systemMode : mode) === 'dark';

  return {
    mode,
    systemMode,
    isDark,
    setLight: () => setMode('light'),
    setDark: () => setMode('dark'),
    setSystem: () => setMode('system'),
    toggle: () => setMode(isDark ? 'light' : 'dark'),
  } as const;
}

