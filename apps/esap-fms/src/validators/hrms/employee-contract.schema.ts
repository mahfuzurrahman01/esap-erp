import { z } from "zod"

import { messages } from "@/config/messages"

export const employeeContractFormSchema = z.object({
  employeeContractName: z.string().min(1, { message: messages.nameIsRequired }),
  employeeId: z.number().min(1, { message: messages.thisFieldIsRequired }),
  salaryStructureId: z
    .number()
    .min(1, { message: messages.thisFieldIsRequired }),
  startDate: z.string().min(1, { message: messages.startDateIsRequired }),
  endDate: z.string().nullable().optional(),
  employmentTypeId: z
    .number()
    .min(1, { message: messages.paymentTypeRequired }),
  companyName: z.string().min(1, { message: messages.companyRequired }),
  description: z.string().optional(),
  baseSalary: z.number().min(0, { message: messages.thisFieldIsRequired }),
  grossSalary: z.number().min(0, { message: messages.thisFieldIsRequired }),
  netSalary: z.number().optional(),
  companyId: z.number().optional(),
})

export type EmployeeContractFormInput = z.infer<
  typeof employeeContractFormSchema
>
