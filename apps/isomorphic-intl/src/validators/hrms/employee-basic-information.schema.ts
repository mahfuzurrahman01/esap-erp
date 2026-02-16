import { z } from "zod"

import { messages } from "@/config/messages"

export const employeeBasicInformationSchema = z.object({
  id: z.number().optional(),
  email: z
    .string()
    .min(1, { message: messages.emailIsRequired })
    .email(messages.invalidEmail),
  firstName: z.string().min(1, { message: messages.firstNameIsRequired }),
  badgeId: z.string().min(1, { message: messages.badgeIdIsRequired }),
  lastName: z.string().optional(),
  avatarUrl: z.string().optional(),
  avatarFile: z.any().optional(),
  about: z.string().optional(),
  departmentId: z.number().nullable().optional(),
  phone: z.string().optional(),
  emergencyPhone: z.string().optional(),
  jobPositionId: z.number().nullable().optional(),
  country: z.string().nullable().optional(),
  managerId: z.number().nullable().optional(),
  coachId: z.number().nullable().optional(),
  createdDate: z.string().nullable().optional(),
  updatedDate: z.string().nullable().optional(),
})

export type EmployeeBasicInformationPostData = z.infer<
  typeof employeeBasicInformationSchema
>

// export interface EmployeeListType {
//   id: z.string().optional(),
//   email: z
//     .string()
//     .min(1, { message: messages.emailIsRequired })
//     .email(messages.invalidEmail),
//   firstName: z.string().min(1, { message: messages.firstNameIsRequired }),
//   badgeId: z.string().min(1, { message: messages.badgeIdIsRequired }),
//   lastName: z.string().optional(),
//   avatarUrl: z.string().optional(),
//   avatarFile: z.any().optional(),
//   about: z.string().optional(),
//   departmentId: z.number().optional(),
//   phone: z.string().optional(),
//   emergencyPhone: z.string().optional(),
//   jobPosition: z.string().optional(),
//   country: z.string().optional(),
//   managerId: z.number().optional(),
//   coachId: z.number().optional(),
// }

export type EmployeeBasicInformationPutData =
  Partial<EmployeeBasicInformationPostData> & {
    id: number
  }
