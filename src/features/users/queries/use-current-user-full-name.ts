import { useCurrentUser } from 'features/users/queries/use-current-user';

export function useCurrentUserFullName(): string | null {
  const { data } = useCurrentUser();

  return data ? `${data.lastName} ${data.firstName} ${data.patronymic}` : null;
}
