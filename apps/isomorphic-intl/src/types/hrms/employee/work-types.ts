import { HRMSFetchQueryOptions, PaginatedResponse } from "../common.types"
import { WorkInformation } from "./employee.types"

export type workInfoOptions = HRMSFetchQueryOptions
export type WorkDataResponse = PaginatedResponse<WorkInformation>
