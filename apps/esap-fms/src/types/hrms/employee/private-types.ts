import { HRMSFetchQueryOptions, PaginatedResponse } from "../common.types"
import { PrivateInformation } from "./employee.types"

export type privateInfoOptions = HRMSFetchQueryOptions
export type PrivateDataResponse = PaginatedResponse<PrivateInformation>
