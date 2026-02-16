import { ApiEndpoint } from "@/server/client"
import {
  Saudization,
  SaudizationConfiguration,
  SaudizationQueryOptions,
} from "@/types/hrms/saudization/saudization-type"
import httpClient from "@/utils/axios"

export const SaudizationService = {
  all: (params: Partial<SaudizationQueryOptions>) => {
    return httpClient.get<Saudization>(ApiEndpoint.hr.fetchCompliance, params)
  },
  create: (data: SaudizationConfiguration) => {
    return httpClient.post<SaudizationConfiguration>(
      ApiEndpoint.hr.sendEmail,
      data
    )
  },
}
