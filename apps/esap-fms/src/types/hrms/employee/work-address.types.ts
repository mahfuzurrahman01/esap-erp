import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

export type WorkAddress = {
  id?: number | undefined
  workingAddressName: string
  addressLine: string
  city?: string
  country?: string
  state?: string
  zip?: string
  taxID?: number | undefined
  companyName: string
  industry?: string
  phone?: string
  email?: string
  website?: string
  internalNotes?: string
  createdDate?: string | null
  updatedDate?: string | null
}

export type WorkAddressDataResponse = PaginatedResponse<WorkAddress>
export type WorkAddressQueryOptions = HRMSFetchQueryOptions
