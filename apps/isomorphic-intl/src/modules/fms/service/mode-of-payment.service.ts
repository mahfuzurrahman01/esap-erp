import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

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
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<ModeOfPaymentList>(
      ApiEndpoint.fms.modeOfPaymentById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: ModeOfPaymentList) =>
    HttpClient.post<ModeOfPaymentList>(
      ApiEndpoint.fms.createModeOfPayment,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: ModeOfPaymentList) =>
    HttpClient.put<ModeOfPaymentList>(
      ApiEndpoint.fms.updateModeOfPayment,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<ModeOfPaymentList>(
      ApiEndpoint.fms.deleteModeOfPayment(id),
      ApiBase.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<ModeOfPaymentList>(
      ApiEndpoint.fms.bulkModeOfPayment,
      ids,
      ApiBase.FMS
    ),
}
