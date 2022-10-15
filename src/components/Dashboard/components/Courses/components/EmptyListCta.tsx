import { Box, Button, Typography } from '@mui/material';
import React, { FC } from 'react';

interface Props {
  onClick(): void;
}

export const EmptyListCta: FC<Props> = ({ onClick }) => {
  return (
    <Box height={1} display="flex">
      <Box
        sx={{
          border: '3px dashed',
          borderColor: 'divider',
          borderRadius: '30px',
          mx: 'auto',
          mt: '15%',
          mb: 'auto',
          p: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" color="text.disabled">
          Ви не додали жодного курсу
        </Typography>
        <Button
          size="large"
          sx={{ mx: 'auto', mt: 5 }}
          variant="contained"
          onClick={onClick}
        >
          <Typography variant="h5">Створити новий курс</Typography>
        </Button>
      </Box>
    </Box>
  );
};
