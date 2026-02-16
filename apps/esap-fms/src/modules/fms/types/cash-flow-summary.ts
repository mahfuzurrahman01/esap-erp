export interface MonthlyCashFlow {
  month: string
  netOperations: number
  netInvestment: number
  netFinance: number
}

export interface CashFlowSummary {
  monthlyData: MonthlyCashFlow[]
  summary: {
    totalNetOperations: number
    totalNetInvestment: number
    totalNetFinance: number
  }
}

export type CashFlowResponse = CashFlowSummary[]
