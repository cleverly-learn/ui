import { Box, Button, Paper, TextField } from '@mui/material';
import { GoogleButton } from 'components/_common/GoogleButton/GoogleButton';
import { Navigate } from 'react-router-dom';
import { TopProgress } from 'components/_common/TopProgress';
import { useLoginMutation } from 'components/Login/feature/mutations/use-login-mutation';
import React, { FC, useState } from 'react';
import logo from 'assets/icons/logo.svg';

const Login: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const { mutate, isLoading, isSuccess } = useLoginMutation();

  if (isSuccess) {
    return <Navigate to="/profile" />;
  }

  return (
    <Box height="100vh">
      {isLoading && <TopProgress />}
      <Box mx="auto" mt="15%" width={300}>
        <Box display="flex" width={1} mx="auto" mb={2} justifyContent="center">
          <img src={logo} alt="logo" />
        </Box>
        <Paper
          elevation={0}
          sx={{ py: 3, px: 6, display: 'flex', flexDirection: 'column' }}
        >
          <TextField
            size="small"
            label="Логін"
            sx={{ mb: 1 }}
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            disabled={isLoading}
          />
          <TextField
            size="small"
            label="Пароль"
            type="password"
            sx={{ mb: 2 }}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isLoading}
          />
          <Button
            variant="contained"
            sx={{ mb: 3 }}
            onClick={() => mutate({ login, password })}
            disabled={isLoading}
          >
            Увійти
          </Button>
          <GoogleButton text="Увійти через Google" disabled={isLoading} />
        </Paper>
      </Box>
    </Box>
  );
};

// eslint-disable-next-line import/no-default-export
export default Login;
