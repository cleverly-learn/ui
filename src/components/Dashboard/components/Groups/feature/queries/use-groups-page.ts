import { Pageable } from 'types/pageable.interface';
import { groupsApiService } from 'api/groups/groups.api.service';
import { useQuery } from '@tanstack/react-query';

export const GROUPS_KEY = 'groups_pages';

const getGroupsKeys = ({ page, size }: Required<Pageable>) => [
  GROUPS_KEY,
  size,
  page,
];

export const useGroupsPage = (pageable: Required<Pageable>) =>
  useQuery(getGroupsKeys(pageable), () => groupsApiService.getAll(pageable), {
    staleTime: Infinity,
  });
