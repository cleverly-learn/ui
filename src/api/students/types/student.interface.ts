import { GroupBase } from 'api/groups/types/group-base.interface';
import { StudentBase } from 'api/students/types/student-base.interface';

export interface Student extends StudentBase {
  group: GroupBase;
}
