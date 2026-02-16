import { z } from "zod"

import { messages } from "@/config/messages"

const MAX_FILE_SIZE = 1000000 // 1MB

export const uploadFileSchema = z.object({
  files: z
    .array(
      z.instanceof(File).refine(
        (file) => {
          return file.size <= MAX_FILE_SIZE
        },
        { message: "form-file-size-too-large" }
      )
    )
    .min(1, { message: messages.filesRequired }),
})

export type UploadFileFormInput = z.infer<typeof uploadFileSchema>
