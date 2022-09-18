import * as styles from 'components/Dashboard/components/Profile/components/View/styles';
import { Box, Fab, Grow, Skeleton, Typography, Zoom } from '@mui/material';
import { Footer } from 'components/Dashboard/components/Profile/components/Footer/Footer';
import { PanelProps } from 'components/Dashboard/components/Profile/types/panel-props.interface';
import { useCurrentUserFullName } from 'hooks/queries/use-current-user-full-name';
import EditIcon from '@mui/icons-material/Edit';
import React, { FC } from 'react';

export const View: FC<PanelProps> = ({ open, onComplete }) => {
  const fullName = useCurrentUserFullName();

  return (
    <Box display="flex" flexDirection="column" height={1}>
      <Grow in={open}>
        <Typography variant="h3">
          {fullName ?? <Skeleton variant="text" width="40%" />}
        </Typography>
      </Grow>

      <Footer>
        <Zoom timeout={200} in={open}>
          <Fab color="secondary" sx={styles.edit} onClick={onComplete}>
            <EditIcon />
          </Fab>
        </Zoom>
      </Footer>
    </Box>
  );
};
