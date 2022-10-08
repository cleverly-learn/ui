import { BackdropTopProgress } from 'components/_common/BackdropTopProgress';
import { Box, Button, Grow, TextField } from '@mui/material';
import { Footer } from 'components/Dashboard/components/Profile/components/Footer/Footer';
import { FormData } from 'components/Dashboard/components/Profile/components/Edit/types/form-data.interface';
import { PanelProps } from 'components/Dashboard/components/Profile/types/panel-props.interface';
import { getTransitionTimeout } from 'components/Dashboard/components/Profile/utils/get-transition-timeout';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import { useEditProfile } from 'components/Dashboard/components/Profile/components/Edit/feature/mutations/use-edit-profile';
import { useForm } from 'react-hook-form';
import React, { FC } from 'react';

export const Edit: FC<PanelProps> = ({ open, onComplete }) => {
  const { data: user } = useCurrentUser();
  const { mutate, isLoading } = useEditProfile();

  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      patronymic: user?.patronymic,
    },
  });

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      height={1}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((data) => mutate(data, { onSuccess: onComplete }))}
    >
      {isLoading && <BackdropTopProgress />}
      <Box display="flex" mt={2}>
        <Grow in={open} timeout={getTransitionTimeout(0)}>
          <TextField
            size="small"
            sx={{ mr: 2 }}
            label="Прізвище"
            {...register('lastName')}
          />
        </Grow>
        <Grow in={open} timeout={getTransitionTimeout(1)}>
          <TextField
            size="small"
            sx={{ mr: 2 }}
            label="Імʼя"
            {...register('firstName')}
          />
        </Grow>
        <Grow in={open} timeout={getTransitionTimeout(2)}>
          <TextField
            size="small"
            label="По батькові"
            {...register('patronymic')}
          />
        </Grow>
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
    </Box>
  );
};
