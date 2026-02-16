import { z } from "zod"

import { messages } from "@/config/messages"

// form zod validation schema
export const assetCategoryFormSchema = z.object({
  id: z.number().optional(),
  assetCategoryName: z
    .string()
    .min(1, { message: messages.assetCategoryNameIsRequired }),
  fixedAssetAccountId: z
    .number()
    .min(1, { message: messages.fixedAssetAccountIdIsRequired }),
})

// generate form types from zod validation schema
export type AssetCategoryFormInput = z.infer<typeof assetCategoryFormSchema>
