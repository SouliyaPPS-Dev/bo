import { MenuItem, Select, Stack, Typography } from '@mui/material';
import { Language } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || 'en';

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value).catch(console.error);
  };

  return (
    <Select
      size='small'
      value={lang}
      onChange={(e) => handleLanguageChange(e.target.value)}
      startAdornment={
        <Language sx={{ mr: 1, fontSize: 18, color: 'text.secondary' }} />
      }
      sx={{
        minWidth: 100,
        '& .MuiSelect-select': {
          display: 'flex',
          alignItems: 'center',
          py: 0.75,
        },
      }}
    >
      <MenuItem value='en'>
        <Stack direction='row' spacing={1} alignItems='center'>
          <Typography variant='body2'>🇬🇧</Typography>
          <Typography variant='body2'>English</Typography>
        </Stack>
      </MenuItem>
      <MenuItem value='lo'>
        <Stack direction='row' spacing={1} alignItems='center'>
          <Typography variant='body2'>🇱🇦</Typography>
          <Typography variant='body2'>ລາວ</Typography>
        </Stack>
      </MenuItem>
    </Select>
  );
}
