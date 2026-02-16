import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { CountryService } from "@/modules/fms/service/country.service"
import { CountryPaginator, CountryQueryOptions } from "@/modules/fms/types"
import { createQueryKeys } from "@/server/service/query-config"

export const COUNTRY_KEYS = createQueryKeys("country")

export function useCountryList(options?: Partial<CountryQueryOptions>) {
  const queryKey = [COUNTRY_KEYS.all, options]

  return useQuery<CountryPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return CountryService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}
