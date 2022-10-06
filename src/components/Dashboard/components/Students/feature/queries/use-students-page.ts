import { Pageable } from 'types/pageable.interface';
import { studentsApiService } from 'api/students/students.api.service';
import { useQuery } from '@tanstack/react-query';

export const STUDENTS_KEY = 'students';

export const getStudentsKeys = ({ page, size }: Required<Pageable>) => [
  STUDENTS_KEY,
  size,
  page,
];

export const useStudentsPage = (pageable: Required<Pageable>) =>
  useQuery(
    getStudentsKeys(pageable),
    () => studentsApiService.getAll(pageable),
    {
      staleTime: Infinity,
    },
  );
