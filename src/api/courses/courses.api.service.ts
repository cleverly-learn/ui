import { AuthorizedApiService } from 'api/authorized-api.service';
import { Course } from 'api/courses/types/course.interface';
import { CoursePreview } from 'api/courses/types/course-preview.interface';

class CoursesApiService extends AuthorizedApiService {
  constructor() {
    super('courses');
  }

  create(payload: {
    name: string;
    groupsIds: number[];
    withClassroom: boolean;
  }): Promise<CoursePreview> {
    return this.api.post<CoursePreview>('', payload).then(({ data }) => data);
  }

  async inviteStudents(courseId: number): Promise<void> {
    await this.api.post(`${courseId}/invite`);
  }

  getAll(params: {
    ownerUserId?: number;
    studentUserId?: number;
  }): Promise<CoursePreview[]> {
    return this.api
      .get<CoursePreview[]>('', { params })
      .then(({ data }) => data);
  }

  get(id: number): Promise<Course> {
    return this.api.get<Course>(id.toString()).then(({ data }) => data);
  }

  delete(id: number): Promise<void> {
    return this.api.delete(id.toString());
  }
}

export const coursesApiService = new CoursesApiService();
