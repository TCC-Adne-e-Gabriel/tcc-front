import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Box,
  Link as MuiLink,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';
import { useForm, FieldConfig } from '../../hooks/useForm';
import ErrorSnackbar from '../../components/ErrorSnackbar/ErrorSnackbar';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formConfig: Record<'email'|'password', FieldConfig> = {
  email: {
    initial: '',
    required: true,
    validators: [
      v => emailRegex.test(v) ? null : 'Enter a valid email address.',
    ],
  },
  password: {
    initial: '',
    required: true,
  },
};

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    formValues,
    formErrors,
    handleInputChange,
    handleInputBlur,
    validateForm,
  } = useForm(formConfig);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login({
        email: formValues.email,
        password: formValues.password,
      });
      navigate('/');
    } catch (err: any) {
      console.error('Login failed:', err);
      setApiError(`Login failed, please try again: ${err.message}`);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={formValues.email}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={!!formErrors.email}
            helperText={formErrors.email}
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={formValues.password}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={!!formErrors.password}
            helperText={formErrors.password}
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          />

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <MuiLink
              component={RouterLink}
              to="/signup"
              sx={{ color: theme.palette.primary.main }}
            >
              Don't have an account? Sign up here.
            </MuiLink>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>

      <ErrorSnackbar error={apiError} onClose={() => setApiError(null)} />
    </Container>
  );
};

export default LoginPage;
