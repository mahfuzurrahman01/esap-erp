import { z } from "zod"

import { messages } from "@/config/messages"

export const BillOfMaterialsItemSchema = z.object({
  id: z.number().optional(),
  billOfMaterialId: z.number().optional(),
  itemId: z.number().optional(),
  itemUnitId: z.number().optional(),
  quantity: z.number().min(1, messages.quantityIsRequired),
  unitCost: z.number().min(1, messages.unitCostIsRequired),
  totalCost: z.number().nonnegative().optional(),
})

export const BillOfMaterialsSchema = z.object({
  companyId: z.number().min(1, messages.companyIdIsRequired),
  companyName: z.string().optional(),
  currencyId: z.number().min(1, messages.currencyIdIsRequired),
  currencyName: z.string().optional(),
  workCenterId: z.number().min(1, messages.workCenterIdIsRequired),
  scheduledFrom: z.string().min(1, messages.scheduledFromIsRequired),
  scheduledTo: z.string().min(1, messages.scheduledToIsRequired),
  materialCost: z.number().nonnegative().optional(),
  billOfMaterialItems: z.array(z.any()).optional(),
})

export type BillOfMaterialsFormInput = z.infer<typeof BillOfMaterialsSchema>
