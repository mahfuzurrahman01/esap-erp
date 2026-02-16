import * as z from "zod"

import { messages } from "@/config/messages"

const DayPeriodSchema = z.object({
  label: z.string(),
  value: z.string(),
})

const workingHourSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  dayOfWeek: DayPeriodSchema.refine((data) => !!data, {
    message: messages.dayOfWeekIsRequired,
  }),
  dayPeriod: DayPeriodSchema.refine((data) => !!data, {
    message: messages.dayPeriodIsRequired,
  }), // Custom error for missing dayPeriod
  workFrom: z.string().min(1, { message: messages.workFromIsRequired }),
  workTo: z.string().min(1, { message: messages.workToIsRequired }),
  duration: z.number().optional(), // Duration in hour
  workEntry: z.number().optional(), // Duration in attendance
})

export const workingScheduleFormSchema = z.object({
  id: z.number().optional(),
  workingScheduleName: z.string().min(1, { message: messages.nameIsRequired }),
  timezone: z.string().min(1, { message: messages.timezoneIsRequired }),
  averageHourPerDay: z.number().optional(),
  workingHours: z
    .array(workingHourSchema)
    .min(1, { message: messages.atLeastOneWorkingHourRequired }),
  createdDate: z.string().nullable().optional(),
  updatedDate: z.string().nullable().optional(),
})

export type WorkingScheduleFormInput = z.infer<typeof workingScheduleFormSchema>
export type WorkingSchedulePutDataType = Partial<WorkingScheduleFormInput> & {
  id: number
}

// export type WorkingSchedulePostDataType = Omit<
//   WorkingScheduleFormInput,
//   "workingHours"
// > & {
//   workingHours: string
// }

export type WorkingSchedulePostDataType = WorkingScheduleFormInput
