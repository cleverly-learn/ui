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
import { getFullName } from 'utils/get-full-name';
import { isAdmin } from 'enums/role.enum';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import { useLogout } from 'components/Dashboard/components/Header/feature/mutations/use-logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { FC, useRef, useState } from 'react';

export const Header: FC = () => {
  const accountButton = useRef<HTMLButtonElement>(null);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const {
    mutate: logout,
    isLoading: isLogoutLoading,
    isSuccess: isLogoutSuccess,
  } = useLogout();

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
        ref={accountButton}
        variant="contained"
        size="large"
        disabled={isUserLoading}
        sx={{ ml: 'auto' }}
        endIcon={<AccountCircleIcon />}
        onClick={() => setIsMenuOpened(true)}
      >
        {user ? getFullName(user) : <Skeleton variant="text" width={200} />}
      </Button>
      <Menu
        open={Boolean(isMenuOpened)}
        anchorEl={accountButton.current}
        onClose={() => setIsMenuOpened(false)}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        PaperProps={{
          sx: { mt: 0.5, width: accountButton.current?.offsetWidth },
        }}
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
