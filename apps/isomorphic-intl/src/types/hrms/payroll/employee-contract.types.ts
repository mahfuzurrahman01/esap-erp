import { CompanyFormInput } from "@/modules/fms/validators/company-schema"
import { PaginatedResponse } from "@/modules/scm/types/common.types"

import { HRMSFetchQueryOptions } from "../common.types"
import { EmployeeFullDetails } from "../employee/employee.types"
import { EmploymentType } from "../employee/employment-types.types"
import { SalaryStructure } from "../payroll-configuration/salary-structure.types"

export interface EmployeeContract {
  id?: number
  employeeId: number
  employeeContractName: string
  salaryStructureId: number
  salaryStructure?: SalaryStructure
  startDate: string
  endDate?: string | null
  baseSalary: number
  grossSalary: number
  company?: CompanyFormInput
  employmentTypeId: number
  companyName: string
  description?: string
  employee?: EmployeeFullDetails
  employmentType?: EmploymentType
  netSalary?: number
  companyId?: number
}

export interface EmployeeContractCreateInput {
  employeeId: number
  employeeContractName: string
  salaryStructureId: number
  startDate: string
  endDate?: string | null
  baseSalary: number
  grossSalary: number
  employmentTypeId: number
  companyName: string
  description?: string | null
}

export interface EmployeeContractUpdateInput
  extends EmployeeContractCreateInput {
  id: number
}

export type EmployeeContractQueryOptions = HRMSFetchQueryOptions

export type EmployeeContractDataResponse = PaginatedResponse<EmployeeContract>
