import { Role } from 'enums/role.enum';

export interface User {
  id: number;
  email: string | null;
  isRegistered: boolean;
  role: Role;
  firstName: string;
  lastName: string;
  patronymic: string;
  phone: string | null;
  telegram: string | null;
  details: string | null;
  scheduleId: string | null;
  year: number | null;
}
