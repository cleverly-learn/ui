import { Box, Button, Paper, TextField } from '@mui/material';
import React, { FC } from 'react';
import logo from 'assets/icons/logo.svg';

export const Login: FC = () => {
  return (
    <Box height="100vh" display="flex">
      <Box mx="auto" my="auto">
        <Box display="flex" width={1} mx="auto" mb={2} justifyContent="center">
          <img src={logo} alt="logo" />
        </Box>
        <Paper
          elevation={0}
          sx={{ py: 3, px: 6, display: 'flex', flexDirection: 'column' }}
        >
          <TextField size="small" label="Логін" sx={{ mb: 1 }} />
          <TextField size="small" label="Пароль" sx={{ mb: 2 }} />
          <Button variant="contained">Увійти</Button>
        </Paper>
      </Box>
    </Box>
  );
};
