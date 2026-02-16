

import { HRMSFetchQueryOptions, PaginatedResponse } from "../common.types"
import { EmployeeFullDetails } from "../employee/employee.types"
import { SalaryStructure } from "../payroll-configuration/salary-structure.types"
import { EmployeeContract } from "./employee-contract.types"

export interface Payslip {
  id?: number
  employeeId: number
  employee?: EmployeeFullDetails
  salaryStructureId?: number
  salaryStructure?: SalaryStructure
  employeeContract?: EmployeeContract
  year?: number
  month?: number | string
  status?: "Draft" | "Submitted" | "Paid" | "Cancelled"
  referenceId?: number
  employeeContractId?: number
  baseSalary?: number
  grossSalary?: number
  totalDeductions?: number
  netPayableSalary?: number
  serialNumber?: string
  companyId?: number
}

export interface PayslipCreateInput {
  employeeId: number
  salaryStructureId: number
  year: number
  month: number
  status: string
  baseSalary?: number
  grossSalary?: number
  totalDeductions?: number
  netPayableSalary?: number
}

export interface PayslipUpdateInput extends PayslipCreateInput {
  id: number
}

export interface payslipQueryOptions extends HRMSFetchQueryOptions {}

export interface payslipPaginatedResponse extends PaginatedResponse<Payslip> {}
