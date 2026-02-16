import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  FiscalYearList,
  FiscalYearPaginator,
  FiscalYearQueryOptions,
} from "../types/fiscal-year"

export const FiscalYearService = {
  all: (params: Partial<FiscalYearQueryOptions>) => {
    return HttpClient.get<FiscalYearPaginator>(
      ApiEndpoint.fms.fiscalYear,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<FiscalYearList>(
      ApiEndpoint.fms.fiscalYearById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: FiscalYearList) =>
    HttpClient.post<FiscalYearList>(
      ApiEndpoint.fms.createFiscalYear,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: FiscalYearList) =>
    HttpClient.put<FiscalYearList>(
      ApiEndpoint.fms.updateFiscalYear,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<FiscalYearList>(
      ApiEndpoint.fms.deleteFiscalYear(id),
      EndpointType.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<FiscalYearList>(
      ApiEndpoint.fms.bulkDeleteFiscalYear,
      ids,
      EndpointType.FMS
    ),
}
