import { SxProps, Theme } from '@mui/material';

export const dataGridClasses = {
  rowSelected: 'row-selected',
  actions: 'actions',
};

export const SELECTED_CLASS_NAME = 'row-selected';
export const ACTIONS_CLASS_NAME = 'actions';

export const dataGrid: SxProps<Theme> = (theme) => ({
  [`& .${dataGridClasses.rowSelected}`]: {
    background: theme.palette.action.disabledBackground,
  },
  [`& .${dataGridClasses.actions}`]: {
    color: theme.palette.text.secondary,
  },
});
