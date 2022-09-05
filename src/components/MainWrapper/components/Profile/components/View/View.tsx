import * as styles from 'components/MainWrapper/components/Profile/components/View/styles';
import { Fab, Grow, Skeleton, Typography, Zoom } from '@mui/material';
import { Footer } from 'components/MainWrapper/components/Profile/components/Footer/Footer';
import { PanelProps } from 'components/MainWrapper/components/Profile/types/panel-props.interface';
import { useCurrentUserFullName } from 'features/users/queries/use-current-user-full-name';
import EditIcon from '@mui/icons-material/Edit';
import React, { FC } from 'react';

export const View: FC<PanelProps> = ({ open, onComplete }) => {
  const fullName = useCurrentUserFullName();

  return (
    <>
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
    </>
  );
};
