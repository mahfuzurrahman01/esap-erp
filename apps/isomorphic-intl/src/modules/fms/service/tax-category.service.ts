import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

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
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<TaxCategoryList>(
      ApiEndpoint.fms.taxCategoryById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: TaxCategoryList) =>
    HttpClient.post<TaxCategoryList>(
      ApiEndpoint.fms.createTaxCategory,
      input,
      false,
      ApiBase.FMS
    ),
  update: (id: number, input: TaxCategoryList) =>
    HttpClient.put<TaxCategoryList>(
      ApiEndpoint.fms.updateTaxCategory,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<TaxCategoryList>(
      ApiEndpoint.fms.deleteTaxCategory(id),
      ApiBase.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<TaxCategoryList>(
      ApiEndpoint.fms.bulkTaxCategory,
      ids,
      ApiBase.FMS
    ),
}
