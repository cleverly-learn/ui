import { Box, Button, Fade, Typography } from '@mui/material';
import { PanelProps } from 'types/panel-props.interface';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import React, { FC } from 'react';

export const Welcome: FC<PanelProps> = ({ open, onComplete }) => {
  const { data } = useCurrentUser();

  return (
    <Fade in={open}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography mt={15} variant="h5">
          Вітаємо,{' '}
          <b>
            {data?.lastName} {data?.firstName} {data?.patronymic}
          </b>
        </Typography>
        <Typography mt={3}>
          Для початку роботи необхідно заповнити деякі дані та змінити пароль
        </Typography>
        <Button variant="contained" sx={{ mt: 4 }} onClick={onComplete}>
          Розпочати
        </Button>
      </Box>
    </Fade>
  );
};
