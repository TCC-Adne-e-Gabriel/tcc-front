import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface Props {
  error: string | null;
  onClose: () => void;
}

const ErrorSnackbar: React.FC<Props> = ({ error, onClose }) => (
  <Snackbar
    open={!!error}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  >
    <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
      {error}
    </Alert>
  </Snackbar>
);

export default ErrorSnackbar;
