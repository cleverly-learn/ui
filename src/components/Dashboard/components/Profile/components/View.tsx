import { Box, Grow, Skeleton, Typography, Zoom } from '@mui/material';
import { Footer } from 'components/Dashboard/components/Profile/components/Footer/Footer';
import { PanelFab } from 'components/_common/PanelFab/styled';
import { PanelProps } from 'components/Dashboard/components/Profile/types/panel-props.interface';
import { getFullName } from 'utils/get-full-name';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import EditIcon from '@mui/icons-material/Edit';
import React, { FC } from 'react';

export const View: FC<PanelProps> = ({ open, onComplete }) => {
  const { data: user } = useCurrentUser();

  return (
    <Box display="flex" flexDirection="column" height={1}>
      <Grow in={open}>
        <Typography variant="h3">
          {user ? getFullName(user) : <Skeleton variant="text" width="40%" />}
        </Typography>
      </Grow>

      <Footer>
        <Zoom timeout={200} in={open}>
          <PanelFab color="secondary" onClick={onComplete}>
            <EditIcon />
          </PanelFab>
        </Zoom>
      </Footer>
    </Box>
  );
};
