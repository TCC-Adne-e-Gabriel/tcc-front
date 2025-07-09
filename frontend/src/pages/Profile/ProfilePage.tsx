import React from 'react';
import { Button, Typography, Container, Paper, Box, Link as MuiLink } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Profile
        </Typography>
        <Typography><strong>Name:</strong> {user.name}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>Phone:</strong> {user.phone}</Typography>
        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<span className="material-icons">edit</span>}
            onClick={() => navigate('/profile/edit')}
          >
            Edit Profile
          </Button>
          <MuiLink component={RouterLink} to="/profile/change-password" sx={{ alignSelf: 'center' }}>
            Change Password
          </MuiLink>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
