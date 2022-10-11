import { CURRENT_USER_KEYS } from 'hooks/queries/use-current-user';
import { User } from 'api/users/types/user.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export function useCompleteRegistration() {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: {
      firstName: string;
      lastName: string;
      patronymic: string;
      phone?: string;
      telegram: string;
      details: string;
      password: string;
    }) => usersApiService.patchCurrentUser({ ...payload, isRegistered: true }),
    {
      onSuccess: (patchedValues) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        const oldUser = queryClient.getQueryData<User>(CURRENT_USER_KEYS);

        queryClient.setQueryData(CURRENT_USER_KEYS, {
          ...oldUser,
          ...patchedValues,
        });
      },
    },
  );
}
