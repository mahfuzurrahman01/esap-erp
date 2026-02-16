import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  ModeOfPaymentList,
  ModeOfPaymentPaginator,
  ModeOfPaymentQueryOptions,
} from "../types"

export const ModeOfPaymentService = {
  all: (params: Partial<ModeOfPaymentQueryOptions>) => {
    return HttpClient.get<ModeOfPaymentPaginator>(
      ApiEndpoint.fms.modeOfPayment,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<ModeOfPaymentList>(ApiEndpoint.fms.modeOfPaymentById(id), 
    undefined,
    EndpointType.FMS
  ),
  create: (input: ModeOfPaymentList) =>
    HttpClient.post<ModeOfPaymentList>(
      ApiEndpoint.fms.createModeOfPayment,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: ModeOfPaymentList) =>
    HttpClient.put<ModeOfPaymentList>(
      ApiEndpoint.fms.updateModeOfPayment,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<ModeOfPaymentList>(
      ApiEndpoint.fms.deleteModeOfPayment(id),
      EndpointType.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<ModeOfPaymentList>(
      ApiEndpoint.fms.bulkModeOfPayment,
      ids,
      EndpointType.FMS
    ),
}
