import { BackdropTopProgress } from 'components/_common/BackdropTopProgress';
import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Form } from 'components/_common/Html/styled';
import { FormData } from 'components/Dashboard/components/Admins/components/Create/types/form-data.interface';
import { useCreateAdmin } from 'components/Dashboard/components/Admins/components/Create/feature/mutations/use-create-admin';
import AddIcon from '@mui/icons-material/Add';
import React, { FC } from 'react';

export const Create: FC = () => {
  const { isLoading, mutate } = useCreateAdmin();

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      patronymic: '',
      password: '',
    },
  });

  return (
    <Form
      sx={{ display: 'flex' }}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((data) =>
        mutate(data, { onSuccess: () => reset() }),
      )}
    >
      {isLoading && <BackdropTopProgress />}
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField size="small" sx={{ mr: 1 }} label="Прізвище" {...field} />
        )}
      />
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField size="small" sx={{ mr: 1 }} label="Імʼя" {...field} />
        )}
      />
      <Controller
        name="patronymic"
        control={control}
        render={({ field }) => (
          <TextField
            size="small"
            sx={{ mr: 1 }}
            label="По батькові"
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            size="small"
            type="password"
            sx={{ mr: 1 }}
            label="Пароль"
            {...field}
          />
        )}
      />
      <Button type="submit" variant="contained" startIcon={<AddIcon />}>
        Додати адміністратора
      </Button>
    </Form>
  );
};
