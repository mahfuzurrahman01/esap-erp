import { z } from "zod"

import { messages } from "@/config/messages"

export const employeeContractFormSchema = z.object({
  employeeContractName: z.string().min(1, { message: messages.nameRequired }),
  employeeId: z.number().min(1, { message: messages.employeeIsRequired }),
  salaryStructureId: z
    .number()
    .min(1, { message: messages.salaryStructureRequired }),
  startDate: z.string().min(1, { message: messages.startDateIsRequired }),
  endDate: z.string().nullable().optional(),
  employmentTypeId: z
    .number()
    .min(1, { message: messages.employmentTypeRequired }),
  companyName: z.string().min(1, { message: messages.companyNameRequired }),
  description: z.string().optional(),
  baseSalary: z.number().min(0, { message: messages.baseSalaryIsRequired }),
  grossSalary: z.number().min(0, { message: messages.grossSalaryIsRequired }),
  netSalary: z.number().optional(),
  companyId: z.number().optional(),
})

export type EmployeeContractFormInput = z.infer<
  typeof employeeContractFormSchema
>
