import { z } from "node_modules/zod/lib"

import { messages } from "@/config/messages"

export const SaudizationConfigurationSchema = z.object({
  to: z
    .string()
    .min(1, { message: messages.emailIsRequired })
    .email(messages.invalidEmail),
  subject: z.string().min(1, { message: messages.subjectRequired }),
  body: z.string().min(1, { message: messages.emailBodyRequired }),
})

export type SaudizationConfigurationFormInputType = z.infer<
  typeof SaudizationConfigurationSchema
>

export type SaudizationConfigurationPostData =
  SaudizationConfigurationFormInputType

export type SaudizationConfigurationPutData =
  Partial<SaudizationConfigurationFormInputType>
