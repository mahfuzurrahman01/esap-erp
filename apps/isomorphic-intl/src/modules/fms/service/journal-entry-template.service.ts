import {
  JournalEntryQueryOptions,
  JournalTemplate,
  JournalTemplatePaginator,
  JournalTemplateView,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const journalEntryTemplate = {
  all: (params: Partial<JournalEntryQueryOptions>) => {
    return HttpClient.get<JournalTemplatePaginator>(
      ApiEndpoint.fms.journalEntryTemplate,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<JournalTemplateView>(
      ApiEndpoint.fms.journalEntryTemplateById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: JournalTemplate) =>
    HttpClient.post<JournalTemplate>(
      ApiEndpoint.fms.createJournalTemplate,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: JournalTemplate) =>
    HttpClient.put<JournalTemplate>(
      ApiEndpoint.fms.updateJournalTemplate,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<JournalTemplate>(
      ApiEndpoint.fms.deleteJournalTemplate(id),
      ApiBase.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<JournalTemplate>(
      ApiEndpoint.fms.bulkDeleteJournalTemplate,
      ids,
      ApiBase.FMS
    ),
}
