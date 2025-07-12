import React, { ReactNode } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';

interface FormPageProps {
  title: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

const FormPage: React.FC<FormPageProps> = ({ title, children, onSubmit }) => (
  <Container maxWidth="sm" sx={{ mt: 8 }}>
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {title}
      </Typography>
      <Box component="form" noValidate onSubmit={onSubmit}>
        {children}
      </Box>
    </Paper>
  </Container>
);

export default FormPage;
