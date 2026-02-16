import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

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
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<TaxTemplateList>(ApiEndpoint.fms.taxTemplateById(id), undefined,
  EndpointType.FMS),
  create: (input: TaxTemplateList) =>
    HttpClient.post<TaxTemplateList>(ApiEndpoint.fms.createTaxTemplate, input, false,
      EndpointType.FMS),
  update: (id: number, input: TaxTemplateList) =>
    HttpClient.put<TaxTemplateList>(
      ApiEndpoint.fms.updateTaxTemplate,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<TaxTemplateList>(ApiEndpoint.fms.deleteTaxTemplate(id), EndpointType.FMS),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<TaxTemplateList>(
      ApiEndpoint.fms.bulkTaxTemplate,
      ids,
      EndpointType.FMS
    ),
}
