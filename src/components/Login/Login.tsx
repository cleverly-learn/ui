import { Box, Button, Paper, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormData } from 'components/Login/types/form-data.interface';
import { GoogleButton } from 'components/_common/GoogleButton/GoogleButton';
import { Navigate } from 'react-router-dom';
import { Path } from 'enums/path.enum';
import { TopProgress } from 'components/_common/TopProgress';
import { schema } from 'components/Login/schema';
import { useLoginMutation } from 'components/Login/feature/mutations/use-login-mutation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';
import logo from 'assets/icons/logo.svg';

const Login: FC = () => {
  const { mutate, isLoading, isSuccess, error } = useLoginMutation();
  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  if (isSuccess) {
    return <Navigate to={Path.PROFILE} />;
  }

  return (
    <div>
      {isLoading && <TopProgress />}
      <Box mx="auto" mt="15%" width={300}>
        <Box display="flex" width={1} mx="auto" mb={2} justifyContent="center">
          <img src={logo} alt="logo" />
        </Box>
        <Paper
          // elevation={0}
          sx={{ py: 3, px: 6, display: 'flex', flexDirection: 'column' }}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={handleSubmit((data) => mutate(data))}>
            <Controller
              name="login"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  size="small"
                  label="Логін"
                  sx={{ mb: 1 }}
                  disabled={isLoading}
                  error={Boolean(fieldState.error) || Boolean(error)}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  size="small"
                  label="Пароль"
                  type="password"
                  sx={{ mb: 2 }}
                  disabled={isLoading}
                  error={Boolean(fieldState.error) || Boolean(error)}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mb: 3 }}
              disabled={isLoading}
              fullWidth
            >
              Увійти
            </Button>
          </form>
          <GoogleButton text="Увійти через Google" disabled={isLoading} />
        </Paper>
      </Box>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Login;
