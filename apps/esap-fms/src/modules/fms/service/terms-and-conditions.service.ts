import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

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
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<TermsAndConditionsList>(
      ApiEndpoint.fms.termsAndConditionsById(id), undefined,
      EndpointType.FMS,
    ),
  create: (input: TermsAndConditionsList) =>
    HttpClient.post<TermsAndConditionsList>(
      ApiEndpoint.fms.createTermsAndConditions,
      input,
      false,
      EndpointType.FMS,
    ),
  update: (id: number, input: TermsAndConditionsList) =>
    HttpClient.put<TermsAndConditionsList>(
      ApiEndpoint.fms.updateTermsAndConditions,
      input,
      false,
      EndpointType.FMS,
    ),
  delete: (id: number) =>
    HttpClient.delete<TermsAndConditionsList>(
      ApiEndpoint.fms.deleteTermsAndConditions(id), EndpointType.FMS
    ),
  bulk: (input: number[]) =>
    HttpClient.bulkDelete<TermsAndConditionsList>(
      ApiEndpoint.fms.bulkTermsAndConditions,
      input,
      EndpointType.FMS
    ),
}
