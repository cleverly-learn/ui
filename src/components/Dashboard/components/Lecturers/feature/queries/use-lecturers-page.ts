import { Pageable } from 'types/pageable.interface';
import { lecturersApiService } from 'api/lecturers/lecturers.api.service';
import { useQuery } from '@tanstack/react-query';

export const LECTURERS_KEY = 'lecturers';

export const getLecturersKeys = ({ page, size }: Required<Pageable>) => [
  LECTURERS_KEY,
  size,
  page,
];

export const useLecturersPage = (pageable: Required<Pageable>) =>
  useQuery(
    getLecturersKeys(pageable),
    () => lecturersApiService.getAll(pageable),
    {
      staleTime: Infinity,
    },
  );
