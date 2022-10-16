import { Typography } from '@mui/material';
import React, { FC } from 'react';

export const EmptyListStudentTitle: FC = () => {
  return (
    <Typography variant="h4" color="text.disabled" textAlign="center" mt="15%">
      Вас ще не додали ні до одного курсу
    </Typography>
  );
};
