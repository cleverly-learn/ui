import { useQuery } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export const USE_CURRENT_USER_KEYS = ['currentUser'];

export const useCurrentUser = () =>
  useQuery(USE_CURRENT_USER_KEYS, () => usersApiService.getCurrentUser(), {
    enabled: Boolean(localStorage.accessToken),
    staleTime: Infinity,
  });
