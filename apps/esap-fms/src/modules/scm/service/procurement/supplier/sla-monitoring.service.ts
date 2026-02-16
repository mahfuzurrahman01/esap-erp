import { ServiceLevelAgreementMonitoring } from "@/modules/scm/types/procurement/supplier/service-level-agreement-monitoring-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const SLAMonitoringService = {
  all: (params?: Partial<any>) => {
    return HttpClient.get<ServiceLevelAgreementMonitoring[]>(
      ApiEndpoint.scm.getAllServiceLevelAgreement,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<ServiceLevelAgreementMonitoring>(
      ApiEndpoint.scm.getServiceLevelAgreementById(id)
    ),
  create: (input: ServiceLevelAgreementMonitoring) =>
    HttpClient.post<ServiceLevelAgreementMonitoring>(
      ApiEndpoint.scm.createServiceLevelAgreement,
      input
    ),
  update: (input: ServiceLevelAgreementMonitoring) =>
    HttpClient.put<ServiceLevelAgreementMonitoring>(
      ApiEndpoint.scm.updateServiceLevelAgreement,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteServiceLevelAgreement(id)),
}
