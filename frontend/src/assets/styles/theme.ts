import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#804188',
      dark: '#6a3570',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4D2D51',
      contrastText: '#804188',
    },
    background: {
      default: '#EDEDED',
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff',
    },
    error: {
      main: '#ff6b6b',
    },
    action: {
      hover: 'rgba(0, 0, 0, 0.04)',
    },
  },
  typography: {
    fontFamily: '"Space Mono", monospace, "Roboto", Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 700, fontSize: '2rem' },
    h3: { fontWeight: 700, fontSize: '1.75rem' },
    h4: { fontWeight: 700, fontSize: '1.5rem' },
    h5: { fontWeight: 700, fontSize: '1.25rem' },
    h6: { fontWeight: 700, fontSize: '1rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontWeight: 600,
          borderRadius: 8,
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#6a3570',
          },
        },
        outlinedSecondary: {
          backgroundColor: '#ffffff',
          borderColor: '#804188',
          color: '#804188',
          '&:hover': {
            backgroundColor: '#6a3570',
            color: '#ffffff',
            borderColor: '#6a3570',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#6a3570' + '33',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#804188',
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});