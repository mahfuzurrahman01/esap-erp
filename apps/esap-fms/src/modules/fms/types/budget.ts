import { COAList } from "@/types"

import { BudgetAgainstList } from "./budget-against"
import {
  BudgetTemplateList,
  CompanyList,
  CostCenterList,
  FiscalYearList,
  PaginationResponse,
  QueryOptions,
} from "./index"

export interface BudgetQueryOptions extends QueryOptions {
  search?: string
  fiscalYear?: string
  budgetAgainstId?: string | number
  companyId?: string | number
  sort?: string
}

export interface BudgetList {
  id?: number
  budgetName: string
  budgetAgainstId: number
  budgetAgainst?: BudgetAgainstList | null
  companyId: number
  company?: CompanyList | null
  fiscalYearId: number
  fiscalYear?: FiscalYearList | null
  budgetDistributionId: number
  budgetDistribution?: BudgetTemplateList | null
  costCenterId?: number
  costCenter?: CostCenterList | null
  budgetDetails: BudgetDetail[]
  action?: string
}

export interface BudgetDetail {
  id: number
  budgetId?: number
  chartOfAccountId: number
  chartOfAccount?: COAList | null
  budgetAmount: number
}

export interface BudgetPaginator extends PaginationResponse<BudgetList> {}
