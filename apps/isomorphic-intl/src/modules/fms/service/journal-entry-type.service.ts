import {
  JournalEntryType,
  JournalEntryTypePaginator,
  JournalEntryTypeQueryOptions,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const journalEntryType = {
  all: (params: Partial<JournalEntryTypeQueryOptions>) => {
    return HttpClient.get<JournalEntryTypePaginator>(
      ApiEndpoint.fms.journalEntryType,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<JournalEntryType>(
      ApiEndpoint.fms.journalEntryTypeById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: JournalEntryType) =>
    HttpClient.post<JournalEntryType>(
      ApiEndpoint.fms.createJournalEntryType,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: JournalEntryType) =>
    HttpClient.put<JournalEntryType>(
      ApiEndpoint.fms.updateJournalEntryType,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<JournalEntryType>(
      ApiEndpoint.fms.deleteJournalEntryType(id),
      ApiBase.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<JournalEntryType>(
      ApiEndpoint.fms.bulkJournalEntryType,
      ids,
      ApiBase.FMS
    ),
}
