import { authApiService } from 'api/auth/auth.api.service';
import { localStorage } from 'utils/local-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: { login: string; password: string }) =>
      authApiService.login(payload),
    {
      onSuccess: ({ accessToken, refreshToken }) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        queryClient.invalidateQueries();

        localStorage.accessToken = accessToken;
        localStorage.refreshToken = refreshToken;
      },
    },
  );
};
