import { BackdropTopProgress } from 'components/_common/BackdropTopProgress';
import { Box, Button, Grow, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Footer } from 'components/Dashboard/components/Profile/components/Footer/Footer';
import { Form } from 'components/_common/Html/styled';
import { FormData } from 'components/Dashboard/components/Profile/components/Edit/types/form-data.interface';
import { PanelProps } from 'components/Dashboard/components/Profile/types/panel-props.interface';
import { getTransitionTimeout } from 'components/Dashboard/components/Profile/utils/get-transition-timeout';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import { useEditProfile } from 'components/Dashboard/components/Profile/components/Edit/feature/mutations/use-edit-profile';
import React, { FC } from 'react';

export const Edit: FC<PanelProps> = ({ open, onComplete }) => {
  const { data: user } = useCurrentUser();
  const { mutate, isLoading, isSuccess } = useEditProfile();

  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      patronymic: user?.patronymic,
    },
  });

  if (isSuccess) {
    onComplete();
  }

  return (
    <Form
      sx={{ display: 'flex', flexDirection: 'column', height: 1 }}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      {isLoading && <BackdropTopProgress />}
      <Box display="flex" mt={2}>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <Grow in={open} timeout={getTransitionTimeout(0)}>
              <TextField
                size="small"
                sx={{ mr: 2 }}
                label="Прізвище"
                {...field}
              />
            </Grow>
          )}
        />
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <Grow in={open} timeout={getTransitionTimeout(1)}>
              <TextField size="small" sx={{ mr: 2 }} label="Імʼя" {...field} />
            </Grow>
          )}
        />
        <Controller
          name="patronymic"
          control={control}
          render={({ field }) => (
            <Grow in={open} timeout={getTransitionTimeout(2)}>
              <TextField size="small" label="По батькові" {...field} />
            </Grow>
          )}
        />
      </Box>
      <Footer>
        <Box display="flex">
          <Grow in={open} timeout={getTransitionTimeout(0)}>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={onComplete}
              sx={{ mr: 2 }}
            >
              Скасувати
            </Button>
          </Grow>
          <Grow in={open} timeout={getTransitionTimeout(1)}>
            <Button type="submit" size="large" variant="contained">
              Зберегти
            </Button>
          </Grow>
        </Box>
      </Footer>
    </Form>
  );
};
