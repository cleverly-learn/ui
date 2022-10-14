import { SxProps, Theme, alpha } from '@mui/material';

export const successPaper = (isSuccess: boolean): SxProps<Theme> => ({
  bgcolor: (theme: Theme) =>
    isSuccess ? alpha(theme.palette.primary.light, 0.5) : undefined,
  transition: `1s`,
});
