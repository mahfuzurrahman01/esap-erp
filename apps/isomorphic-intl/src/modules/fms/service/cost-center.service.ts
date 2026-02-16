import {
  CostCenterList,
  CostCenterPaginator,
  CostCenterQueryOptions,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const CostCenterService = {
  all: (params: Partial<CostCenterQueryOptions>) => {
    return HttpClient.get<CostCenterPaginator>(
      ApiEndpoint.fms.costCenter,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<CostCenterList>(
      ApiEndpoint.fms.costCenterById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: CostCenterList) =>
    HttpClient.post<CostCenterList>(
      ApiEndpoint.fms.createCostCenter,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: CostCenterList) =>
    HttpClient.put<CostCenterList>(
      ApiEndpoint.fms.updateCostCenter,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<CostCenterList>(
      ApiEndpoint.fms.deleteCostCenter(id),
      ApiBase.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<CostCenterList>(
      ApiEndpoint.fms.bulkCostCenter,
      ids,
      ApiBase.FMS
    ),
}
