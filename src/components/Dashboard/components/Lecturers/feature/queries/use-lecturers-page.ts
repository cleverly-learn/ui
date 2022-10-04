import { Pageable } from 'types/pageable.interface';
import { Role } from 'enums/role.enum';
import { useQuery } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export const LECTURERS_KEY = 'lecturers';

export const getLecturersKeys = ({ page, size }: Required<Pageable>) => [
  LECTURERS_KEY,
  size,
  page,
];

export const useLecturersPage = (pageable: Required<Pageable>) =>
  useQuery(
    getLecturersKeys(pageable),
    () => usersApiService.getAll({ role: Role.LECTURER, ...pageable }),
    {
      staleTime: Infinity,
    },
  );
