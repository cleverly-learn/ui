import { BackdropTopProgress } from 'components/_common/BackdropTopProgress';
import { Box, Button, TextField } from '@mui/material';
import { FormData } from 'components/Dashboard/components/Admins/components/Create/types/form-data.interface';
import { useCreateAdmin } from 'components/Dashboard/components/Admins/components/Create/feature/mutations/use-create-admin';
import { useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import React, { FC } from 'react';

export const Create: FC = () => {
  const { isLoading, mutate } = useCreateAdmin();

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      patronymic: '',
      password: '',
    },
  });

  return (
    <Box
      component="form"
      display="flex"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((data) =>
        mutate(data, { onSuccess: () => reset() }),
      )}
    >
      <BackdropTopProgress open={isLoading} />
      <TextField
        size="small"
        sx={{ mr: 1 }}
        label="Прізвище"
        {...register('lastName')}
      />
      <TextField
        size="small"
        sx={{ mr: 1 }}
        label="Імʼя"
        {...register('firstName')}
      />
      <TextField
        size="small"
        sx={{ mr: 1 }}
        label="По батькові"
        {...register('patronymic')}
      />
      <TextField
        size="small"
        type="password"
        sx={{ mr: 1 }}
        label="Пароль"
        {...register('password')}
      />
      <Button type="submit" variant="contained" startIcon={<AddIcon />}>
        Додати адміністратора
      </Button>
    </Box>
  );
};
