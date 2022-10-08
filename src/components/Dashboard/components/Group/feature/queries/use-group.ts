import { groupsApiService } from 'api/groups/groups.api.service';
import { isPositive } from 'utils/number/is-positive';
import { useQuery } from '@tanstack/react-query';

export const useGroup = (id: number) =>
  useQuery(['gropus', id], () => groupsApiService.get(id), {
    enabled: isPositive(id),
  });
