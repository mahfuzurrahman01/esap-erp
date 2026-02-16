import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

export type WorkingSchedule = {
  id?: number | undefined
  workingScheduleName: string
  averageHourPerDay?: number // Auto calculated based on Working Hours
  timezone: string
  workingHours?: WorkingHour[] | string // this will be saved in the database as json string, so need to handle appropriately in the frontend, like for the add/edit form, need to convert the json string back to array of WorkingHour
  createdDate?: string | null
  updatedDate?: string | null
}

export type WorkingSchedulePostType = {
  id?: number | undefined
  workingScheduleName: string
  averageHourPerDay?: number // Auto calculated based on Working Hours
  timezone: string
  workingHours: string // this will be saved in the database as json string, so need to handle appropriately in the frontend, like for the add/edit form, need to convert the json string back to array of WorkingHour
  createdDate?: string | null
  updatedDate?: string | null
}
export type DayType = {
  label: string
  value: string
}
export type WorkingHour = {
  name: string
  dayOfWeek: DayType // Sunday - Saturday
  dayPeriod: DayType // e.g., "Morning", "Afternoon"
  workFrom: string // Time string, e.g., "09:00"
  workTo: string // Time string, e.g., "17:00"
  duration?: number | undefined // Duration in hour
  workEntry?: number | undefined // Duration in attendance
}

export type WorkingScheduleDataResponse = PaginatedResponse<WorkingSchedule>
export type WorkingScheduleQueryOptions = HRMSFetchQueryOptions
