import { ApiEndpoint } from "@/server/client"
import {
  WorkAddress,
  WorkAddressDataResponse,
  WorkAddressQueryOptions,
} from "@/types/hrms/employee/work-address.types"
import HttpClient from "@/utils/axios"

export const WorkAddressService = {
  all: (params: Partial<WorkAddressQueryOptions>) => {
    return HttpClient.get<WorkAddressDataResponse>(
      ApiEndpoint.hr.fetchAllWorkAddresses,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<WorkAddress>(`${ApiEndpoint.hr.fetchWorkAddressById(id)}`),
  create: (input: WorkAddress) =>
    HttpClient.post<WorkAddress>(ApiEndpoint.hr.createWorkAddress, input),
  update: (input: WorkAddress) =>
    HttpClient.put<WorkAddress>(`${ApiEndpoint.hr.updateWorkAddress}`, input),
  delete: (id: number) =>
    HttpClient.delete(`${ApiEndpoint.hr.deleteWorkAddress(id)}`),
  bulkDelete: (ids: number[]) =>
    HttpClient.bulkDelete(`${ApiEndpoint.hr.deleteWorkAddresses}`, ids),
}
