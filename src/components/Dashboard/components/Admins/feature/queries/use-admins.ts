import { Pageable } from 'types/pageable.interface';
import { Role } from 'enums/role.enum';
import { useAuthorizedQuery } from 'hooks/use-authorized-query';
import { usersApiService } from 'api/users/users.api.service';

export const ADMINS_KEY = 'admins';

const getUseAdminsKeys = ({ page, size }: Required<Pageable>) => [
  ADMINS_KEY,
  size,
  page,
];

export const useAdminsPage = (pageable: Required<Pageable>) =>
  useAuthorizedQuery(
    getUseAdminsKeys(pageable),
    () => usersApiService.getAll({ role: Role.ADMIN, ...pageable }),
    {
      staleTime: Infinity,
    },
  );
