import {
  CountryList,
  CountryPaginator,
  CountryQueryOptions,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const CountryService = {
  all: (params: Partial<CountryQueryOptions>) => {
    return HttpClient.get<CountryPaginator>(
      ApiEndpoint.fms.country,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<CountryList>(ApiEndpoint.fms.countryById(id), ApiBase.FMS),
  create: (input: CountryList) =>
    HttpClient.post<CountryList>(
      ApiEndpoint.fms.createCountry,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: CountryList) =>
    HttpClient.put<CountryList>(
      ApiEndpoint.fms.updateCountry,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<CountryList>(
      ApiEndpoint.fms.deleteCountry(id),
      ApiBase.FMS
    ),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete<CountryList>(
      ApiEndpoint.fms.bulkDeleteCountry,
      ids,
      ApiBase.FMS
    ),
}
