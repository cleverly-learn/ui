import { coursesApiService } from 'api/courses/courses.api.service';
import { useMutation } from '@tanstack/react-query';

export const useCreateCourse = () =>
  useMutation(
    (payload: { name: string; groupsIds: number[]; withClassroom: boolean }) =>
      coursesApiService.create(payload),
  );
