import { PaginatedResponse } from "@/types/hrms/common.types"

export type Plan = {
  id: number
  planName: string
  departmentId: number
  departmentName: string
  activities: Activity[]
  createdDate: Date
  updatedDate: Date
}

export type Activity = {
  id?: number
  activityName: string
  summary: string
  assignment: string
  assignedTo: number
  createdDate?: Date
  updatedDate?: Date
}

export type PlanDataResponse = PaginatedResponse<Plan>
