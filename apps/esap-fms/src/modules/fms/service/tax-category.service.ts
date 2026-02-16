import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  TaxCategoryList,
  TaxCategoryPaginator,
  TaxCategoryQueryOptions,
} from "../types/tax-category"

export const TaxCategoryService = {
  all: (params: Partial<TaxCategoryQueryOptions>) => {
    return HttpClient.get<TaxCategoryPaginator>(
      ApiEndpoint.fms.taxCategory,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<TaxCategoryList>(ApiEndpoint.fms.taxCategoryById(id), undefined,
  EndpointType.FMS),
  create: (input: TaxCategoryList) =>
    HttpClient.post<TaxCategoryList>(ApiEndpoint.fms.createTaxCategory, input, false,
    EndpointType.FMS),
  update: (id: number, input: TaxCategoryList) =>
    HttpClient.put<TaxCategoryList>(
      ApiEndpoint.fms.updateTaxCategory,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<TaxCategoryList>(ApiEndpoint.fms.deleteTaxCategory(id), EndpointType.FMS),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<TaxCategoryList>(
      ApiEndpoint.fms.bulkTaxCategory,
      ids, 
      EndpointType.FMS
    ),
}
