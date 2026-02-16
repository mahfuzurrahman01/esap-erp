import { z } from "zod"

import { messages } from "@/config/messages"

export const assetLocationFormSchema = z.object({
  id: z.number().optional(),
  assetLocationName: z.string().min(1, {
    message: messages.assetLocationNameIsRequired,
  }),
})

export type AssetLocationFormInput = z.infer<typeof assetLocationFormSchema>
