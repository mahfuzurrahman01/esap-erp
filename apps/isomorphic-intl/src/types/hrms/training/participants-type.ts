import {
  EmployeeShortInfo,
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "../common.types"
import { Employee } from "../employee/employee.types"
import { TrainingProgram } from "./training-program-type"

export interface Participant {
  id?: number
  trainingProgramId?: number
  participants?: any
  trainingProgram?: TrainingProgram
  employee?: Employee
}

export type ParticipantCreateInput = {
  trainingProgramId: number
  participants: {
    employeeId: number
    attendanceStatus?: string
    feedbackStatus?: string
  }[]
}

export type ParticipantUpdateInput = {
  id: number
  participants: {
    employeeId: number
    attendanceStatus?: string
    feedbackStatus?: string
  }[]
}

export type ParticipantQueryOptions = HRMSFetchQueryOptions

export type ParticipantDataResponse = PaginatedResponse<Participant>
