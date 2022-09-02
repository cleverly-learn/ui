export enum Role {
  ADMIN,
  LECTURER,
  STUDENT,
}

export function isAdmin(role: Role): role is Role.ADMIN {
  return role === Role.ADMIN;
}

export function isLecturer(role: Role): role is Role.LECTURER {
  return role === Role.LECTURER;
}

export function isStudent(role: Role): role is Role.STUDENT {
  return role === Role.STUDENT;
}
