import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, FormEvent, useEffect } from 'react';
import { signInSchema, type SignInValues } from '../schema';
import { useAuth } from '@/services/auth';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import type { SxProps, Theme } from '@mui/material/styles';

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
        bgcolor: 'rgba(255,255,255,0.04)',
        '& fieldset': { borderColor: 'rgba(148,163,184,0.2)' },
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

export default function SignInForm() {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState<SignInValues>(() => ({
    email: localStorage.getItem('rememberedEmail') || '',
    password: '',
    rememberMe: !!localStorage.getItem('rememberedEmail'),
  }));
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof SignInValues | 'general', string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof SignInValues, boolean>>>({});

  // Redirect if already signed in
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) void navigate({ to: '/dashboard' });
  }, [navigate]);

  const validate = (field?: keyof SignInValues) => {
    const parsed = signInSchema.safeParse(values);
    if (parsed.success) {
      setErrors((prev) => ({ ...prev, email: undefined, password: undefined }));
      return true;
    }
    const fieldErrors: Partial<Record<keyof SignInValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof SignInValues;
      fieldErrors[key] ||= issue.message;
    }
    if (field) setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    else setErrors(fieldErrors);
    return false;
  };

  const handleChange = (key: keyof SignInValues, value: string | boolean) => {
    setValues((v) => ({ ...v, [key]: value } as SignInValues));
    if (touched[key]) validate(key);

    if (key === 'rememberMe') {
      const checked = Boolean(value);
      if (!checked) localStorage.removeItem('rememberedEmail');
      else if (values.email) localStorage.setItem('rememberedEmail', values.email);
    }
    if (key === 'email' && values.rememberMe) {
      const next = String(value);
      if (next) localStorage.setItem('rememberedEmail', next);
      else localStorage.removeItem('rememberedEmail');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true, rememberMe: true });
    if (!validate()) return;

    setLoading(true);
    auth
      .signIn({ email: values.email, password: values.password })
      .then(() => navigate({ to: '/dashboard' }))
      .catch(() =>
        setErrors({ general: 'Invalid email or password. Please try again.' })
      )
      .finally(() => setLoading(false));
  };

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        {errors.general && (
          <Alert severity='error' sx={{ width: '100%' }}>
            {errors.general}
          </Alert>
        )}

        <TextField
          label={t('email')}
          type='email'
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => {
            setTouched((v) => ({ ...v, email: true }));
            validate('email');
          }}
          error={!!(touched.email && errors.email)}
          helperText={touched.email && errors.email}
          fullWidth
          required
          autoComplete='email'
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Email color={touched.email && errors.email ? 'error' : 'action'} />
              </InputAdornment>
            ),
          }}
          placeholder='Enter your email'
          sx={textFieldStyle}
        />

        <TextField
          label={t('password')}
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => {
            setTouched((v) => ({ ...v, password: true }));
            validate('password');
          }}
          error={!!(touched.password && errors.password)}
          helperText={touched.password && errors.password}
          fullWidth
          required
          autoComplete='current-password'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Lock color={touched.password && errors.password ? 'error' : 'action'} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility' onClick={() => setShowPassword((s) => !s)} edge='end' size='small'>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          placeholder='Enter your password'
          sx={textFieldStyle}
        />

        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.rememberMe}
                onChange={(e) => handleChange('rememberMe', e.target.checked)}
                color='primary'
              />
            }
            label='Remember me'
            sx={{
              '& .MuiFormControlLabel-label': {
                color: 'primary.main',
                fontSize: '0.875rem',
              },
            }}
          />
          <Link href='#' variant='body2' sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 500, '&:hover': { textDecoration: 'underline', color: 'primary.dark' } }} onClick={(e) => e.preventDefault()}>
            Forgot password?
          </Link>
        </Stack>

        <Button type='submit' variant='contained' disabled={loading} fullWidth size='large' sx={{ py: 1.5, fontWeight: 600, backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.dark' } }}>
          {loading ? <CircularProgress size={24} color='inherit' /> : t('submit')}
        </Button>

        <Box textAlign='center'>
          <Typography variant='body2' sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
            Don't have an account?{' '}
            <Link href='#' sx={{ textDecoration: 'none', fontWeight: 600, color: 'secondary.main', '&:hover': { textDecoration: 'underline', color: 'secondary.dark' } }} onClick={(e) => e.preventDefault()}>
              Sign up
            </Link>
          </Typography>
        </Box>

        {import.meta.env.DEV && (
          <Alert severity='info' sx={{ mt: 2, '& .MuiAlert-message': { color: 'text.primary' } }}>
            <Typography variant='caption'>
              <strong>Dev Mode:</strong> Use any email/password to sign in (e.g., admin@example.com / password123)
            </Typography>
          </Alert>
        )}
      </Stack>
    </Box>
  );
}
