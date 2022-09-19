import { useQuery } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export const CURRENT_USER_KEYS = ['currentUser'];

export const useCurrentUser = () =>
  useQuery(CURRENT_USER_KEYS, () => usersApiService.getCurrentUser(), {
    enabled: Boolean(localStorage.accessToken),
    staleTime: Infinity,
  });
