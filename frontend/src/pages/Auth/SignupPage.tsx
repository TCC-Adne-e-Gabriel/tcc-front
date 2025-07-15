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
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
const phoneRegex = /^[0-9]{10,}$/;

const formConfig: Record<'name' | 'email' | 'phone' | 'password' | 'confirmPassword', FieldConfig> = {
  name: { initial: '', required: true },
  email: {
    initial: '',
    required: true,
    validators: [v => emailRegex.test(v) ? null : 'Enter a valid email address.'],
  },
  phone: {
    initial: '',
    required: true,
    validators: [v => phoneRegex.test(v) ? null : 'Enter a valid phone number.'],
  },
  password: {
    initial: '',
    required: true,
    validators: [
      v => passwordRegex.test(v)
        ? null
        : 'Password must have at least 8 characters, include uppercase, lowercase & special characters.',
    ],
  },
  confirmPassword: {
    initial: '',
    required: true,
    validators: [
      (v, all) => v === all!['password']
        ? null
        : 'Passwords do not match.',
    ],
  },
};

const SignupPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const { register } = useAuth();
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
      await register({
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        password: formValues.password,
        confirmPassword: formValues.confirmPassword,
      });
      navigate('/login');
    } catch (err: any) {
      console.error('Registration failed:', err);
      setApiError(`Registration failed, please try again: ${err.message}`);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            value={formValues.name}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={!!formErrors.name}
            helperText={formErrors.name}
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          />

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
            name="phone"
            label="Phone"
            fullWidth
            margin="normal"
            value={formValues.phone}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={!!formErrors.phone}
            helperText={formErrors.phone}
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

          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={formValues.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword}
            InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          />

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <MuiLink
              component={RouterLink}
              to="/login"
              sx={{ color: theme.palette.primary.main }}
            >
              Already have an account? Log in here.
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
            Sign Up
          </Button>
        </Box>
      </Paper>

      <ErrorSnackbar error={apiError} onClose={() => setApiError(null)} />
    </Container>
  );
};

export default SignupPage;
