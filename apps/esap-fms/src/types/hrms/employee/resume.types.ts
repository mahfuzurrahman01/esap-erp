import { HRMSFetchQueryOptions, PaginatedResponse } from "../common.types"
import { ResumeDetails } from "./employee.types"

export type resumeOptions = HRMSFetchQueryOptions
export type ResumeDataResponse = PaginatedResponse<ResumeDetails>
