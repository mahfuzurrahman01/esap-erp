import { HRMSFetchQueryOptions, PaginatedResponse } from "../common.types"
import { Department } from "../employee/department.types"
import { WorkingAddress } from "../employee/employee.types"
import { EmploymentType } from "../employee/employment-types.types"
import { JobPosition } from "../employee/job-positions.types"

// JobPosting type for nested data
export type JobPosting = {
  id: number
  jobPositionId: number
  jobPosition?: JobPosition | null
  description: string
  responsibilities: string
  experience: number
  companyName: string
  departmentId: number
  department?: Department | null
  expectedNewEmployees: number
  workingAddressId: number
  workingAddress?: WorkingAddress | null
  employmentTypeId: number
  employmentType?: EmploymentType | null
}

// Main Application type
export type Application = {
  id?: number
  jobPostingId: number
  jobPosting?: JobPosting
  firstName: string
  lastName?: string
  email: string
  phone?: string
  linkedIn?: string
  gitHub?: string
  source: string
  noticePeriod: number
  appliedDate?: string
  resumeUrl?: string
  coverLetterUrl?: string
  status?: "pending" | "screening" | "interview" | "selected" | "rejected"
}

export const APPLICATION_STAGES = [
  {
    key: "pending",
    label: "Pending Review",
    color: "warning",
    iconBg: "bg-orange-100",
    iconColor: "text-warning",
  },
  {
    key: "screening",
    label: "Screening",
    color: "info",
    iconBg: "bg-sky-blue-100",
    iconColor: "text-sky-blue-600",
  },
  {
    key: "interview",
    label: "Interview",
    color: "primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    key: "selected",
    label: "Selected",
    color: "success",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    key: "rejected",
    label: "Rejected",
    color: "danger",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
] as const

export type ApplicationQueryOptions = HRMSFetchQueryOptions

export type ApplicationDataResponse = PaginatedResponse<Application>

export type ApplicationCreateInput = Omit<
  Application,
  "id" | "jobPosting" | "appliedDate" | "status"
>

export type ApplicationUpdateInput = Partial<ApplicationCreateInput>
