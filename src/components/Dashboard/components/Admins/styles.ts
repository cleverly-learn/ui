import { SxProps, Theme } from '@mui/material';

export const SELECTED_CLASS_NAME = 'row-selected';
export const ACTIONS_CLASS_NAME = 'actions';

export const dataGrid: SxProps<Theme> = (theme) => ({
  [`& .${SELECTED_CLASS_NAME}`]: {
    background: theme.palette.action.disabledBackground,
  },
  [`& .${ACTIONS_CLASS_NAME}`]: {
    color: theme.palette.text.secondary,
  },
});
