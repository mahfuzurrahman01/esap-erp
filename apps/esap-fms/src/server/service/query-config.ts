import {
  QueryKey,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query"

// Define a generic type for our query options
export type DefaultQueryOptions<
  TData = unknown,
  TError = Error,
  TQueryFnData = TData,
> = Omit<
  UseQueryOptions<TData, TError, TQueryFnData, QueryKey>,
  "queryKey" | "queryFn"
>

// Default options for general queries
export const DEFAULT_QUERY_OPTIONS: DefaultQueryOptions = {
  gcTime: 10 * 60 * 1000, // 10 minutes
  staleTime: 5 * 60 * 1000, // 5 minutes
}

// Default options for list-type queries with placeholder data
export const DEFAULT_LIST_OPTIONS: DefaultQueryOptions = {
  ...DEFAULT_QUERY_OPTIONS,
  placeholderData: keepPreviousData,
}

// Helper function to create query keys
export function createQueryKeys(baseKey: string) {
  return {
    all: [baseKey] as const,
    list: (params?: {
      pageIndex?: number
      pageSize?: number
      orderBy?: string
      sortedBy?: string
    }) => [...createQueryKeys(baseKey).all, "list", params] as const,
    detail: (id: number) =>
      [...createQueryKeys(baseKey).all, "detail", id] as const,
  }
}

export const REAL_TIME_OPTIONS: DefaultQueryOptions = {
  ...DEFAULT_QUERY_OPTIONS,
  gcTime: 1 * 60 * 1000, // 1 minute
  staleTime: 5 * 1000, // 5 seconds
}

export const STATIC_DATA_OPTIONS: DefaultQueryOptions = {
  ...DEFAULT_QUERY_OPTIONS,
  gcTime: 30 * 60 * 1000, // 30 minutes
  staleTime: 15 * 60 * 1000, // 15 minutes
}
