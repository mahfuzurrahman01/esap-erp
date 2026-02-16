import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  BankStatementImport,
  BankStatementImportPaginator,
  BankStatementImportQueryOptions,
} from "../types/bank-statement-import"

export const BankTransactionImportService = {
  import: (input: BankStatementImportQueryOptions) =>
    HttpClient.get<BankStatementImportPaginator>(
      ApiEndpoint.fms.importBankStatement,
      input,
      ApiBase.FMS
    ),
  get: (id: number) =>
    HttpClient.get<BankStatementImport>(
      ApiEndpoint.fms.importBankStatementById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: BankStatementImport) =>
    HttpClient.post<BankStatementImport>(
      ApiEndpoint.fms.createImportBankStatement,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: BankStatementImport) =>
    HttpClient.put<BankStatementImport>(
      ApiEndpoint.fms.updateImportBankStatement,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<BankStatementImport>(
      ApiEndpoint.fms.deleteImportBankStatement(id),
      ApiBase.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<BankStatementImport>(
      ApiEndpoint.fms.bulkImportBankStatement,
      ids,
      ApiBase.FMS
    ),
}