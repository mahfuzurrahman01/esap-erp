import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"
import { BankStatementReportPaginator, BankStatementReportQueryOptions } from "../types/bank-statement-report"

export const bankStatementReportService = {
  all: (params: Partial<BankStatementReportQueryOptions>) => {
    return HttpClient.get<BankStatementReportPaginator>(
      ApiEndpoint.fms.bankStatementReport,
      params,
      ApiBase.FMS
    )
  },
}
