import { BackdropTopProgress } from 'components/_common/BackdropTopProgress';
import { Box, Button, Grow, InputAdornment, TextField } from '@mui/material';
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
      telegram: user?.telegram,
      phone: user?.phone,
      details: user?.details,
    },
  });

  const onSubmit = handleSubmit(({ phone, ...data }) =>
    mutate({ ...data, phone: phone || undefined }, { onSuccess: onComplete }),
  );

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      height={1}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
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
      <Box sx={{ width: 200, display: 'flex', flexDirection: 'column' }}>
        <Grow in={open} timeout={getTransitionTimeout(1)}>
          <TextField
            size="small"
            label="Телеграм"
            sx={{ mt: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">@</InputAdornment>
              ),
            }}
            {...register('telegram')}
          />
        </Grow>
        <Grow in={open} timeout={getTransitionTimeout(2)}>
          <TextField
            size="small"
            label="Номер телефону"
            type="tel"
            sx={{ mt: 2 }}
            inputProps={{
              maxLength: 10,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+38</InputAdornment>
              ),
            }}
            {...register('phone')}
          />
        </Grow>
      </Box>
      <Grow in={open} timeout={getTransitionTimeout(3)}>
        <TextField
          size="small"
          label="Додаткова інформація"
          sx={{ mt: 2, width: 500 }}
          multiline
          rows={4}
          {...register('details')}
        />
      </Grow>
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
