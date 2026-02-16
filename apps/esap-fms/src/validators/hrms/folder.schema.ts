import { z } from "zod"

import { messages } from "@/config/messages"

const MAX_FILE_SIZE = 1000000 // 1MB
const MAX_FILES = 3

export const folderSchema = z.object({
  folderName: z.string().min(1, { message: messages.folderNameRequired }),
  description: z.string().optional().nullable(),
  permission: z.string(),
})

export type FolderFormInput = z.infer<typeof folderSchema>
