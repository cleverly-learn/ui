import { Page } from 'types/page.interface';
import { Pageable } from 'types/pageable.interface';
import { User } from 'api/users/types/user.interface';
import { getAdminsKeys } from 'components/Dashboard/components/Admins/feature/queries/use-admins-page';
import { isUndefined } from 'utils/is-undefined';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export function useEditAdmin(pageable: Required<Pageable>) {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      id,
      ...payload
    }: {
      id: number;
      firstName: string;
      lastName: string;
      patronymic: string;
      password?: string;
    }) => usersApiService.patch(id, payload),
    {
      onSuccess: (patchedValues) => {
        const adminsPageKeys = getAdminsKeys(pageable);
        const oldAdminsPage =
          queryClient.getQueryData<Page<User>>(adminsPageKeys);

        if (isUndefined(oldAdminsPage)) {
          return;
        }

        const newAdmins = oldAdminsPage.data.map((admin) =>
          admin.id === patchedValues.id
            ? { ...admin, ...patchedValues }
            : admin,
        );

        queryClient.setQueryData(adminsPageKeys, {
          ...oldAdminsPage,
          data: newAdmins,
        });
      },
    },
  );
}
