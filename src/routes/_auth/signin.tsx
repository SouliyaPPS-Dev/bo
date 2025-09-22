import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router';
import {
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress,
  Link,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '@/services/auth';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/_auth/signin')({
  beforeLoad: () => {
    // Check if user is already authenticated
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // If already authenticated, redirect to dashboard
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw redirect({
        to: '/dashboard',
      });
    }
  },
  component: SignIn,
});

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

function SignIn() {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>(() => localStorage.getItem('rememberedEmail') || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState<boolean>(() => !!localStorage.getItem('rememberedEmail'));
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});
  const auth = useAuth();
  const navigate = useNavigate();

  // Also check on component mount in case auth state changes
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      void navigate({ to: '/dashboard' });
    }
  }, [navigate]);

  // Email is prefilled and checkbox checked if 'rememberedEmail' exists

  // Email validation
  const validateEmail = (value: string): string | undefined => {
    if (!value) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  // Password validation
  const validatePassword = (value: string): string | undefined => {
    if (!value) {
      return 'Password is required';
    }
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return undefined;
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle field blur
  const handleBlur = (field: 'email' | 'password') => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === 'email') {
      const error = validateEmail(email);
      setErrors((prev) => ({ ...prev, email: error }));
    } else if (field === 'password') {
      const error = validatePassword(password);
      setErrors((prev) => ({ ...prev, password: error }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ email: true, password: true });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    // Handle async signin without returning promise
    auth
      .signIn({ email, password })
      .then(() => {
        // Persist or clear remembered email based on preference
        if (rememberMe && email) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        // After successful sign in, navigate to dashboard
        return navigate({ to: '/dashboard' });
      })
      .catch((error) => {
        console.error('Sign in failed:', error);
        setErrors({
          general: 'Invalid email or password. Please try again.',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate>
      <Stack spacing={3}>
        <Box>
          <Typography
            variant='h5'
            fontWeight={700}
            gutterBottom
            sx={{ color: 'primary.main' }}
          >
            {t('signin')}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              color: 'primary.main',
              opacity: 0.8, // Slightly reduce opacity for better hierarchy
            }}
          >
            Welcome back! Please sign in to your account.
          </Typography>
        </Box>

        {/* General error message */}
        {errors.general && (
          <Alert severity='error' sx={{ width: '100%' }}>
            {errors.general}
          </Alert>
        )}

        {/* Email field */}
        <TextField
          label={t('email')}
          type='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // Keep remembered email in sync when enabled
            if (rememberMe) {
              const next = e.target.value;
              if (next) localStorage.setItem('rememberedEmail', next);
              else localStorage.removeItem('rememberedEmail');
            }
            if (touched.email) {
              const error = validateEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: error }));
            }
          }}
          onBlur={() => handleBlur('email')}
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
          fullWidth
          required
          autoComplete='email'
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <EmailIcon
                  color={touched.email && errors.email ? 'error' : 'action'}
                />
              </InputAdornment>
            ),
          }}
          placeholder='Enter your email'
          sx={[
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
              // Ensure high-contrast input text (entered value)
              '& .MuiOutlinedInput-input': {
                color: 'text.primary',
                WebkitTextFillColor: 'var(--mui-palette-text-primary)',
                opacity: 1,
                fontWeight: 600,
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: 'text.secondary',
                opacity: 0.9, // make placeholder highly readable
              },
              '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                color: 'text.secondary',
              },
              // Autofill styles (Chrome/Safari)
              '& input:-webkit-autofill': {
                WebkitTextFillColor: 'var(--mui-palette-text-primary)',
                boxShadow: '0 0 0px 1000px var(--mui-palette-grey-50) inset',
              },
            },
            // Light mode uses theme tokens (no hard-coded colors)
            (theme) =>
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
          ]}
        />

        {/* Password field */}
        <TextField
          label={t('password')}
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (touched.password) {
              const error = validatePassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: error }));
            }
          }}
          onBlur={() => handleBlur('password')}
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          fullWidth
          required
          autoComplete='current-password'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <LockIcon
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
                  onClick={handleTogglePassword}
                  edge='end'
                  size='small'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          placeholder='Enter your password'
          sx={[
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
              // Ensure high-contrast input text (entered value)
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
              // Autofill styles (Chrome/Safari)
              '& input:-webkit-autofill': {
                WebkitTextFillColor: 'var(--mui-palette-text-primary)',
                boxShadow: '0 0 0px 1000px var(--mui-palette-grey-50) inset',
              },
            },
            // Light mode uses theme tokens (no hard-coded colors)
            (theme) =>
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
          ]}
        />

        {/* Remember me and Forgot password */}
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setRememberMe(checked);
                  if (!checked) {
                    // If user unchecks, remove any stored email immediately
                    localStorage.removeItem('rememberedEmail');
                  } else if (email) {
                    // If enabling and email present, store it
                    localStorage.setItem('rememberedEmail', email);
                  }
                }}
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
          <Link
            href='#'
            variant='body2'
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 500,
              '&:hover': {
                textDecoration: 'underline',
                color: 'primary.dark',
              },
            }}
            onClick={(e) => {
              e.preventDefault();
              // Handle forgot password
            }}
          >
            Forgot password?
          </Link>
        </Stack>

        {/* Submit button */}
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
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} color='inherit' />
          ) : (
            t('submit')
          )}
        </Button>

        {/* Sign up link */}
        <Box textAlign='center'>
          <Typography
            variant='body2'
            sx={{
              color: 'text.secondary',
              fontSize: '0.875rem',
            }}
          >
            Don't have an account?{' '}
            <Link
              href='#'
              sx={{
                textDecoration: 'none',
                fontWeight: 600,
                color: 'secondary.main',
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'secondary.dark',
                },
              }}
              onClick={(e) => {
                e.preventDefault();
                // Navigate to signup page when implemented
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>

        {/* Development hint */}
        {import.meta.env.DEV && (
          <Alert
            severity='info'
            sx={{
              mt: 2,
              '& .MuiAlert-message': {
                color: 'text.primary',
              },
            }}
          >
            <Typography variant='caption'>
              <strong>Dev Mode:</strong> Use any email/password to sign in
              (e.g., admin@example.com / password123)
            </Typography>
          </Alert>
        )}
      </Stack>
    </Box>
  );
}
