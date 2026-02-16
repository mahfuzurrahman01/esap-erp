import {
  EmployeeShortInfo,
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

import { Participant } from "./participants-type"
import { TrainingSession } from "./training-session-type"

export interface TrainingFeedback {
  id?: number
  sessionId: number
  session?: TrainingSession
  participantId: number
  participant?: Participant
  rating: "Not Good" | "Good" | "Better" | "Best"
  comments?: string
  trainerId: number
  trainer?: EmployeeShortInfo
}

export type TrainingFeedbackQueryOptions = HRMSFetchQueryOptions & {
  sessionId?: number | string
  participantId?: number | string
  rating?: number | string
}

export type TrainingFeedbackDataResponse = PaginatedResponse<TrainingFeedback>

export interface TrainingFeedbackCreate {
  sessionId: number
  feedbacks: {
    participantId: number
    trainerId: number
    rating: "Not Good" | "Good" | "Better" | "Best"
    comments: string
  }[]
}

export type TrainingFeedbackUpdateInput = Partial<TrainingFeedback> & {
  id: number
}
