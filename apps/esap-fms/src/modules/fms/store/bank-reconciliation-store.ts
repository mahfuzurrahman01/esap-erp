import { atom } from "jotai"

interface BankReconciliationState {
  closingBalanceAsPerBankStatement: number
  closingBalanceAsPerERP: number
  difference: number
}

const initialBankReconciliationState: BankReconciliationState = {
  closingBalanceAsPerBankStatement: 0,
  closingBalanceAsPerERP: 0,
  difference: 0,
}

// Base atoms
export const closingBalanceAsPerBankStatementAtom = atom<number>(0)

export const closingBalanceAsPerERPAtom = atom<number>(
  initialBankReconciliationState.closingBalanceAsPerERP
)

// Derived atom for difference calculation
export const differenceAtom = atom((get) => {
  const bankStatementBalance = get(closingBalanceAsPerBankStatementAtom)
  const erpBalance = get(closingBalanceAsPerERPAtom)
  return bankStatementBalance - erpBalance
})

// Action atoms
export const updateClosingBalanceAsPerBankStatementAtom = atom(
  (get) => get(closingBalanceAsPerBankStatementAtom),
  (get, set, newValue: number) => {
    set(closingBalanceAsPerBankStatementAtom, newValue)
  }
)

export const updateClosingBalanceAsPerERPAtom = atom(
  null,
  (get, set, newValue: number) => {
    set(closingBalanceAsPerERPAtom, newValue)
  }
)

export const bankReconciliationQueryOptionsAtom = atom<{
  companyId?: number
  bankAccountId?: number
}>({
  companyId: undefined,
  bankAccountId: undefined,
})

export const updateBankReconciliationQueryOptionsAtom = atom(
  (get) => get(bankReconciliationQueryOptionsAtom),
  (get, set, newValue: { companyId?: number; bankAccountId?: number }) => {
    set(bankReconciliationQueryOptionsAtom, newValue)
  }
)
