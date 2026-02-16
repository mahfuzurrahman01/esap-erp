import {
  CountryList,
  CountryPaginator,
  CountryQueryOptions,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

export const CountryService = {
  all: (params: Partial<CountryQueryOptions>) => {
    return HttpClient.get<CountryPaginator>(
      ApiEndpoint.fms.country,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<CountryList>(
      ApiEndpoint.fms.countryById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: CountryList) =>
    HttpClient.post<CountryList>(
      ApiEndpoint.fms.createCountry,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: CountryList) =>
    HttpClient.put<CountryList>(
      ApiEndpoint.fms.updateCountry,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<CountryList>(
      ApiEndpoint.fms.deleteCountry(id),
      EndpointType.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<CountryList>(
      ApiEndpoint.fms.bulkDeleteCountry,
      ids,
      EndpointType.FMS
    ),
}
