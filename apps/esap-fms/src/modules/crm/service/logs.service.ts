import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"
import { LogsPaginator, LogsQueryOptions } from "../types/logs"

export const logs = {
  all: (params: Partial<LogsQueryOptions>) =>
    httpClient.get<LogsPaginator>(ApiEndpoint.crm.logs, params),
}
