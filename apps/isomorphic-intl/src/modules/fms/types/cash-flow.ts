export interface CashFlowQueryOptions {
  pageIndex?: number
  pageSize?: number
  companyId?: number | string
  startDate?: string
  endDate?: string
  currencyId?: number
}

export interface CashFlowItem {
  id?: string
  name: string
  amount: number
  children?: CashFlowItem[]
  isExpanded?: boolean
  hasChildren?: boolean
  level?: number
  isTotal?: boolean
  isBlank?: boolean
  isParent?: boolean
}

export interface CashFlowTotal {
  id?: string
  name: string
  amount: number
}

export interface CashFlowSection {
  id?: string
  name: string
  amount: number
  children: CashFlowItem[]
  total: CashFlowTotal
}

export interface CashFlowData {
  operations: CashFlowSection
  investing: CashFlowSection
  financing: CashFlowSection
  netChange: CashFlowTotal
}

export interface CashFlowResponse {
  cashFlow: CashFlowData
}
