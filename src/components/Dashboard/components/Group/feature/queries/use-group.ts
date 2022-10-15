import { GROUPS_KEY } from 'hooks/queries/use-groups';
import { groupsApiService } from 'api/groups/groups.api.service';
import { isPositive } from 'utils/number/is-positive';
import { useQuery } from '@tanstack/react-query';

export const useGroup = (id: number) =>
  useQuery([GROUPS_KEY, id], () => groupsApiService.get(id), {
    enabled: isPositive(id),
  });
