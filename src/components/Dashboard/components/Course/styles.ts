import { SxProps } from '@mui/material';

export const accordion: SxProps = {
  width: 0.5,
  mb: 1,
  boxShadow: 'none',
  border: '1px solid',
  borderColor: 'divider',

  '&, &:first-of-type, &:last-of-type': {
    borderRadius: '10px',
  },
  '&:before': {
    display: 'none',
  },
};
