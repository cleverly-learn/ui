import { ADMINS_KEY } from 'components/Dashboard/components/Admins/feature/queries/use-admins-page';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation((id: number) => usersApiService.delete(id), {
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries([ADMINS_KEY]);
    },
  });
}
