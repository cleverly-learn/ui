import { CURRENT_USER_KEYS } from 'hooks/queries/use-current-user';
import { User } from 'api/users/types/user.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export function useConnectGoogle() {
  const queryClient = useQueryClient();

  return useMutation((code: string) => usersApiService.connectGoogle(code), {
    onSuccess: (email) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      const oldUser = queryClient.getQueryData<User>(CURRENT_USER_KEYS);

      queryClient.setQueryData(CURRENT_USER_KEYS, {
        ...oldUser,
        email,
      });
    },
  });
}
