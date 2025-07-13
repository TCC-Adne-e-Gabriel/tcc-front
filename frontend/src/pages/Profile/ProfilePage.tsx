import React from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  IconButton,
  Link as MuiLink,
  Button,
  useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Your Profile
          </Typography>
          <IconButton
            aria-label="Edit Profile"
            onClick={() => navigate('/profile/edit')}
            sx={{
              color: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark + '33' }
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2, '& > *:not(:first-of-type)': { mt: 2 } }}>
          <Typography>
            <strong>Name:</strong> {user.name}
          </Typography>
          <Typography>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography>
            <strong>Phone Number:</strong> {user.phone}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <MuiLink
            component="button"
            variant="body2"
            onClick={() => navigate('/profile/change-password')}
          >
            Change Password
          </MuiLink>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            Log Out
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
