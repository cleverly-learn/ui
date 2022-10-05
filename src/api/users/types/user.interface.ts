import { Role } from 'enums/role.enum';

export interface User {
  id: number;
  login: string;
  email: string;
  isRegistered: boolean;
  role: Role;
  firstName: string;
  lastName: string;
  patronymic: string;
  phone: string;
  telegram: string;
  details: string;
  scheduleId?: string;
}
