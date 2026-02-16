import { ApiEndpoint } from "@/server/client"
import {
  WorkAddress,
  WorkAddressDataResponse,
  WorkAddressQueryOptions,
} from "@/types/hrms/employee/work-address.types"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const WorkAddressService = {
  all: (params: Partial<WorkAddressQueryOptions>) => {
    return HttpClient.get<WorkAddressDataResponse>(
      ApiEndpoint.hr.fetchAllWorkAddresses,
      params,
      ApiBase.HRMS
    )
    
  },
  get: (id: number) =>
    HttpClient.get<WorkAddress>(`${ApiEndpoint.hr.fetchWorkAddressById(id)}`, false, ApiBase.HRMS),
  create: (input: WorkAddress) =>
    HttpClient.post<WorkAddress>(ApiEndpoint.hr.createWorkAddress, input, false, ApiBase.HRMS),
  update: (input: WorkAddress) =>
    HttpClient.put<WorkAddress>(`${ApiEndpoint.hr.updateWorkAddress}`, input, false, ApiBase.HRMS),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteWorkAddress(id)}`, ApiBase.HRMS),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteWorkAddresses}`, ids, ApiBase.HRMS),
}
