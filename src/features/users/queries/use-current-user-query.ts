import { useQuery } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export const USE_CURRENT_USER_QUERY_KEYS = ['currentUser'];

export const useCurrentUserQuery = () =>
  useQuery(
    USE_CURRENT_USER_QUERY_KEYS,
    () => usersApiService.getCurrentUser(),
    { enabled: Boolean(localStorage.accessToken) },
  );
