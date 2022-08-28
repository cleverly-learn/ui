import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#258972',
      light: '#5cbaa0',
      dark: '#005b47',
    },
    secondary: {
      main: '#205072',
      light: '#527ca1',
      dark: '#002846',
    },
    background: {
      default: '#e1e2e1',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 10,
        },
      },
    },
  },
});
