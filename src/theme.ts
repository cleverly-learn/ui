import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#258972',
    },
    secondary: {
      main: '#205072',
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
        },
      },
    },
  },
});
