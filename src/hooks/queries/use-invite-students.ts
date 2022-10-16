import { coursesApiService } from 'api/courses/courses.api.service';
import { useMutation } from '@tanstack/react-query';

export const useInviteStudents = () =>
  useMutation((courseId: number) => coursesApiService.inviteStudents(courseId));
