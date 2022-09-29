import { GROUPS_KEY } from 'components/Dashboard/components/Groups/feature/queries/use-groups-page';
import { groupsApiService } from 'api/groups/groups.api.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSynchronizeGroups() {
  const queryClient = useQueryClient();

  return useMutation(() => groupsApiService.synchronize(), {
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries([GROUPS_KEY]);
    },
  });
}
