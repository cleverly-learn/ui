export function getFullName({
  lastName,
  firstName,
  patronymic,
}: {
  lastName: string;
  firstName: string;
  patronymic: string;
}): string {
  return `${lastName} ${firstName} ${patronymic}`;
}
