import { USE_CURRENT_USER_KEYS } from 'hooks/queries/use-current-user';
import { User } from 'api/users/types/user.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: { firstName: string; lastName: string; patronymic: string }) =>
      usersApiService.patchCurrentUser(payload),
    {
      onSuccess: (patchedValues) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        const oldUser = queryClient.getQueryData<User>(USE_CURRENT_USER_KEYS);

        queryClient.setQueryData(USE_CURRENT_USER_KEYS, {
          ...oldUser,
          ...patchedValues,
        });
      },
    },
  );
};
