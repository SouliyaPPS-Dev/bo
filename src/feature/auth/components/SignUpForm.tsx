import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  PersonOutline,
  Email,
  Lock,
} from '@mui/icons-material';
import type { SxProps, Theme } from '@mui/material/styles';
import { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { signUpSchema, type SignUpValues } from '../schema';
import { useAuth } from '@/services/auth';

const textFieldStyle: SxProps<Theme> = [
  {
    '& .MuiInputLabel-root': {
      color: 'text.secondary',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'primary.main',
    },
    '& .MuiOutlinedInput-root': {
      bgcolor: 'grey.50',
      borderRadius: 2,
      '& fieldset': { borderColor: 'divider' },
      '&:hover fieldset': { borderColor: 'primary.main' },
      '&.Mui-focused fieldset': {
        borderColor: 'primary.main',
        boxShadow:
          '0 0 0 3px rgba(var(--mui-palette-primary-mainChannel) / 0.15)',
      },
    },
    '& .MuiOutlinedInput-input': {
      color: 'text.primary',
      WebkitTextFillColor: 'var(--mui-palette-text-primary)',
      opacity: 1,
      fontWeight: 600,
    },
    '& .MuiOutlinedInput-input::placeholder': {
      color: 'text.secondary',
      opacity: 0.9,
    },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: 'text.secondary',
    },
    '& input:-webkit-autofill': {
      WebkitTextFillColor: 'var(--mui-palette-text-primary)',
      boxShadow: '0 0 0px 1000px var(--mui-palette-grey-50) inset',
    },
  },
  (theme: Theme) =>
    theme.applyStyles('dark', {
      '& .MuiOutlinedInput-root': {
        bgcolor: 'action.hover',
        '& fieldset': { borderColor: 'divider' },
        '&:hover fieldset': { borderColor: 'primary.main' },
        '&.Mui-focused fieldset': {
          borderColor: 'primary.main',
          boxShadow:
            '0 0 0 3px rgba(var(--mui-palette-primary-mainChannel) / 0.35)',
        },
      },
      '& .MuiOutlinedInput-input': {
        color: 'text.primary',
        WebkitTextFillColor: 'var(--mui-palette-text-primary)',
      },
    }),
];

type SignUpFormProps = {
  onRegistered?: () => void;
};

type FieldKey = keyof SignUpValues;

export default function SignUpForm({ onRegistered }: SignUpFormProps) {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState<SignUpValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<FieldKey | 'general', string>>
  >({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>(
    {}
  );

  const fieldKeys: FieldKey[] = [
    'name',
    'email',
    'password',
    'confirmPassword',
  ];

  const validate = (field?: FieldKey) => {
    const parsed = signUpSchema.safeParse(values);
    if (parsed.success) {
      if (field) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
          general: undefined,
        }));
      } else {
        setErrors({});
      }
      return true;
    }
    const fieldErrors: Partial<Record<FieldKey, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as FieldKey;
      fieldErrors[key] ||= issue.message;
    }
    if (field) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    } else {
      setErrors(fieldErrors);
    }
    return false;
  };

  const handleChange = (key: FieldKey, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (touched[key]) validate(key);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(
      fieldKeys.reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Record<FieldKey, boolean>
      )
    );

    if (!validate()) return;
    setErrors((prev) => ({ ...prev, general: undefined }));
    setLoading(true);
    try {
      await auth.register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      onRegistered?.();
      await navigate({
        to: '/signin',
        search: { registered: '1' },
        replace: true,
      });
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : t('invalidCredentials');
      setErrors((prev) => ({ ...prev, general: message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component='form' onSubmit={(e) => void handleSubmit(e)} noValidate>
      <Stack spacing={3}>
        {errors.general && (
          <Alert severity='error' sx={{ width: '100%' }}>
            {errors.general}
          </Alert>
        )}

        <TextField
          label={t('name')}
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => {
            setTouched((prev) => ({ ...prev, name: true }));
            validate('name');
          }}
          error={!!(touched.name && errors.name)}
          helperText={touched.name && errors.name}
          fullWidth
          required
          autoComplete='name'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <PersonOutline
                  color={touched.name && errors.name ? 'error' : 'action'}
                />
              </InputAdornment>
            ),
          }}
          placeholder={t('name')}
          sx={textFieldStyle}
        />

        <TextField
          label={t('email')}
          type='email'
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => {
            setTouched((prev) => ({ ...prev, email: true }));
            validate('email');
          }}
          error={!!(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          fullWidth
          required
          autoComplete='email'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Email
                  color={touched.email && errors.email ? 'error' : 'action'}
                />
              </InputAdornment>
            ),
          }}
          placeholder='admin@example.com'
          sx={textFieldStyle}
        />

        <TextField
          label={t('password')}
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => {
            setTouched((prev) => ({ ...prev, password: true }));
            validate('password');
          }}
          error={!!(touched.password && errors.password)}
          helperText={touched.password && errors.password}
          fullWidth
          required
          autoComplete='new-password'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Lock
                  color={
                    touched.password && errors.password ? 'error' : 'action'
                  }
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge='end'
                  size='small'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          placeholder='Secret123!'
          sx={textFieldStyle}
        />

        <TextField
          label={t('confirmPassword')}
          type={showConfirmPassword ? 'text' : 'password'}
          value={values.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          onBlur={() => {
            setTouched((prev) => ({ ...prev, confirmPassword: true }));
            validate('confirmPassword');
          }}
          error={!!(touched.confirmPassword && errors.confirmPassword)}
          helperText={touched.confirmPassword && errors.confirmPassword}
          fullWidth
          required
          autoComplete='new-password'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Lock
                  color={
                    touched.confirmPassword && errors.confirmPassword
                      ? 'error'
                      : 'action'
                  }
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle confirm password visibility'
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  edge='end'
                  size='small'
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          placeholder='Secret123!'
          sx={textFieldStyle}
        />

        <Button
          type='submit'
          variant='contained'
          disabled={loading}
          fullWidth
          size='large'
          sx={{
            py: 1.5,
            fontWeight: 600,
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}
        >
          {loading ? (
            <CircularProgress size={24} color='inherit' />
          ) : (
            t('signUp')
          )}
        </Button>

        <Box textAlign='center'>
          <Typography
            variant='body2'
            sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
          >
            {t('haveAccount')}{' '}
            <Link
              href='/signin'
              sx={{
                textDecoration: 'none',
                fontWeight: 600,
                color: 'secondary.main',
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'secondary.dark',
                },
              }}
              onClick={(event) => {
                event.preventDefault();
                void navigate({ to: '/signin' });
              }}
            >
              {t('signin')}
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
