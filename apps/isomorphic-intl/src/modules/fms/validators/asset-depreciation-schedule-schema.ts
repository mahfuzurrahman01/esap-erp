import { z } from "zod"

export const depreciationScheduleSchema = z.object({
  scheduleDate: z.string().optional(),
  depreciationAmount: z.number().optional(),
  accumulatedDepreciationAmount: z.number().optional(),
  journalId: z.number().optional(),
  isJournalCreated: z.boolean().optional(),
})

export const assetDepreciationListSchema = z.object({
  id: z.number().optional(),
  assetDepreciationSerialNumber: z.string().optional(),
  assetId: z.number(),
  assetSerialNumber: z.string().optional(),
  financeBookId: z.number().optional(),
  financeBookName: z.string(),
  companyId: z.number(),
  companyName: z.string().optional(),
  depreciationMethod: z.string().optional(),
  totalDepreciationPeriod: z.number().optional(),
  frequencyOfDepreciation: z.number().optional(),
  expectedValue: z.number().optional(),
  assetDepreciationSchedules: z.array(depreciationScheduleSchema).optional(),
  actions: z.string().optional(),
})

export type AssetDepreciationListInput = z.infer<
  typeof assetDepreciationListSchema
>
export type DepreciationScheduleInput = z.infer<
  typeof depreciationScheduleSchema
>
