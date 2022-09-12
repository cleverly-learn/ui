import { useMutation } from '@tanstack/react-query';
import { usersApiService } from 'api/users/users.api.service';

export const useChangePassword = () =>
  useMutation((password: string) =>
    usersApiService.patchCurrentUser({ password }),
  );
