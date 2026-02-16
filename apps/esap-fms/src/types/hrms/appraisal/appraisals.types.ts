import { EmployeeShortInfo, HRMSFetchQueryOptions } from "../common.types"
import { Employee } from "../employee/employee.types"
import {
  AppraisalTemplate,
  FeedbackQuestion,
} from "./appraisal-templates.types"

// For API requests/responses
export interface Appraisal {
  id?: number
  employee?: Employee
  employeeId: number
  appraisalName: string
  startDate: string
  endDate: string
  templateId: number
  template?: AppraisalTemplate
  status?: "New" | "Submitted" | "Done" | "Cancelled"
  employeeFeedback?: string | FeedbackQuestion[]
  managerFeedback?: string | FeedbackQuestion[]
  description?: string
  manager?: EmployeeShortInfo
  managerId?: number
}

export type AppraisalQueryOptions = HRMSFetchQueryOptions

export type AppraisalCreateInput = Omit<Appraisal, "id">

export type AppraisalUpdateInput = Partial<Appraisal> & {
  id: number
}

export type AppraisalDataResponse = {
  data: Appraisal[]
  count: number
}
