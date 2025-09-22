import { MenuItem, Select } from '@mui/material';
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
    >
      <MenuItem value='en'>EN</MenuItem>
      <MenuItem value='th'>TH</MenuItem>
    </Select>
  );
}
