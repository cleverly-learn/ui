import { GroupBase } from 'api/groups/types/group-base.interface';
import { Role } from 'enums/role.enum';
import { UserBase } from 'api/users/types/user-base.interface';

export interface User extends UserBase {
  role: Role;
  scheduleId?: string;
  group?: GroupBase;
}
