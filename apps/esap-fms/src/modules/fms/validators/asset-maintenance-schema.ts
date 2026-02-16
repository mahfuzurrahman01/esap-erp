import { z } from "zod"

import { messages } from "@/config/messages"

export const assetMaintenanceTaskSchema = z.object({
  id: z.number().optional(),
  assetMaintenanceId: z.number().optional(),
  assetMaintenanceTaskName: z.string().optional(),
  maintenanceStatus: z.union([z.string(), z.null()]).optional(),
  maintenanceRepetition: z.union([z.string(), z.null()]).optional(),
  assignedToId: z.number().optional(),
  assignedToName: z.string().optional(),
  nextMaintenanceDate: z.string().optional(),
})

export const assetMaintenanceSchema = z.object({
  id: z.number().optional(),
  assetMaintenanceSerialNumber: z.string().optional(),
  assetId: z.number().min(1, {
    message: messages.assetIdRequired,
  }),
  assetSerialNumber: z.union([z.string(), z.null()]).optional(),
  companyId: z.number().min(1, {
    message: messages.companyIdIsRequired,
  }),
  assetMaintenanceDetails: z.array(assetMaintenanceTaskSchema).optional(),
  comments: z.string().optional(),
})

export type AssetMaintenanceTaskSchema = z.infer<
  typeof assetMaintenanceTaskSchema
>
export type AssetMaintenanceSchema = z.infer<typeof assetMaintenanceSchema>
