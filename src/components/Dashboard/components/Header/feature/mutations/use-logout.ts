import { authApiService } from 'api/auth/auth.api.service';
import { localStorage } from 'utils/local-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(
    () =>
      authApiService.revokeRefreshToken({
        refreshToken: localStorage.refreshToken ?? '',
      }),
    {
      onSuccess: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        queryClient.invalidateQueries();

        localStorage.accessToken = null;
        localStorage.refreshToken = null;
      },
    },
  );
};
