"use client"
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query"
import { createQueryKeys } from "@/server/service/query-config"
import { BankStatementReportPaginator, BankStatementReportQueryOptions } from "../types/bank-statement-report"
import { bankStatementReportService } from "../service/bank-statement-report.service"

const BANK_STATEMENT_REPORT = createQueryKeys("bankStatementReport")

export function useBankStatementReportList(options?: Partial<BankStatementReportQueryOptions>) {
  const queryKey = [BANK_STATEMENT_REPORT.all, options]

  return useQuery<BankStatementReportPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return bankStatementReportService.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
