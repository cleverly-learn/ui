import { Pageable } from 'types/pageable.interface';
import { Role } from 'enums/role.enum';
import { useQuery } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export const ADMINS_KEY = 'admins';

export const getAdminsKeys = ({ page, size }: Required<Pageable>) => [
  ADMINS_KEY,
  size,
  page,
];

export const useAdminsPage = (pageable: Required<Pageable>) =>
  useQuery(
    getAdminsKeys(pageable),
    () => usersApiService.getAll({ role: Role.ADMIN, ...pageable }),
    {
      staleTime: Infinity,
    },
  );
