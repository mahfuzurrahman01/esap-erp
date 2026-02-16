import {
  JournalEntryQueryOptions,
  JournalTemplate,
  JournalTemplatePaginator,
  JournalTemplateView,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

export const journalEntryTemplate = {
  all: (params: Partial<JournalEntryQueryOptions>) => {
    return HttpClient.get<JournalTemplatePaginator>(
      ApiEndpoint.fms.journalEntryTemplate,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<JournalTemplateView>(
      ApiEndpoint.fms.journalEntryTemplateById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: JournalTemplate) =>
    HttpClient.post<JournalTemplate>(
      ApiEndpoint.fms.createJournalTemplate,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: JournalTemplate) =>
    HttpClient.put<JournalTemplate>(
      ApiEndpoint.fms.updateJournalTemplate,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<JournalTemplate>(
      ApiEndpoint.fms.deleteJournalTemplate(id),
      EndpointType.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<JournalTemplate>(
      ApiEndpoint.fms.bulkDeleteJournalTemplate,
      ids,
      EndpointType.FMS
    ),
}
