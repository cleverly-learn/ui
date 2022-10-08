import { Faculty } from 'api/faculties/types/faculty.interface';
import { GroupBase } from 'api/groups/types/group-base.interface';

export interface GroupPreview extends GroupBase {
  id: string;
  scheduleId: string;
  name: string;
  email: string;
  faculty: Faculty;
}
