import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  ZatcaCategoryList,
  ZatcaCategoryPaginator,
  ZatcaCategoryQueryOptions,
} from "../types/zatca-category"

export const ZatcaCategoryService = {
  all: (params: Partial<ZatcaCategoryQueryOptions>) => {
    return HttpClient.get<ZatcaCategoryPaginator>(
      ApiEndpoint.fms.zatcaCategory,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<ZatcaCategoryList>(ApiEndpoint.fms.zatcaCategoryById(id), undefined,
  EndpointType.FMS),
  create: (input: ZatcaCategoryList) =>
    HttpClient.post<ZatcaCategoryList>(
      ApiEndpoint.fms.createZatcaCategory,
      input, false,
      EndpointType.FMS
    ),
  update: (id: number, input: ZatcaCategoryList) =>
    HttpClient.put<ZatcaCategoryList>(
      ApiEndpoint.fms.updateZatcaCategory,
      input, false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<ZatcaCategoryList>(
      ApiEndpoint.fms.deleteZatcaCategory(id), EndpointType.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<ZatcaCategoryList>(
      ApiEndpoint.fms.bulkZatcaCategory,
      ids,
      EndpointType.FMS
    ),
}
