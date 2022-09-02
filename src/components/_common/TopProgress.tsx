import { LinearProgress } from '@mui/material';
import React, { FC } from 'react';

export const TopProgress: FC = () => (
  <LinearProgress sx={{ position: 'absolute', left: 0, top: 0, width: 1 }} />
);
