import { WorkOrder, WorkOrderDetails } from "../types/production-control/work-order-tracking/work-order-types";

export const DEFAULT_WORK_ORDER_VALUES: WorkOrder = {
  billOfMaterialId: 0,
  materialRequirementPlanId: 0,
  productId: 0,
  workCenterId: 0,
  workOrderName: "",
  quantity: 0,
  assignedToId: 0,
  assignedToName: "",
  estCompletionStart: "",
  estCompletionEnd: "",
  expectedDuration: 0,
  workProgress: "",
  jobDescription: "",
  workOrderDetails: [],
}

export const DEFAULT_WORK_ORDER_DETAILS_VALUES: WorkOrderDetails = {
  productId: 0,
  productName: "",
  machineId: 0,
  machineName: "",
  employeeId: 0,
  employeeName: "",
  startTime: "",
  endTime: "",
  productivity: "",
}

