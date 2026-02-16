import { z } from "zod"

import { messages } from "@/config/messages"

export const workOrderDetails = z.object({
  itemId: z.number().min(1, messages.itemIdIsRequired),
  machineId: z.number().min(1, messages.machineIdIsRequired),
  employeeId: z.number().min(1, messages.employeeIdIsRequired),
  employeeName: z.string().min(1, messages.employeeNameIsRequired),
  startTime: z.string().min(1, messages.startTimeIsRequired),
  endTime: z.string().min(1, messages.endTimeIsRequired),
  productivity: z.number().min(1, messages.productivityIsRequired),
})

export const WorkOrderTrackingSchema = z.object({
  billOfMaterialId: z.number().optional(),
  materialRequirementPlanId: z.number().min(1, messages.materialRequirementPlanIdIsRequired),
  // productId: z.number().min(1, messages.productIdIsRequired),
  workCenterId: z.number().min(1, messages.workCenterIdIsRequired),
  workOrderName: z.string().min(1, messages.workOrderNameIsRequired),
  quantity: z.number().min(1, messages.quantityIsRequired),
  assignedToId: z.number().min(1, messages.assignedToIdIsRequired),
  estCompletionStart: z.string().min(1, messages.estCompletionStartIsRequired),
  estCompletionEnd: z.string().min(1, messages.estCompletionEndIsRequired),
  expectedDuration: z.number().min(1, messages.expectedDurationIsRequired),
  workProgress: z.string().min(1, messages.workProgressIsRequired),
  jobDescription: z.string().optional(),
  workOrderDetails: z.array(z.any()).optional(),
})

export type WorkOrderTrackingFormInput = z.infer<typeof WorkOrderTrackingSchema>
