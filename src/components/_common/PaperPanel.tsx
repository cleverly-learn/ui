import { Box, BoxProps, Fade, Paper, SxProps } from '@mui/material';
import React, { FC } from 'react';

export const PAPER_PANEL_FADE_TIMEOUT = 500;

interface Props extends BoxProps {
  paperSx?: SxProps;
}

export const PaperPanel: FC<Props> = ({ children, paperSx, ...props }) => {
  return (
    <Paper sx={{ p: 4, height: 1, ...paperSx }}>
      <Fade timeout={PAPER_PANEL_FADE_TIMEOUT} in>
        <Box height={1} {...props}>
          {children}
        </Box>
      </Fade>
    </Paper>
  );
};
