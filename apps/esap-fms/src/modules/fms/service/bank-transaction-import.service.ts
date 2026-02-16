import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

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
      EndpointType.FMS
    ),
  get: (id: number) =>
    HttpClient.get<BankStatementImport>(
      ApiEndpoint.fms.importBankStatementById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: BankStatementImport) =>
    HttpClient.post<BankStatementImport>(
      ApiEndpoint.fms.createImportBankStatement,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: BankStatementImport) =>
    HttpClient.put<BankStatementImport>(
      ApiEndpoint.fms.updateImportBankStatement,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<BankStatementImport>(
      ApiEndpoint.fms.deleteImportBankStatement(id),
      EndpointType.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<BankStatementImport>(
      ApiEndpoint.fms.bulkImportBankStatement,
      ids,
      EndpointType.FMS
    ),
}