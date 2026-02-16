import { z } from "zod"

import { messages } from "@/config/messages"

const taxTemplateDetailSchema = z.object({
  id: z.number(),
  taxTemplateId: z.number().optional(),
  taxType: z.string(),
  chartOfAccountId: z.number(),
  taxRate: z.number().optional(),
  taxAmount: z.number().optional(),
  templateType: z.string().nullable().optional(),
  chartOfAccountName: z.union([z.string(), z.null()]).optional(),
})

export const taxTemplateFormSchema = z.object({
  id: z.number().optional(),
  taxTemplateName: z
    .string()
    .min(1, { message: messages.taxTemplateNameRequired }),
  templateType: z.string().min(1, { message: messages.taxTypeRequired }),
  taxCategoryId: z
    .number()
    .min(1, { message: messages.taxCategoryNameRequired }),
  taxTemplateTypeName: z.string().nullable().optional(),
  taxCategoryName: z.string().nullable().optional(),
  companyId: z.number().min(1, { message: messages.companyRequired }),
  companyName: z.string().nullable().optional(),
  isDefault: z.boolean().default(false),
  taxTemplateDetails: z.array(taxTemplateDetailSchema),
  createdBy: z.number().optional(),
  updatedBy: z.number().optional(),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  action: z.string().optional(),
})

// generate form types from zod validation schema
export type TaxTemplateFormInput = z.infer<typeof taxTemplateFormSchema>
