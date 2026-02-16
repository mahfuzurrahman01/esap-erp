import { EmployeeShortInfo, HRMSFetchQueryOptions } from "../common.types"
import { TrainingProgram } from "./training-program-type"

export interface TrainingSession {
  id?: number
  trainingProgramId: number
  trainingProgram?: TrainingProgram
  sessionName: string
  description?: string
  sessionDate: string
  trainerId: number
  trainer?: EmployeeShortInfo
  duration: number
  status: "Scheduled" | "Completed" | "Cancelled"
  location: string
}

export type TrainingSessionQueryOptions = HRMSFetchQueryOptions

export type TrainingSessionCreateInput = Omit<TrainingSession, "id">

export type TrainingSessionUpdateInput = Partial<TrainingSession> & {
  id: number
}

export type TrainingSessionDataResponse = {
  data: TrainingSession[]
  count: number
}
