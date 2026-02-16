import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  BankReconciliation,
  BankReconciliationQueryOptions,
  ReconciliationUpdatePayload,
  UnreconciledPayment,
  UnreconciledPaymentQueryOptions,
} from "../types"

export const BankReconciliationService = {
  all: (query?: BankReconciliationQueryOptions) => {
    const params = new URLSearchParams()
    if (query?.companyId) params.append("companyId", query.companyId.toString())
    if (query?.bankAccountId)
      params.append("bankAccountId", query.bankAccountId.toString())
    if (query?.fromDate) params.append("fromDate", query.fromDate)
    if (query?.toDate) params.append("toDate", query.toDate)

    return HttpClient.get<BankReconciliation>(
      `${ApiEndpoint.fms.bankReconciliation}?${params.toString()}`,
      undefined,
      ApiBase.FMS
    )
  },

  update: (id: number, data: ReconciliationUpdatePayload[]) => {
    return HttpClient.put<void>(
      `${ApiEndpoint.fms.updateReconciliation(id)}`,
      data,
      false,
      ApiBase.FMS
    )
  },

  getUnreconciledPayments: (query: UnreconciledPaymentQueryOptions) => {
    const params = new URLSearchParams()
    params.append("companyId", query.companyId.toString())
    params.append("companyBankAccountId", query.companyBankAccountId.toString())

    return HttpClient.get<UnreconciledPayment[]>(
      `${ApiEndpoint.fms.bankUnreconciledPayment}?${params.toString()}`,
      undefined,
      ApiBase.FMS
    )
  },
}
