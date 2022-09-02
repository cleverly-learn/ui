import { Backdrop } from '@mui/material';
import { TopProgress } from 'components/_common/TopProgress';
import React, { FC } from 'react';

interface Props {
  open?: boolean;
}

export const BackdropTopProgress: FC<Props> = ({ open }) => {
  return (
    <Backdrop open={Boolean(open)} sx={{ zIndex: 1 }}>
      <TopProgress />
    </Backdrop>
  );
};
