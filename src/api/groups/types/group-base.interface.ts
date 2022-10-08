import { Faculty } from 'api/faculties/types/faculty.interface';

export interface GroupBase {
  id: string;
  scheduleId: string;
  name: string;
  email: string;
  faculty: Faculty;
}
