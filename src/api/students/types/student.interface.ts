import { GroupBase } from 'api/groups/types/group-base.interface';

export interface Student {
  id: number;
  email: string;
  isRegistered: boolean;
  firstName: string;
  lastName: string;
  patronymic: string;
  phone: string;
  telegram: string;
  details: string;
  group: GroupBase;
}
