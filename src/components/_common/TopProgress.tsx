import { LinearProgress } from '@mui/material';
import React, { FC } from 'react';

export const TopProgress: FC = () => (
  <LinearProgress sx={{ position: 'absolute', top: 0, width: 1 }} />
);
