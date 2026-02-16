import {
  CostCenterList,
  CostCenterPaginator,
  CostCenterQueryOptions,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

export const CostCenterService = {
  all: (params: Partial<CostCenterQueryOptions>) => {
    return HttpClient.get<CostCenterPaginator>(
      ApiEndpoint.fms.costCenter,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<CostCenterList>(
      ApiEndpoint.fms.costCenterById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: CostCenterList) =>
    HttpClient.post<CostCenterList>(
      ApiEndpoint.fms.createCostCenter,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: CostCenterList) =>
    HttpClient.put<CostCenterList>(
      ApiEndpoint.fms.updateCostCenter,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<CostCenterList>(
      ApiEndpoint.fms.deleteCostCenter(id),
      EndpointType.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<CostCenterList>(
      ApiEndpoint.fms.bulkCostCenter,
      ids,
      EndpointType.FMS
    ),
}
