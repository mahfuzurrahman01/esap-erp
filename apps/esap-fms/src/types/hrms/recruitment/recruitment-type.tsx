import { HRMSFetchQueryOptions, PaginatedResponse } from "../common.types"
import { Department } from "../employee/department.types"
import { WorkingAddress } from "../employee/employee.types"
import { EmploymentType } from "../employee/employment-types.types"
import { JobPosition } from "../employee/job-positions.types"

// Add this new type for WorkingAddress

export type Recruitment = {
  id?: number
  jobPositionId: number
  jobPosition?: JobPosition
  jobPositionName?: string
  description: string
  responsibilities?: string
  experience: number
  companyName: string
  departmentId: number
  department?: Department
  expectedNewEmployees: number
  workingAddressId: number
  workingAddress?: WorkingAddress
  employmentTypeId: number
  employmentType?: EmploymentType
}

export type RecruitmentQueryOptions = HRMSFetchQueryOptions

export type RecruitmentDataResponse = PaginatedResponse<Recruitment>

export type RecruitmentCreateInput = Omit<
  Recruitment,
  "id" | "jobPosition" | "department" | "workingAddress" | "employmentType"
>

export type RecruitmentUpdateInput = Partial<RecruitmentCreateInput>
