import { z } from "zod"

import { messages } from "@/config/messages"

export const payslipSchema = z.object({
  employeeId: z.number().min(1, { message: messages.employeeIsRequired }),
  employeeContractId: z.number().optional(),
  month: z.string().min(1, { message: messages.monthRequired }),
  year: z.number().min(1900, { message: messages.yearRequired }),
  status: z.enum(["Draft", "Submitted", "Paid", "Cancelled"]),
  baseSalary: z.number().optional(),
  grossSalary: z.number().optional(),
  totalDeductions: z.number().optional(),
  netPayableSalary: z.number().optional(),
})

export type PayslipFormInput = z.infer<typeof payslipSchema>
