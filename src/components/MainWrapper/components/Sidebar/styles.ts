import { SxProps, Theme } from '@mui/material';

export const tab: SxProps<Theme> = (theme) => ({
  borderRadius: '10px',
  zIndex: 1,
  mb: 1,
  minHeight: 0,
  padding: 2.5,

  '&:hover': {
    background: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    transition: '0.5s',
    color: theme.palette.primary.contrastText,
  },
});
