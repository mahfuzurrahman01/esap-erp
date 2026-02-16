import { HRMSFetchQueryOptions } from "../common.types"

type AnswerType = "text" | "rating"

export interface FeedbackQuestion {
  question: string
  answerType: AnswerType
  answer: string | null
}

// For internal form state
export interface AppraisalTemplateForm {
  id?: number
  templateName: string
  employeeFeedback: FeedbackQuestion[]
  managerFeedback: FeedbackQuestion[]
  description: string
  isActive: boolean
}

// For API requests/responses
export interface AppraisalTemplate {
  id?: number
  templateName: string
  employeeFeedback: string // JSON string
  managerFeedback: string // JSON string
  description: string
  isActive?: boolean
}

export type AppraisalTemplateQueryOptions = HRMSFetchQueryOptions

export type AppraisalTemplateCreateInput = Omit<AppraisalTemplate, "id">

export type AppraisalTemplateUpdateInput = Partial<AppraisalTemplate> & {
  id: number
}

export type AppraisalTemplateDataResponse = {
  data: AppraisalTemplate[]
  count: number
}
