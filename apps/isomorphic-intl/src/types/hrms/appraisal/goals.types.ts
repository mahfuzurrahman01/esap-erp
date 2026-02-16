import { HRMSFetchQueryOptions } from "../common.types"
import { Employee } from "../employee/employee.types"

export interface Goal {
  id?: number
  goalName: string
  employeeId: number
  deadline: string
  progress: number
  description?: string
  employee?: Employee
}

export type GoalQueryOptions = HRMSFetchQueryOptions

export type GoalDataResponse = {
  data: Goal[]
  count: number
}
