import { isPositive } from 'utils/number/is-positive';
import { useQuery } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export const useUser = (id: number) =>
  useQuery(['user'], () => usersApiService.get(id), {
    enabled: isPositive(id),
  });
