import { Box, Button, Grow, TextField } from '@mui/material';
import { Footer } from 'components/MainWrapper/components/Profile/components/Footer/Footer';
import { PanelProps } from 'components/MainWrapper/components/Profile/types/panel-props.interface';
import { getTransitionTimeout } from 'components/MainWrapper/components/Profile/utils/get-transition-timeout';
import { useCurrentUser } from 'features/users/queries/use-current-user';
import React, { FC } from 'react';

export const Edit: FC<PanelProps> = ({ open, onComplete }) => {
  const { data: user } = useCurrentUser();

  return (
    <>
      <Box display="flex" mt={2}>
        <Grow in={open} timeout={getTransitionTimeout(0)}>
          <TextField
            size="small"
            sx={{ mr: 2 }}
            value={user?.lastName}
            label="Прізвище"
          />
        </Grow>
        <Grow in={open} timeout={getTransitionTimeout(1)}>
          <TextField
            size="small"
            sx={{ mr: 2 }}
            value={user?.firstName}
            label="Імʼя"
          />
        </Grow>
        <Grow in={open} timeout={getTransitionTimeout(2)}>
          <TextField
            size="small"
            value={user?.patronymic}
            label="По батькові"
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
            <Button size="large" variant="contained" onClick={onComplete}>
              Зберегти
            </Button>
          </Grow>
        </Box>
      </Footer>
    </>
  );
};
