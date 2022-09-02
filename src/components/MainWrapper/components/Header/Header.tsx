import { BackdropTopProgress } from 'components/_common/BackdropTopProgress';
import {
  Box,
  Button,
  Chip,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { Navigate } from 'react-router-dom';
import { Role } from 'enums/role.enum';
import { useCurrentUserQuery } from 'features/users/queries/use-current-user-query';
import { useLogoutMutation } from 'components/MainWrapper/components/Header/feature/mutations/use-logout-mutation';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { FC, MouseEvent, useState } from 'react';

export const Header: FC = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const { data: user, isLoading: isUserLoading } = useCurrentUserQuery();
  const {
    mutate: logout,
    isLoading: isLogoutLoading,
    isSuccess: isLogoutSuccess,
  } = useLogoutMutation();

  const onClickUser = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const onCloseMenu = () => {
    setMenuAnchor(null);
  };

  if (isLogoutSuccess) {
    return <Navigate to="/login" />;
  }

  return (
    <Box display="flex" alignItems="center">
      <BackdropTopProgress open={isLogoutLoading} />
      {user?.role === Role.ADMIN && (
        <Chip color="secondary" variant="outlined" label="Адміністратор" />
      )}
      <Button
        variant="contained"
        size="large"
        disabled={isUserLoading}
        sx={{ ml: 'auto' }}
        endIcon={<AccountCircleIcon />}
        onClick={onClickUser}
      >
        {user?.lastName} {user?.firstName} {user?.patronymic}
      </Button>
      <Menu
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        onClose={onCloseMenu}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        PaperProps={{ sx: { mt: 1 } }}
      >
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Вийти</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
