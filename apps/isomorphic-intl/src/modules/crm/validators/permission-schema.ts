import { z } from "zod"

import { messages } from "@/config/messages"

export const permissionFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, messages.thisFieldIsRequired),
  module: z.string().min(1, messages.thisFieldIsRequired),
  group: z.string().min(1, messages.thisFieldIsRequired),
})

export const roleFormSchema = z.object({
  id: z.string().optional(),
  roleName: z.string().min(1, messages.thisFieldIsRequired),
  permissionIds: z.array(z.string()).min(1, messages.thisFieldIsRequired),
})

export type PermissionCreateFormTypes = z.infer<typeof permissionFormSchema>
