import {
  EmployeeShortInfo,
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "../common.types"
import { Participant } from "./participants-type"
import { TrainingSession } from "./training-session-type"

export interface TrainingAttendance {
  id?: number
  sessionId: number
  participantId: number
  status: "Present" | "Absent"
  attendanceDate: string
  participant?: Participant
  session?: TrainingSession
}

export type TrainingAttendanceQueryOptions = HRMSFetchQueryOptions

export type TrainingAttendanceCreateInput = Omit<TrainingAttendance, "id">

export type TrainingAttendanceUpdateInput = Partial<TrainingAttendance> & {
  id: number
}
export type TrainingAttendanceDataResponse =
  PaginatedResponse<TrainingAttendance>
