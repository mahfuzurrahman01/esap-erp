import {
  JournalEntryList,
  JournalEntryPaginator,
  JournalEntryQueryOptions,
  JournalEntryView,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const JournalEntryService = {
  all: (params: Partial<JournalEntryQueryOptions>) => {
    return HttpClient.get<JournalEntryPaginator>(
      ApiEndpoint.fms.journalEntry,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<JournalEntryView>(
      ApiEndpoint.fms.journalEntryById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: JournalEntryList) =>
    HttpClient.post<JournalEntryList>(
      ApiEndpoint.fms.createJournalEntry,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: JournalEntryList) =>
    HttpClient.put<JournalEntryList>(
      ApiEndpoint.fms.updateJournalEntry,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<JournalEntryList>(
      ApiEndpoint.fms.deleteJournalEntry(id),
      ApiBase.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<JournalEntryList>(
      ApiEndpoint.fms.bulkDeleteJournalEntry,
      ids,
      ApiBase.FMS
    ),
}
