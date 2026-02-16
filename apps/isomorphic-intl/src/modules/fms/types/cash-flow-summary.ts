export interface MonthlyCashFlow {
  month: string
  netOperations: number
  netInvestment: number
  netFinance: number
}

export interface CashFlowResponse {
  cashFlows: MonthlyCashFlow[]
  totalNetOperations: number
  totalNetInvestment: number
  totalNetFinance: number
}
