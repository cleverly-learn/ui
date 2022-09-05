import { Box, Button } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';

export const Footer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box mt="auto" display="flex" justifyContent="space-between">
      <Button color="secondary">Змінити пароль</Button>
      {children}
    </Box>
  );
};
