export interface FormData {
  firstName: string;
  lastName: string;
  patronymic: string;
  facultyId: number | string;
  groupId: number | string;
  sendInvite?: boolean;
  email?: string;
}
