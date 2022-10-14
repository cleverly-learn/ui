import { IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import React, { FC } from 'react';

interface Props {
  text: string;
}

export const TipIcon: FC<Props> = ({ text }) => {
  return (
    <Tooltip title={text}>
      <IconButton size="small" disableRipple>
        <InfoIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
