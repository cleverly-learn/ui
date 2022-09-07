import { USE_CURRENT_USER_KEYS } from 'features/users/queries/use-current-user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: { firstName: string; lastName: string; patronymic: string }) =>
      usersApiService.patchCurrentUser(payload),
    {
      onSuccess: (user) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        queryClient.setQueryData(USE_CURRENT_USER_KEYS, user);
      },
    },
  );
};
