import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  TaxRuleList,
  TaxRulePaginator,
  TaxRuleQueryOptions,
} from "../types/tax-rule"

export const TaxRuleService = {
  all: (params: Partial<TaxRuleQueryOptions>) => {
    return HttpClient.get<TaxRulePaginator>(ApiEndpoint.fms.taxRule, params, EndpointType.FMS)
  },
  get: (id: number) =>
    HttpClient.get<TaxRuleList>(ApiEndpoint.fms.taxRuleById(id), undefined,
  EndpointType.FMS),
  create: (input: TaxRuleList) =>
    HttpClient.post<TaxRuleList>(ApiEndpoint.fms.createTaxRule, input, false,
      EndpointType.FMS),
  update: (id: number, input: TaxRuleList) =>
    HttpClient.put<TaxRuleList>(ApiEndpoint.fms.updateTaxRule, input, false,
  EndpointType.FMS),
  delete: (id: number) => HttpClient.delete(ApiEndpoint.fms.deleteTaxRule(id), EndpointType.FMS),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<TaxRuleList>(ApiEndpoint.fms.bulkTaxRule, ids, EndpointType.FMS),
}
