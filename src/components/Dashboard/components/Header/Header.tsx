import { BackdropTopProgress } from 'components/_common/BackdropTopProgress';
import {
  Box,
  Button,
  Chip,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
} from '@mui/material';
import { Navigate } from 'react-router-dom';
import { Path } from 'enums/path.enum';
import { isAdmin } from 'enums/role.enum';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import { useCurrentUserFullName } from 'hooks/queries/use-current-user-full-name';
import { useLogout } from 'components/Dashboard/components/Header/feature/mutations/use-logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { FC, MouseEvent, useState } from 'react';

export const Header: FC = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const fullName = useCurrentUserFullName();
  const {
    mutate: logout,
    isLoading: isLogoutLoading,
    isSuccess: isLogoutSuccess,
  } = useLogout();

  const onClickUser = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const onCloseMenu = () => {
    setMenuAnchor(null);
  };

  if (isLogoutSuccess) {
    return <Navigate to={Path.LOGIN} />;
  }

  return (
    <Box display="flex" alignItems="center">
      <BackdropTopProgress open={isLogoutLoading} />
      {user && isAdmin(user.role) && (
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
        {fullName ?? <Skeleton variant="text" width={200} />}
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
        PaperProps={{ sx: { mt: 0.5 } }}
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
