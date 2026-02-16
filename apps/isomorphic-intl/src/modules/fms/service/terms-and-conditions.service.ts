import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  TermsAndConditionsList,
  TermsAndConditionsPaginator,
  TermsAndConditionsQueryOptions,
} from "../types"

export const TermsAndConditionsService = {
  all: (params: Partial<TermsAndConditionsQueryOptions>) => {
    return HttpClient.get<TermsAndConditionsPaginator>(
      ApiEndpoint.fms.termsAndConditions,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<TermsAndConditionsList>(
      ApiEndpoint.fms.termsAndConditionsById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: TermsAndConditionsList) =>
    HttpClient.post<TermsAndConditionsList>(
      ApiEndpoint.fms.createTermsAndConditions,
      input,
      false,
      ApiBase.FMS
    ),
  update: (id: number, input: TermsAndConditionsList) =>
    HttpClient.put<TermsAndConditionsList>(
      ApiEndpoint.fms.updateTermsAndConditions,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<TermsAndConditionsList>(
      ApiEndpoint.fms.deleteTermsAndConditions(id),
      ApiBase.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<TermsAndConditionsList>(
      ApiEndpoint.fms.bulkTermsAndConditions,
      input,
      ApiBase.FMS
    ),
}
