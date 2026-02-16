export interface TopCompany {
  companyId: number
  companyName: string
  logoUrl: string
}

export interface MonthlyIncome {
  monthNumber: number
  monthName: string
  monthlyIncome: number
}

export interface IncomeExpensesProfitResponse {
  totalIncome: {
    totalIncome: number
  }
  topCompanies: TopCompany[]
  monthlyIncome: MonthlyIncome[]
}
