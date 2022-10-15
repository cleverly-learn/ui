import { Box, CircularProgress, Fab, Zoom } from '@mui/material';
import { isUndefined } from 'utils/is-undefined';
import CheckIcon from '@mui/icons-material/Check';
import React, { FC } from 'react';

interface Props {
  isLoading?: boolean;
  isSuccess?: boolean;
  onClickSuccess?: () => void;
}

export const SuccessableProgress: FC<Props> = ({
  isLoading,
  isSuccess,
  onClickSuccess,
}) => {
  return (
    <Box mt={4} position="relative">
      <Zoom in={isSuccess} timeout={500}>
        <Fab
          color="primary"
          disabled={isLoading}
          onClick={onClickSuccess}
          disableRipple={isUndefined(onClickSuccess)}
          sx={{
            width: 150,
            height: 150,
          }}
        >
          <CheckIcon sx={{ fontSize: 150 }} />
        </Fab>
      </Zoom>
      {isLoading && (
        <CircularProgress
          size={130}
          sx={(theme) => ({
            color: theme.palette.primary.main,
            position: 'absolute',
            top: 0,
            left: 0,
          })}
        />
      )}
    </Box>
  );
};
