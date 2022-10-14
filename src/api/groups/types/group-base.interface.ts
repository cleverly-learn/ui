import { Faculty } from 'api/faculties/types/faculty.interface';

export interface GroupBase {
  id: number;
  scheduleId: string;
  name: string;
  email: string;
  faculty: Faculty;
}
