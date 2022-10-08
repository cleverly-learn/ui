import { groupsApiService } from 'api/groups/groups.api.service';
import { isNotUndefined } from 'utils/is-not-undefined';
import { isPositive } from 'utils/number/is-positive';
import { useQuery } from '@tanstack/react-query';

const GROUPS_KEY = 'students_groups';

const getGroupsKeys = ({ facultyId }: { facultyId?: number }) => [
  GROUPS_KEY,
  facultyId,
];

export const useGroups = (params: { facultyId?: number }) =>
  useQuery(
    getGroupsKeys(params),
    () => groupsApiService.getAll(params).then(({ data }) => data),
    {
      staleTime: Infinity,
      enabled: isNotUndefined(params.facultyId) && isPositive(params.facultyId),
    },
  );
