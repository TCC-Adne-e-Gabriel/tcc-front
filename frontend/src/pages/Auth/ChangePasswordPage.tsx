import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm, FieldConfig } from '../../hooks/useForm';
import FormPage from '../../components/FormPage/FormPage';
import ErrorSnackbar from '../../components/ErrorSnackbar/ErrorSnackbar';
import { changePassword } from '../../services/authService';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

const formConfig: Record<'currentPassword'|'newPassword', FieldConfig> = {
  currentPassword: { initial: '', required: true },
  newPassword: {
    initial: '',
    required: true,
    validators: [v => passwordRegex.test(v)
      ? null
      : 'Password must have at least 8 characters, include uppercase, lowercase & special characters.'],
  },
};

const ChangePasswordPage: React.FC = () => {
  const theme = useTheme();
  const [error, setError] = useState<string|null>(null);

  const { formValues, formErrors, handleInputChange, handleInputBlur, validateForm } =
    useForm(formConfig);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await changePassword({
        currentPassword: formValues.currentPassword,
        newPassword: formValues.newPassword,
      });
    } catch (err: any) {
      setError(`Change password failed: ${err.message}`);
    }
  };

  return (
    <FormPage title="Change Password" onSubmit={handleSubmit}>
      <TextField
        name="currentPassword" label="Current Password" type="password"
        fullWidth margin="normal"
        value={formValues.currentPassword}
        onChange={handleInputChange} onBlur={handleInputBlur}
        error={!!formErrors.currentPassword}
        helperText={formErrors.currentPassword}
        InputLabelProps={{ style: { color: theme.palette.text.primary } }}
      />
      <TextField
        name="newPassword" label="New Password" type="password"
        fullWidth margin="normal"
        value={formValues.newPassword}
        onChange={handleInputChange} onBlur={handleInputBlur}
        error={!!formErrors.newPassword}
        helperText={formErrors.newPassword}
        InputLabelProps={{ style: { color: theme.palette.text.primary } }}
      />

      <Button
        type="submit" variant="contained" fullWidth
        sx={{ mt: 3, backgroundColor: theme.palette.primary.main }}
      >
        Update Password
      </Button>

      <ErrorSnackbar error={error} onClose={() => setError(null)} />
    </FormPage>
  );
};

export default ChangePasswordPage;
