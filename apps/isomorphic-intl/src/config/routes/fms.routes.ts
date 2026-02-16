export const fmsRoutes = {
  // Dashboard
  dashboard: "/fms/financial-dashboard",

  // Chart of Accounts (COA)
  coa: "/fms/coa",
  createCOA: "/fms/coa/create",
  editCOA: (id: number) => `/fms/coa/${id}/edit`,
  viewCOA: (id: number) => `/fms/coa/${id}`,

  // Account type
  accountingType: "/fms/accounting-type",

  // Journal Entries and Templates
  generalLedger: "/fms/general-ledger",
  journalEntry: "/fms/journal-entry",
  createJournal: "/fms/journal-entry/create",
  editJournalEntry: (id: number) => `/fms/journal-entry/${id}/edit`,
  viewJournalEntry: (id: number) => `/fms/journal-entry/${id}`,
  journalTemplate: "/fms/journal-entry-template",
  createJournalTemplate: "/fms/journal-entry-template/create",
  editJournalTemplate: (id: number) => `/fms/journal-entry-template/${id}/edit`,
  viewJournalTemplate: (id: number) => `/fms/journal-entry-template/${id}`,
  journalType: "/fms/journal-type",
  createJournalType: "/fms/journal-type/create",
  editJournalType: (id: number) => `/fms/journal-type/${id}/edit`,
  viewJournalType: (id: number) => `/fms/journal-type/${id}`,

  // Company Management
  company: "/fms/company",
  createCompany: "/fms/company/create",
  viewCompany: (id: number) => `/fms/company/${id}`,
  editCompany: (id: number) => `/fms/company/${id}/edit`,
  editCompanyAccounts: (id: number) => `/fms/company/${id}/edit/accounts`,
  editCompanyBuyingAndSelling: (id: number) =>
    `/fms/company/${id}/edit/buying-and-selling`,
  editCompanyStockAndManufacturing: (id: number) =>
    `/fms/company/${id}/edit/stock-and-manufacturing`,

  // Country Management
  country: "/fms/country",
  createCountry: "/fms/country/create",
  editCountry: (id: number) => `/fms/country/${id}/edit`,

  // Asset Management
  asset: "/fms/asset",
  createAsset: "/fms/asset/create",
  editAsset: (id: number) => `/fms/asset/${id}/edit`,
  viewAsset: (id: number) => `/fms/asset/${id}`,
  transferAsset: (id: number) => `/fms/asset/${id}/transfer`,
  repairAsset: (id: number) => `/fms/asset/${id}/repair`,
  maintainAsset: (id: number) => `/fms/asset/${id}/maintain`,

  // Asset Location
  assetLocation: "/fms/asset-location",
  createAssetLocation: "/fms/asset-location/create",
  editAssetLocation: (id: number) => `/fms/asset-location/${id}/edit`,
  viewAssetLocation: (id: number) => `/fms/asset-location/${id}`,

  // Asset Categories
  assetCategory: "/fms/asset-category",
  createAssetCategory: "/fms/asset-category/create",
  editAssetCategory: (id: number) => `/fms/asset-category/${id}/edit`,
  viewAssetCategory: (id: number) => `/fms/asset-category/${id}`,

  // Asset Depreciation
  assetDepreciationSchedule: "/fms/asset-depreciation-schedule",
  createAssetDepreciationSchedule: "/fms/asset-depreciation-schedule/create",
  editAssetDepreciationSchedule: (id: number) =>
    `/fms/asset-depreciation-schedule/${id}/edit`,
  viewAssetDepreciationSchedule: (id: number) =>
    `/fms/asset-depreciation-schedule/${id}`,

  // Asset Movement
  assetMovement: "/fms/asset-movement",
  createAssetMovement: "/fms/asset-movement/create",
  editAssetMovement: (id: number) => `/fms/asset-movement/${id}/edit`,
  viewAssetMovement: (id: number) => `/fms/asset-movement/${id}`,

  // Asset Repair and Maintenance
  assetRepair: "/fms/asset-repair",
  createAssetRepair: "/fms/asset-repair/create",
  editAssetRepair: (id: number) => `/fms/asset-repair/${id}/edit`,
  viewAssetRepair: (id: number) => `/fms/asset-repair/${id}`,
  assetMaintenance: "/fms/asset-maintenance",
  createAssetMaintenance: "/fms/asset-maintenance/create",
  editAssetMaintenance: (id: number) => `/fms/asset-maintenance/${id}/edit`,
  viewAssetMaintenance: (id: number) => `/fms/asset-maintenance/${id}`,

  // Asset Value Adjustments
  assetValueAdjustment: "/fms/asset-value-adjustment",
  createAssetValueAdjustment: "/fms/asset-value-adjustment/create",
  editAssetValueAdjustment: (id: number) =>
    `/fms/asset-value-adjustment/${id}/edit`,
  viewAssetValueAdjustment: (id: number) => `/fms/asset-value-adjustment/${id}`,

  // Banking and Accounts
  bank: "/fms/bank",
  bankAccount: "/fms/bank-account",
  createBankAccount: "/fms/bank-account/create",
  editBankAccount: (id: number) => `/fms/bank-account/${id}/edit`,
  viewBankAccount: (id: number) => `/fms/bank-account/${id}`,
  bankAccountType: "/fms/bank-account-type",
  newBanks: "/fms/new-banks",

  // Bank Transactions
  bankTransactions: "/fms/bank-transaction",
  newTransactions: "/fms/new-transactions",
  bankTransaction: "/fms/bank-transaction",
  createBankTransaction: "/fms/bank-transaction/create",
  editBankTransaction: (id: number) => `/fms/bank-transaction/${id}/edit`,
  viewBankTransaction: (id: number) => `/fms/bank-transaction/${id}`,

  // Bank Transaction Type
  bankTransactionType: "/fms/bank-transaction-type",
  createBankTransactionType: "/fms/bank-transaction-type/create",
  editBankTransactionType: (id: number) => `/fms/bank-transaction-type/${id}/edit`,
  viewBankTransactionType: (id: number) => `/fms/bank-transaction-type/${id}`,

  // Bank Transaction Status
  bankTransactionStatus: "/fms/bank-transaction-status",
  createBankTransactionStatus: "/fms/bank-transaction-status/create",
  editBankTransactionStatus: (id: number) =>
    `/fms/bank-transaction-status/${id}/edit`,
  viewBankTransactionStatus: (id: number) => `/fms/bank-transaction-status/${id}`,

  // Bank Statements and Reconciliation
  bankClearance: "/fms/bank-clearance",
  bankStatement: "/fms/bank-statement",
  bankStatementImport: "/fms/bank-statement/import",
  importBankStatement: "/fms/bank-statement",
  editImportBankStatement: (id: number) => `/fms/bank-statement/${id}/edit`,
  viewImportBankStatement: (id: number) => `/fms/bank-statement/${id}`,
  bankReconciliation: "/fms/bank-reconciliation",
  bankReconciliationStatement: "/fms/bank-reconciliation-statement",
  reconciliation: "/fms/reconciliation",

  // Budgeting
  budget: "/fms/budget",
  createBudget: "/fms/budget/create",
  editBudget: (id: number) => `/fms/budget/${id}/edit`,
  viewBudget: (id: number) => `/fms/budget/${id}`,
  budgetDistribution: "/fms/budget-distribution",
  createBudgetDistribution: "/fms/budget-distribution/create",
  editBudgetDistribution: (id: number) => `/fms/budget-distribution/${id}/edit`,
  viewBudgetDistribution: (id: number) => `/fms/budget-distribution/${id}`,
  budgetAgainst: "/fms/budget-against",
  createBudgetAgainst: "/fms/budget-against/create",
  editBudgetAgainst: (id: number) => `/fms/budget-against/${id}/edit`,

  // Payments
  payments: "/fms/payments",
  createPayment: "/fms/payments/create",
  editPayment: (id: number) => `/fms/payments/${id}/edit`,
  viewPayment: (id: number) => `/fms/payments/${id}`,
  printPayment: (id: number) => `/fms/payments/${id}/print`,
  makePayments: "/fms/make-payments",
  modeOfPayment: "/fms/mode-of-payment",
  createModeOfPayment: "/fms/mode-of-payment/create",
  editModeOfPayment: (id: number) => `/fms/mode-of-payment/${id}/edit`,
  viewModeOfPayment: (id: number) => `/fms/mode-of-payment/${id}`,
  paymentType: "/fms/payment-type",
  createPaymentType: "/fms/payment-type/create",
  editPaymentType: (id: number) => `/fms/payment-type/${id}/edit`,
  viewPaymentType: (id: number) => `/fms/payment-type/${id}`,
  paymentRequest: "/fms/payments-request",
  createPaymentRequest: "/fms/payments-request/create",
  editPaymentRequest: (id: number) => `/fms/payments-request/${id}/edit`,
  viewPaymentRequest: (id: number) => `/fms/payments-request/${id}`,
  printPaymentRequest: (id: number) => `/fms/payments-request/${id}/print`,

  // Currency Management
  currency: "/fms/currency",
  currencyExchange: "/fms/currency-exchange",
  createCurrency: "/fms/currency/create",
  editCurrency: (id: number) => `/fms/currency/${id}/edit`,

  // Tax Management
  taxRule: "/fms/tax-rule",
  createTaxRule: "/fms/tax-rule/create",
  editTaxRule: (id: number) => `/fms/tax-rule/${id}/edit`,
  viewTaxRule: (id: number) => `/fms/tax-rule/${id}`,
  taxTemplate: "/fms/tax-template",
  createTaxTemplate: "/fms/tax-template/create",
  editTaxTemplate: (id: number) => `/fms/tax-template/${id}/edit`,
  viewTaxTemplate: (id: number) => `/fms/tax-template/${id}`,
  taxCategory: "/fms/tax-category",
  createTaxCategory: "/fms/tax-category/create",
  editTaxCategory: (id: number) => `/fms/tax-category/${id}/edit`,

  zatcaCategory: "/fms/zatca-category",
  createZatcaCategory: "/fms/zatca-category/create",
  editZatcaCategory: (id: number) => `/fms/zatca-category/${id}/edit`,

  // Cost Centers
  costCenter: "/fms/cost-center",
  createCostCenter: "/fms/cost-center/create",
  editCostCenter: (id: number) => `/fms/cost-center/${id}/edit`,

  // Fiscal Year
  fiscalYear: "/fms/fiscal-year",
  createFiscalYear: "/fms/fiscal-year/create",
  editFiscalYear: (id: number) => `/fms/fiscal-year/${id}/edit`,
  viewFiscalYear: (id: number) => `/fms/fiscal-year/${id}`,

  // Terms and Conditions
  termsAndConditions: "/fms/terms-and-conditions",
  createTermsAndConditions: "/fms/terms-and-conditions/create",
  editTermsAndConditions: (id: number) => `/fms/terms-and-conditions/${id}/edit`,
  viewTermsAndConditions: (id: number) => `/fms/terms-and-conditions/${id}`,

  // Accounts Receivable and Payable
  accountReceivable: "/fms/account-receivable",
  accountPayable: "/fms/account-payable",

  // Financial Reporting
  financialReporting: "/fms/financial-reporting",
  cashflow: "/fms/cashflow",
  budgetVarianceReport: "/fms/budget-variance-report",
  budgetSummary: "/fms/budget-summary",
  fixedAssetRegister: "/fms/fixed-asset-register",
  assetDepreciationLedger: "/fms/asset-depreciation-ledger",
  assetMovementHistory: "/fms/asset-movement-history",
  assetRepairHistory: "/fms/asset-repair-history",
  profitAndLoss: "/fms/profit-and-loss",
  trialBalance: "/fms/trial-balance",
  balanceSheet: "/fms/balance-sheet",
  financialStatement: "/fms/financial-statement",
  profitAndLossStatement: "/fms/profit-and-loss-statement",
  bankAccountSummary: "/fms/bank-account-summary",
  monthlyBankTransactions: "/fms/monthly-bank-transactions",
  bankStatementReport: "/fms/bank-statement-report",
  paymentSummary: "/fms/payment-summary",
  dailyPayments: "/fms/daily-payments",

  // Documents
  documents: "/fms/documents",

  // Stripe Payment
  paymentSuccess: (id: number) => `/fms/payments/${id}/success`,
  paymentCancel: (id: number) => `/fms/payments/${id}/cancel`,
}