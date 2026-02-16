import { z } from "zod"

import { messages } from "@/config/messages"

export const WarehouseSchema = z.object({
  warehouseName: z.string().min(1, messages.warehouseNameRequired),
  warehouseManagerId: z.number().min(1, messages.warehouseManagerRequired),
  companyId: z.number().min(1, messages.companyRequired),
  location: z.string().min(1, messages.locationRequired),
  capacity: z.number().min(1, messages.capacityRequired),
  inUseCapacity: z.number().min(1, messages.inUseCapacityRequired),
  startHour: z.string().min(1, messages.startTimeRequired),
  endHour: z.string().min(1, messages.endTimeRequired),
  zoningLocation: z.string().optional(),
  binLocation: z.string().optional(),
  pickedBy: z.string().min(1, messages.pickedByRequired),
  packedBy: z.string().min(1, messages.packedByRequired),
  quantityToPick: z.number().min(1, messages.quantityToPickRequired),
  datePicked: z.string().min(1, messages.datePickedRequired),
  emergencyContact: z.string().optional(),
  temperatureControlled: z.boolean().optional(),
  fireSafetyCompliance: z.boolean().optional(),
})

export type WarehouseFormInput = z.infer<typeof WarehouseSchema>
