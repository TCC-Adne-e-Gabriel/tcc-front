'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import { red } from '@mui/material/colors';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { severity: 'info' },
              style: {
                backgroundColor: '#FFFFFF',
              },
            },
          ],
        },
      },
    },
  },
});

export default theme;