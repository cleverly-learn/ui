import { Box, Button } from '@mui/material';
import { ChangePassword } from 'components/MainWrapper/components/Profile/components/Footer/components/ChangePassword/ChangePassword';
import React, { FC, PropsWithChildren, useState } from 'react';

export const Footer: FC<PropsWithChildren> = ({ children }) => {
  const [isChangePasswordOpened, setIsChangePasswordOpened] = useState(false);

  return (
    <Box mt="auto" display="flex" justifyContent="space-between">
      <Button
        size="large"
        color="secondary"
        onClick={() => setIsChangePasswordOpened(true)}
      >
        Змінити пароль
      </Button>
      <ChangePassword
        open={isChangePasswordOpened}
        onClose={() => setIsChangePasswordOpened(false)}
      />
      {children}
    </Box>
  );
};
