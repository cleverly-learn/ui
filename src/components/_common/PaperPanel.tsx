import { Box, BoxProps, Fade, Paper } from '@mui/material';
import React, { FC } from 'react';

export const PAPER_PANEL_FADE_TIMEOUT = 500;

export const PaperPanel: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Paper sx={{ p: 4, height: 1 }}>
      <Fade timeout={PAPER_PANEL_FADE_TIMEOUT} in>
        <Box height={1} {...props}>
          {children}
        </Box>
      </Fade>
    </Paper>
  );
};
