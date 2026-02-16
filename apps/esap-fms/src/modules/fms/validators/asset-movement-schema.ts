import { z } from "zod"

import { messages } from "@/config/messages"

export const assetMovementFormSchema = z.object({
  id: z.number().optional(),
  assetMovementSerialNumber: z.string().optional(),
  companyId: z.number().min(1, {
    message: messages.companyIdIsRequired,
  }),
  transactionDate: z.string().min(1, {
    message: messages.transactionDateRequired,
  }),
  purposeOfMovement: z.string().min(1, {
    message: "Purpose of movement is required",
  }),
  assetTransactionTypeName: z.string().optional(),
  assetId: z.number().min(1, {
    message: messages.assetIdRequired,
  }),
  assetName: z.string().optional(),
  assetSerialNumber: z.string().optional(),
  assetLocationId: z.number().optional(),
  assetLocationName: z.string().optional(),
  fromEmployeeId: z.number().optional(),
  fromEmployeeName: z.string().optional(),
  toEmployeeId: z.number().optional(),
  toEmployeeName: z.string().optional(),
  targetedLocationId: z.number().optional(),
  targetedLocationName: z.string().optional(),
})

export type AssetMovementFormInput = z.infer<typeof assetMovementFormSchema>
