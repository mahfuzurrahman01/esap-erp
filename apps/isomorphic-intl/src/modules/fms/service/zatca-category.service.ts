import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

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
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<ZatcaCategoryList>(
      ApiEndpoint.fms.zatcaCategoryById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: ZatcaCategoryList) =>
    HttpClient.post<ZatcaCategoryList>(
      ApiEndpoint.fms.createZatcaCategory,
      input,
      false,
      ApiBase.FMS
    ),
  update: (id: number, input: ZatcaCategoryList) =>
    HttpClient.put<ZatcaCategoryList>(
      ApiEndpoint.fms.updateZatcaCategory,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<ZatcaCategoryList>(
      ApiEndpoint.fms.deleteZatcaCategory(id),
      ApiBase.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<ZatcaCategoryList>(
      ApiEndpoint.fms.bulkZatcaCategory,
      ids,
      ApiBase.FMS
    ),
}
