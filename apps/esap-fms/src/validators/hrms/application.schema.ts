import { z } from "zod"

import { messages } from "@/config/messages"

const MAX_FILE_SIZE = 1000000 // 1MB
const ACCEPTED_FILE_TYPES = ["application/pdf"]

export const applicationSchema = z.object({
  jobPostingId: z.number().min(1, { message: messages.jobPositionRequired }),
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  lastName: z.string().optional(),
  email: z
    .string()
    .min(1, { message: messages.emailRequired })
    .email({ message: messages.invalidEmail }),
  phone: z.string().optional(),
  linkedIn: z.string().min(1, { message: messages.linkedInRequired }),
  gitHub: z.string().optional(),
  source: z.string().min(1, { message: messages.sourceRequired }),
  noticePeriod: z.number().min(0, { message: messages.noticePeriodRequired }),
  resumeFile: z
    .any()
    .refine((file) => file, { message: messages.resumeRequired })
    .refine((file) => file?.size <= MAX_FILE_SIZE, {
      message: messages.maxFileSize,
    })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file?.type), {
      message: messages.acceptedFileTypes,
    }),
  coverLetterFile: z
    .any()
    .optional()
    .refine((file) => !file || file?.size <= MAX_FILE_SIZE, {
      message: messages.maxFileSize,
    })
    .refine((file) => !file || ACCEPTED_FILE_TYPES.includes(file?.type), {
      message: messages.acceptedFileTypes,
    }),
})

export type ApplicationFormInput = z.infer<typeof applicationSchema>
