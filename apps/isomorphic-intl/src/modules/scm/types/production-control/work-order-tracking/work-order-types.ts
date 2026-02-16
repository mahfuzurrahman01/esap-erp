import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface WorkOrderDetails {
  productId?: number
  productName?: string
  machineId?: number
  machineName?: string
  employeeId?: number
  employeeName?: string
  startTime?: string
  endTime?: string
  productivity?: string
}

export interface WorkOrder {
  id?: number
  billOfMaterialId?: number
  materialRequirementPlanId?: number
  productId?: number
  productName?: string
  workCenterId?: number
  workCenterName?: string
  workOrderName?: string
  quantity?: number
  assignedToId?: number
  assignedToName?: string
  estCompletionStart?: string
  estCompletionEnd?: string
  expectedDuration?: number
  workProgress?: string
  jobDescription?: string
  workOrderDetails?: WorkOrderDetails[]
}

export interface WorkOrderQueryOptions extends QueryOptions {
  workOrder?: string
  workCenter?: string
  productName?: string
  assignedTo?: string
  progressStatus?: string
}

export type WorkOrderPaginator = PaginatedResponse<WorkOrder>
