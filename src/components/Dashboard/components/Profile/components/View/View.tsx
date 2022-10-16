import { Box, Grow, Link, Skeleton, Typography, Zoom } from '@mui/material';
import { Footer } from 'components/Dashboard/components/Profile/components/Footer/Footer';
import { GroupChip } from 'components/_common/GroupChip';
import { PanelFab } from 'components/_common/PanelFab/styled';
import { PanelProps } from 'types/panel-props.interface';
import { getFullName } from 'utils/get-full-name';
import { getLecturerScheduleUrl } from 'utils/schedule-url';
import { getTransitionTimeout } from 'components/Dashboard/components/Profile/utils/get-transition-timeout';
import { isLecturer, isStudent } from 'enums/role.enum';
import { isUndefined } from 'utils/is-undefined';
import { useCurrentUser } from 'hooks/queries/use-current-user';
import { useParams } from 'react-router-dom';
import { useUser } from 'components/Dashboard/components/Profile/components/View/feature/queries/use-user';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import React, { FC } from 'react';

export const View: FC<PanelProps> = ({ open, onComplete }) => {
  const { id } = useParams<{ id: string }>();
  const { data: currentUser } = useCurrentUser();
  const { data: idUser } = useUser(id ? +id : 0);

  const user = isUndefined(id) ? currentUser : idUser;

  return (
    <Box display="flex" flexDirection="column" height={1}>
      <Grow in={open} timeout={getTransitionTimeout(0)}>
        <Box mb={3}>
          <Box display="flex" alignItems="center">
            <Typography variant="h3" mr={2}>
              {user ? (
                getFullName(user)
              ) : (
                <Skeleton variant="text" width={400} />
              )}
            </Typography>
            {user?.group && <GroupChip sx={{ mt: 1 }} group={user.group} />}
          </Box>
          {idUser && isLecturer(idUser.role) && (
            <Link
              href={getLecturerScheduleUrl(idUser.scheduleId ?? '')}
              target="_blank"
              color="secondary"
              display="flex"
              alignItems="center"
            >
              Розклад <OpenInNewIcon fontSize="small" sx={{ ml: 0.25 }} />
            </Link>
          )}
        </Box>
      </Grow>
      <Grow in={open} timeout={getTransitionTimeout(1)}>
        <div>
          {user && isStudent(user.role) && (
            <Typography display="flex">
              Факультет:{' '}
              {user && isStudent(user.role) ? (
                user.group?.faculty.name
              ) : (
                <Skeleton variant="text" width={40} sx={{ ml: 0.5 }} />
              )}
            </Typography>
          )}
          <Typography display="flex">
            Пошта:{' '}
            {user ? (
              <Link href={`mailto:${user.email}`} color="secondary" ml={0.5}>
                {user.email}
              </Link>
            ) : (
              <Skeleton variant="text" width={200} sx={{ ml: 0.5 }} />
            )}
          </Typography>
        </div>
      </Grow>
      <Grow in={open} timeout={getTransitionTimeout(2)}>
        <div>
          <Typography display="flex">
            Телеграм:{' '}
            {user ? (
              <Link
                href={`https://t.me/${user.telegram}`}
                target="_blank"
                color="secondary"
                ml={0.5}
              >
                {user.telegram ? `@${user.telegram}` : ''}
              </Link>
            ) : (
              <Skeleton variant="text" width={200} sx={{ ml: 0.5 }} />
            )}
          </Typography>
          <Typography display="flex">
            Номер телефону:{' '}
            {user ? (
              <Link href={`tel:+38${user.phone}`} color="secondary" ml={0.5}>
                {user.phone ? `+38${user.phone}` : ''}
              </Link>
            ) : (
              <Skeleton variant="text" width={200} sx={{ ml: 0.5 }} />
            )}
          </Typography>
        </div>
      </Grow>
      <Grow in={open} timeout={getTransitionTimeout(3)}>
        <Typography display="flex">
          Додаткова інформація:{' '}
          {user ? (
            <Typography component="i" ml={0.5}>
              {user.details}
            </Typography>
          ) : (
            <Skeleton variant="text" width={500} sx={{ ml: 0.5 }} />
          )}
        </Typography>
      </Grow>
      {isUndefined(id) && (
        <Footer>
          <Zoom timeout={200} in={open}>
            <PanelFab color="secondary" onClick={onComplete}>
              <EditIcon />
            </PanelFab>
          </Zoom>
        </Footer>
      )}
    </Box>
  );
};
