import { COURSES_KEY } from 'components/Dashboard/components/Courses/feature/queries/use-courses';
import { CoursePreview } from 'api/courses/types/course-preview.interface';
import { coursesApiService } from 'api/courses/courses.api.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: { name: string; groupsIds: number[]; withClassroom: boolean }) =>
      coursesApiService.create(payload),
    {
      onSuccess: (newCourse) => {
        const courses = queryClient.getQueryData<CoursePreview[]>([
          COURSES_KEY,
        ]);
        if (courses) {
          queryClient.setQueryData([COURSES_KEY], [...courses, newCourse]);
        }
      },
    },
  );
}
