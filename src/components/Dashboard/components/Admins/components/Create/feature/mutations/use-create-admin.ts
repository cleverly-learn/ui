import { ADMINS_KEY } from 'components/Dashboard/components/Admins/feature/queries/use-admins-page';
import { Role } from 'enums/role.enum';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export function useCreateAdmin() {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: {
      firstName: string;
      lastName: string;
      patronymic: string;
      password: string;
    }) =>
      usersApiService.create({
        ...payload,
        role: Role.ADMIN,
        isRegistered: true,
      }),
    {
      onSuccess: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        queryClient.invalidateQueries([ADMINS_KEY]);
      },
    },
  );
}
