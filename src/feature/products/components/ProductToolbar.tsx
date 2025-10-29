import { Search } from '@mui/icons-material';
import { InputAdornment, Stack, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

type ProductToolbarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export default function ProductToolbar({
  searchTerm,
  onSearchChange,
}: ProductToolbarProps) {
  const { t } = useTranslation();

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
      <TextField
        placeholder={t('searchProducts')}
        size='small'
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ flexGrow: 1, maxWidth: { sm: 400 } }}
      />
    </Stack>
  );
}
