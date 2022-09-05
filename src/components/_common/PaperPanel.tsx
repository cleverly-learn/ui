import { Box, BoxProps, Fade, Paper } from '@mui/material';
import React, { FC } from 'react';

export const PaperPanel: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Paper sx={{ p: 3, height: 1 }}>
      <Fade timeout={500} in>
        <Box height={1} {...props}>
          {children}
        </Box>
      </Fade>
    </Paper>
  );
};
