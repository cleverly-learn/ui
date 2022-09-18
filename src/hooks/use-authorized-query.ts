import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { useCurrentUser } from 'hooks/queries/use-current-user';

export function useAuthorizedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<TData, TError> {
  const { isSuccess } = useCurrentUser();

  return useQuery<TQueryFnData, TError, TData, TQueryKey>(queryKey, queryFn, {
    enabled: isSuccess,
    ...options,
  });
}
