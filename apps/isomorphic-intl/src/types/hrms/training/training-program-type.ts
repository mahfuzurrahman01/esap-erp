import { EmployeeShortInfo, HRMSFetchQueryOptions } from "../common.types"

export interface TrainingProgram {
  id?: number
  trainingProgramName: string
  description?: string
  companyName: string
  startDate: string
  endDate: string
  coordinatorId: number
  coordinator?: EmployeeShortInfo
  status: "Scheduled" | "Completed" | "Cancelled"
}

export type TrainingProgramQueryOptions = HRMSFetchQueryOptions

export type TrainingProgramCreateInput = Omit<TrainingProgram, "id">

export type TrainingProgramUpdateInput = Partial<TrainingProgram> & {
  id: number
}

export type TrainingProgramDataResponse = {
  data: TrainingProgram[]
  count: number
}
