import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#804188',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4D2D51',
    },
    background: {
      default: '#EDEDED',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
