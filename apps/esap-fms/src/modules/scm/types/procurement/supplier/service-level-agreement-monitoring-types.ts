import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface SlaMonitoringInput {
  id?: number
  supplierContractInfoId?: number
  auditName?: string
  expectedPerformance?: string
  actualPerformance?: string
  status?: string
  auditDate?: string
  comments?: string
}

export interface ServiceLevelAgreementMonitoring {
  id?: number
  supplierContractInfoId?: number
  auditName?: string
  expectedPerformance?: string
  actualPerformance?: string
  status?: string
  auditDate?: string
  comments?: string
  createdBy?: string
  createdDate?: Date
  updatedBy?: string
  updatedDate?: Date
}

export interface ServiceLevelAgreementMonitoringQueryOptions
  extends QueryOptions {}

export type ServiceLevelAgreementMonitoringPaginator =
  PaginatedResponse<ServiceLevelAgreementMonitoring>
