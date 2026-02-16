import { z } from "zod";

import { messages } from "@/config/messages";

export const emailSettingFormSchema = z.object({
  protocol: z.number().nonnegative(messages.thisFieldIsRequired),
  encryption: z.string().min(1, messages.thisFieldIsRequired),
  email: z
    .string()
    .email(messages.invalidEmail)
    .min(1, messages.thisFieldIsRequired),
  charset: z.string().min(1, messages.thisFieldIsRequired),
  smtpHost: z.string().min(1, messages.thisFieldIsRequired),
  smtpPort: z.number().nonnegative(messages.thisFieldIsRequired),
  smtpUsername: z.string().min(1, messages.thisFieldIsRequired),
  smtpPassword: z.string().min(1, messages.thisFieldIsRequired),
  signature: z.string().optional(),
});

export type SettingFormTypes = z.infer<typeof emailSettingFormSchema>;