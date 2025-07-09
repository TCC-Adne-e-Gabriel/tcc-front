import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';
import { useForm, FieldConfig } from '../../hooks/useForm';
import ErrorSnackbar from '../../components/ErrorSnackbar/ErrorSnackbar';
import FormPage from '../../components/FormPage/FormPage';
import { ProfileUpdateData } from '../../types';
import { updateProfile } from '../../services/authService';

const formConfig: Record<'name'|'email'|'phone', FieldConfig> = {
  name: { initial: '', required: true },
  email: { initial: '', required: true },
  phone: { initial: '', required: true },
};

const EditProfilePage: React.FC = () => {
  const theme = useTheme();
  const { user, updateUser } = useAuth();
  const [error, setError] = useState<string|null>(null);

  const { formValues, formErrors, handleInputChange, handleInputBlur, validateForm } =
    useForm(formConfig);

  useEffect(() => {
    if (user) {
      Object.keys(formValues).forEach((key) => {
        (formValues as any)[key] = (user as any)[key];
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const updated = await updateProfile(formValues as ProfileUpdateData);
      updateUser(updated);
    } catch (err: any) {
      setError(`Update failed: ${err.message}`);
    }
  };

  return (
    <FormPage title="Edit Profile" onSubmit={handleSubmit}>
      <TextField
        name="name" label="Name"
        fullWidth margin="normal"
        value={formValues.name}
        onChange={handleInputChange} onBlur={handleInputBlur}
        error={!!formErrors.name} helperText={formErrors.name}
      />
      <TextField
        name="email" label="Email"
        fullWidth margin="normal"
        value={formValues.email}
        onChange={handleInputChange} onBlur={handleInputBlur}
        error={!!formErrors.email} helperText={formErrors.email}
      />
      <TextField
        name="phone" label="Phone"
        fullWidth margin="normal"
        value={formValues.phone}
        onChange={handleInputChange} onBlur={handleInputBlur}
        error={!!formErrors.phone} helperText={formErrors.phone}
      />

      <Button
        type="submit" variant="contained" fullWidth
        sx={{ mt: 3, backgroundColor: theme.palette.primary.main }}
      >
        Save Changes
      </Button>

      <ErrorSnackbar error={error} onClose={() => setError(null)} />
    </FormPage>
  );
};

export default EditProfilePage;
