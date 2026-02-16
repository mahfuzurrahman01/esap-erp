import { CurrencyData } from "@/data/currency-data"
import {
  HRMSFetchQueryOptions,
  PaginatedResponse,
} from "@/types/hrms/common.types"

import { JobPosition } from "./job-positions.types"

export type Employee = {
  id?: number
  firstName: string
  lastName?: string
  avatarUrl?: null | string
  email: string
  about?: string
  department?: Department | null
  phone?: string | null
  emergencyPhone?: string | null
  jobPosition?: JobPosition | null
  country?: string | null
  manager?: EmployeeShortInfo | null
  coach?: EmployeeShortInfo | null
  createdDate?: string | null | undefined | Date
  updatedDate?: string | null | undefined | Date
  badgeId?: string | null
}

export type EmployeeBasicInformationType = {
  id: number
  firstName: string
  lastName: string
  avatar: string | null
  department: Department
  phone: string
  emergencyPhone: string
  email: string
  jobPosition: string
  country: string
  manager: EmployeeShortInfo | null
  coach: EmployeeShortInfo | null
  createdDate: string // UTC Date
  updatedDate: string // UTC Date
  badgeId: string
}

export type EmployeeQueryOptions = HRMSFetchQueryOptions
export type EmployeesDataResponse = PaginatedResponse<Employee>
export type EmployeeFullDetails = {
  id: number
  firstName: string
  lastName: string
  avatarUrl: string
  department: Department
  phone: string
  emergencyPhone: string
  email: string
  jobPosition: JobPosition
  country: string
  manager: EmployeeShortInfo
  coach: EmployeeShortInfo
  resumes: ResumeDetails[]
  workInformation: WorkInformation
  privateInformation: PrivateInformation
  createdDate: string // UTC date string
  updatedDate: string // UTC date string
  badgeId?: string | undefined
}

type EmployeeShortInfo = {
  id: number
  firstName: string
  lastName?: string
  avatar?: null | string
}

type Department = {
  id: number
  departmentName: string
}

export type PrivateInformation = {
  id?: number
  employeeId?: number
  street?: string
  state?: string
  country?: string
  city?: string
  zip?: string
  email?: string
  phone?: string
  salaryAccount?: string
  language?: string
  emergencyContactName?: string
  emergencyContactRelation?: string
  emergencyContactEmail?: string
  emergencyContactPhone?: string
  visaNo?: string
  visaExpireDate?: null | string // UTC date string
  workPermitNo?: string
  workPermitExpireDate?: null | string // UTC date string
  documentPath?: string
  nationality?: string
  gender?: string
  nidNo?: string
  ssn?: string
  passportNo?: string
  dateOfBirth?: null | string // UTC date string
  placeOfBirth?: string
  countryOfBirth?: string
  createdDate?: string | null
  updatedDate?: string | null
  currency?: CurrencyData
  bankAccountId?: number
  bankAccountName?: string
  bankAccountNumber?: string
  currencyId?: number
  currencyName?: string
}

export type ResumeDetails = {
  id?: number
  resumeName: string
  startDate?: null | string // UTC date string
  endDate?: null | string // UTC date string
  description?: string
  resumeType?: number
  employeeId?: number
  createdDate?: string | null
  updatedDate?: string | null
}

type ResumeType = {
  id: number
  resumeTypeName: string
  createdDate: string // UTC date string
  updatedDate: string // UTC date string
}

export type WorkInformation = {
  id?: number
  employeeId?: number
  workingAddress?: WorkingAddress
  state?: string
  country?: string | null
  workLocation?: string
  approver?: EmployeeShortInfo
  dailyHR?: EmployeeShortInfo
  workingSchedule?: WorkingSchedule
  timezone?: string
  createdDate?: string | null
  updatedDate?: string | null
}

export type WorkingAddress = {
  id: number
  workingAddressName: string
  addressLine?: string
  city?: string
  country?: string
  state?: string
  zip?: string
  taxID?: number
  companyName?: string
  industry?: string
  companyId?: number
  phone?: string
  email?: string
  website?: string
  internalNotes?: string
  createdDate: string // UTC date string
  updatedDate: string // UTC date string
}

type WorkingSchedule = {
  id: number
  workingScheduleName: string
  averageHourPerDay: number
  timezone: string
  workingHours: string
  createdDate: string // UTC date string
  updatedDate: string // UTC date string
}
