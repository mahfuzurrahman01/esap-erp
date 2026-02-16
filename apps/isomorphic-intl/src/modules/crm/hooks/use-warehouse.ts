import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query"

import { warehouse } from "@/modules/crm/service/warehouse.service"
import {
  WarehousePaginator,
  WarehouseQueryOptions,
} from "@/modules/crm/types/warehouse"

export function useWarehouseList(options?: Partial<WarehouseQueryOptions>) {
  const { data, isLoading, isError, isFetching } = useInfiniteQuery<
    WarehousePaginator,
    Error
  >({
    queryKey: ["warehouse-list", options],
    queryFn: ({ queryKey, pageParam }) => {
      return warehouse.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    throwOnError: false,
    getNextPageParam: ({ current_page, last_page }) =>
      last_page > current_page && { page: current_page + 1 },
    initialPageParam: 1,
  })

  const warehouses: any = data?.pages[0]?.data || []
  const totalEntries = data?.pages[0]?.count || 0
  const per_page: any = data?.pages[0]?.pageSize || 20
  const totalPages = Math.ceil(totalEntries / per_page)

  return {
    warehouses,
    totalEntries,
    totalPages,
    isLoading,
    error: isError,
    isFetching,
  }
}
