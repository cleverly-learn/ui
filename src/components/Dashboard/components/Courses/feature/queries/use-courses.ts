import { coursesApiService } from 'api/courses/courses.api.service';
import { useQuery } from '@tanstack/react-query';

export const COURSES_KEY = 'courses';

export const useCourses = (params: {
  ownerUserId?: number;
  studentUserId?: number;
}) =>
  useQuery([COURSES_KEY], () => coursesApiService.getAll(params), {
    staleTime: Infinity,
    enabled: Boolean(Object.keys(params).length),
  });
