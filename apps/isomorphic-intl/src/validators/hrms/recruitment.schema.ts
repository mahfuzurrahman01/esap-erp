import { z } from "zod"

import { messages } from "@/config/messages"

export const recruitmentSchema = z.object({
  id: z.number().optional(),
  jobPositionId: z.number().min(1, { message: messages.jobPositionRequired }),
  description: z.string().min(1, { message: messages.descriptionRequired }),
  responsibilities: z
    .string()
    .min(1, { message: messages.responsibilitiesRequired }),
  experience: z.number().min(0, { message: messages.experienceMustBePositive }),
  companyName: z.string().min(1, { message: messages.companyNameRequired }),
  departmentId: z.number().min(1, { message: messages.departmentRequired }),
  workingAddressId: z
    .number()
    .min(1, { message: messages.workingAddressRequired }),
  employmentTypeId: z
    .number()
    .min(1, { message: messages.employmentTypeRequired }),
  expectedNewEmployees: z
    .number()
    .min(1, { message: messages.expectedEmployeesRequired }),

  // Optional fields from API
  jobPosition: z.any().optional(),
  department: z.any().optional(),
  employmentType: z.any().optional(),
  workingAddress: z.any().optional(),
})

// export type RecruitmentFormInput = z.infer<typeof recruitmentSchema>

// import { z } from "zod"

// import { messages } from "@/config/messages"

// export const recruitmentSchema = z.object({
//   id: z.number().optional(),
//   jobPositionId: z
//     .number()
//     .min(1, { message: messages.jobPositionRequired })
//     .int(),
//   description: z.string().min(1, { message: messages.descriptionRequired }),
//   responsibilities: z
//     .string()
//     .min(1, { message: messages.responsibilitiesRequired }),
//   experience: z.number().min(0, { message: messages.experienceMustBePositive }),

//   companyId: z.number().min(1, { message: messages.companyRequired }),

//   departmentId: z.number().min(1, { message: messages.departmentRequired }),

//   jobLocationId: z.number().min(1, { message: messages.jobLocationRequired }),

//   employmentTypeId: z
//     .number()
//     .min(1, { message: messages.employmentTypeRequired }),
//   expectedNewEmployees: z
//     .number()
//     .min(1, { message: messages.expectedEmployeesRequired }),

//   // Optional fields that come from API but not in form
//   jobPosition: z.any().optional(),
//   department: z.any().optional(),
//   employmentType: z.any().optional(),
//   jobLocation: z.any().optional(),
// })

export type RecruitmentFormInput = z.infer<typeof recruitmentSchema>
