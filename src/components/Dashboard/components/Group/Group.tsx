import {
  Box,
  Divider,
  Grow,
  Link as MuiLink,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { Link as MuiRouterLink } from 'components/_common/Link';
import { PaperPanel } from 'components/_common/PaperPanel';
import { Path } from 'enums/path.enum';
import { SCHEDULE_KPI_URL } from 'constants/env';
import { getFullName } from 'utils/get-full-name';
import { getTransitionTimeout } from 'components/Dashboard/components/Profile/utils/get-transition-timeout';
import { isUndefined } from 'utils/is-undefined';
import { useGroup } from 'components/Dashboard/components/Group/feature/queries/use-group';
import { useParams } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import React, { FC } from 'react';

export const Group: FC = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();

  const { data: group } = useGroup(id ? +id : 0);

  if (isUndefined(id)) {
    return null;
  }

  return (
    <PaperPanel>
      <Grow in timeout={getTransitionTimeout(0)}>
        <div>
          <Typography variant="h3">
            {group?.name ?? <Skeleton variant="text" width="40%" />}
          </Typography>
          <MuiLink
            href={`${SCHEDULE_KPI_URL}?groupId=${group?.scheduleId ?? ''}`}
            target="_blank"
            color="secondary"
            display="flex"
            alignItems="center"
          >
            {group ? (
              <>
                Розклад <OpenInNewIcon fontSize="small" sx={{ ml: 0.25 }} />
              </>
            ) : (
              <Skeleton variant="text" width={85} />
            )}
          </MuiLink>
        </div>
      </Grow>
      <Grow in timeout={getTransitionTimeout(1)}>
        <div>
          <Typography mt={3} display="flex">
            Факультет:{' '}
            {group ? (
              group?.faculty.name
            ) : (
              <Skeleton variant="text" width={40} sx={{ ml: 0.5 }} />
            )}
          </Typography>
          <Typography display="flex">
            К-ть студентів:{' '}
            {group ? (
              group.students.length
            ) : (
              <Skeleton variant="text" width={20} sx={{ ml: 0.5 }} />
            )}
          </Typography>
        </div>
      </Grow>
      <Grow in timeout={getTransitionTimeout(2)}>
        <div>
          <Typography mt={3}>Студенти:</Typography>
          <Box
            borderRadius="10px"
            border="1px solid"
            borderColor={theme.palette.divider}
            width="max-content"
            mt={1}
            px={2}
            py={0.5}
          >
            {group?.students.map((student, index, arr) => (
              <>
                <Box display="flex" p={1.5}>
                  <Typography mr={2} color={theme.palette.text.disabled}>
                    {index + 1}
                  </Typography>
                  <MuiRouterLink color="secondary" to={`${Path.USER}/0`}>
                    {getFullName(student)}
                  </MuiRouterLink>
                </Box>
                {index !== arr.length - 1 && <Divider />}
              </>
            ))}
          </Box>
        </div>
      </Grow>
    </PaperPanel>
  );
};
