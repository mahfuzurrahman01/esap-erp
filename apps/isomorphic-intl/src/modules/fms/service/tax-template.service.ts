import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  TaxTemplateList,
  TaxTemplatePaginator,
  TaxTemplateQueryOptions,
} from "../types"

export const TaxTemplateService = {
  all: (params: Partial<TaxTemplateQueryOptions>) => {
    return HttpClient.get<TaxTemplatePaginator>(
      ApiEndpoint.fms.taxTemplate,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<TaxTemplateList>(
      ApiEndpoint.fms.taxTemplateById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: TaxTemplateList) =>
    HttpClient.post<TaxTemplateList>(
      ApiEndpoint.fms.createTaxTemplate,
      input,
      false,
      ApiBase.FMS
    ),
  update: (id: number, input: TaxTemplateList) =>
    HttpClient.put<TaxTemplateList>(
      ApiEndpoint.fms.updateTaxTemplate,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<TaxTemplateList>(
      ApiEndpoint.fms.deleteTaxTemplate(id),
      ApiBase.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<TaxTemplateList>(
      ApiEndpoint.fms.bulkTaxTemplate,
      ids,
      ApiBase.FMS
    ),
}
