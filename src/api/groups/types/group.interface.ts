import { Faculty } from 'api/faculties/types/faculty.interface';

export interface Group {
  id: string;
  scheduleId: string;
  name: string;
  email: string;
  faculty: Faculty;
}
