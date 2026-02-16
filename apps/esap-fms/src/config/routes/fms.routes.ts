export const fmsRoutes = {
  // Dashboard
  dashboard: "/financial-dashboard",

  // Chart of Accounts (COA)
  coa: "/coa",
  createCOA: "/coa/create",
  editCOA: (id: number) => `/coa/${id}/edit`,
  viewCOA: (id: number) => `/coa/${id}`,

  // Account type
  accountingType: "/accounting-type",

  // Journal Entries and Templates
  generalLedger: "/general-ledger",
  journalEntry: "/journal-entry",
  createJournal: "/journal-entry/create",
  editJournalEntry: (id: number) => `/journal-entry/${id}/edit`,
  viewJournalEntry: (id: number) => `/journal-entry/${id}`,
  journalTemplate: "/journal-entry-template",
  createJournalTemplate: "/journal-entry-template/create",
  editJournalTemplate: (id: number) => `/journal-entry-template/${id}/edit`,
  viewJournalTemplate: (id: number) => `/journal-entry-template/${id}`,
  journalType: "/journal-type",
  createJournalType: "/journal-type/create",
  editJournalType: (id: number) => `/journal-type/${id}/edit`,
  viewJournalType: (id: number) => `/journal-type/${id}`,

  // Company Management
  company: "/company",
  createCompany: "/company/create",
  viewCompany: (id: number) => `/company/${id}`,
  editCompany: (id: number) => `/company/${id}/edit`,
  editCompanyAccounts: (id: number) => `/company/${id}/edit/accounts`,
  editCompanyBuyingAndSelling: (id: number) =>
    `/company/${id}/edit/buying-and-selling`,
  editCompanyStockAndManufacturing: (id: number) =>
    `/company/${id}/edit/stock-and-manufacturing`,

  // Country Management
  country: "/country",
  createCountry: "/country/create",
  editCountry: (id: number) => `/country/${id}/edit`,

  // Asset Management
  asset: "/asset",
  createAsset: "/asset/create",
  editAsset: (id: number) => `/asset/${id}/edit`,
  viewAsset: (id: number) => `/asset/${id}`,
  transferAsset: (id: number) => `/asset/${id}/transfer`,
  repairAsset: (id: number) => `/asset/${id}/repair`,
  maintainAsset: (id: number) => `/asset/${id}/maintain`,

  // Asset Location
  assetLocation: "/asset-location",
  createAssetLocation: "/asset-location/create",
  editAssetLocation: (id: number) => `/asset-location/${id}/edit`,
  viewAssetLocation: (id: number) => `/asset-location/${id}`,

  // Asset Categories
  assetCategory: "/asset-category",
  createAssetCategory: "/asset-category/create",
  editAssetCategory: (id: number) => `/asset-category/${id}/edit`,
  viewAssetCategory: (id: number) => `/asset-category/${id}`,

  // Asset Depreciation
  assetDepreciationSchedule: "/asset-depreciation-schedule",
  createAssetDepreciationSchedule: "/asset-depreciation-schedule/create",
  editAssetDepreciationSchedule: (id: number) =>
    `/asset-depreciation-schedule/${id}/edit`,
  viewAssetDepreciationSchedule: (id: number) =>
    `/asset-depreciation-schedule/${id}`,

  // Asset Movement
  assetMovement: "/asset-movement",
  createAssetMovement: "/asset-movement/create",
  editAssetMovement: (id: number) => `/asset-movement/${id}/edit`,
  viewAssetMovement: (id: number) => `/asset-movement/${id}`,

  // Asset Repair and Maintenance
  assetRepair: "/asset-repair",
  createAssetRepair: "/asset-repair/create",
  editAssetRepair: (id: number) => `/asset-repair/${id}/edit`,
  viewAssetRepair: (id: number) => `/asset-repair/${id}`,
  assetMaintenance: "/asset-maintenance",
  createAssetMaintenance: "/asset-maintenance/create",
  editAssetMaintenance: (id: number) => `/asset-maintenance/${id}/edit`,
  viewAssetMaintenance: (id: number) => `/asset-maintenance/${id}`,

  // Asset Value Adjustments
  assetValueAdjustment: "/asset-value-adjustment",
  createAssetValueAdjustment: "/asset-value-adjustment/create",
  editAssetValueAdjustment: (id: number) =>
    `/asset-value-adjustment/${id}/edit`,
  viewAssetValueAdjustment: (id: number) => `/asset-value-adjustment/${id}`,

  // Banking and Accounts
  bank: "/bank",
  bankAccount: "/bank-account",
  createBankAccount: "/bank-account/create",
  editBankAccount: (id: number) => `/bank-account/${id}/edit`,
  viewBankAccount: (id: number) => `/bank-account/${id}`,
  bankAccountType: "/bank-account-type",
  newBanks: "/new-banks",

  // Bank Transactions
  bankTransactions: "/bank-transaction",
  newTransactions: "/new-transactions",
  bankTransaction: "/bank-transaction",
  createBankTransaction: "/bank-transaction/create",
  editBankTransaction: (id: number) => `/bank-transaction/${id}/edit`,
  viewBankTransaction: (id: number) => `/bank-transaction/${id}`,

  // Bank Transaction Type
  bankTransactionType: "/bank-transaction-type",
  createBankTransactionType: "/bank-transaction-type/create",
  editBankTransactionType: (id: number) => `/bank-transaction-type/${id}/edit`,
  viewBankTransactionType: (id: number) => `/bank-transaction-type/${id}`,

  // Bank Transaction Status
  bankTransactionStatus: "/bank-transaction-status",
  createBankTransactionStatus: "/bank-transaction-status/create",
  editBankTransactionStatus: (id: number) =>
    `/bank-transaction-status/${id}/edit`,
  viewBankTransactionStatus: (id: number) => `/bank-transaction-status/${id}`,

  // Bank Statements and Reconciliation
  bankClearance: "/bank-clearance",
  bankStatement: "/bank-statement",
  bankStatementImport: "/bank-statement/import",
  importBankStatement: "/bank-statement",
  editImportBankStatement: (id: number) => `/bank-statement/${id}/edit`,
  viewImportBankStatement: (id: number) => `/bank-statement/${id}`,
  bankReconciliation: "/bank-reconciliation",
  bankReconciliationStatement: "/bank-reconciliation-statement",
  reconciliation: "/reconciliation",

  // Budgeting
  budget: "/budget",
  createBudget: "/budget/create",
  editBudget: (id: number) => `/budget/${id}/edit`,
  viewBudget: (id: number) => `/budget/${id}`,
  budgetDistribution: "/budget-distribution",
  createBudgetDistribution: "/budget-distribution/create",
  editBudgetDistribution: (id: number) => `/budget-distribution/${id}/edit`,
  viewBudgetDistribution: (id: number) => `/budget-distribution/${id}`,
  budgetAgainst: "/budget-against",
  createBudgetAgainst: "/budget-against/create",
  editBudgetAgainst: (id: number) => `/budget-against/${id}/edit`,

  // Payments
  payments: "/payments",
  createPayment: "/payments/create",
  editPayment: (id: number) => `/payments/${id}/edit`,
  viewPayment: (id: number) => `/payments/${id}`,
  printPayment: (id: number) => `/payments/${id}/print`,
  makePayments: "/make-payments",
  modeOfPayment: "/mode-of-payment",
  createModeOfPayment: "/mode-of-payment/create",
  editModeOfPayment: (id: number) => `/mode-of-payment/${id}/edit`,
  viewModeOfPayment: (id: number) => `/mode-of-payment/${id}`,
  paymentType: "/payment-type",
  createPaymentType: "/payment-type/create",
  editPaymentType: (id: number) => `/payment-type/${id}/edit`,
  viewPaymentType: (id: number) => `/payment-type/${id}`,
  paymentRequest: "/payments-request",
  createPaymentRequest: "/payments-request/create",
  editPaymentRequest: (id: number) => `/payments-request/${id}/edit`,
  viewPaymentRequest: (id: number) => `/payments-request/${id}`,
  printPaymentRequest: (id: number) => `/payments-request/${id}/print`,

  // Currency Management
  currency: "/currency",
  currencyExchange: "/currency-exchange",
  createCurrency: "/currency/create",
  editCurrency: (id: number) => `/currency/${id}/edit`,

  // Tax Management
  taxRule: "/tax-rule",
  createTaxRule: "/tax-rule/create",
  editTaxRule: (id: number) => `/tax-rule/${id}/edit`,
  viewTaxRule: (id: number) => `/tax-rule/${id}`,
  taxTemplate: "/tax-template",
  createTaxTemplate: "/tax-template/create",
  editTaxTemplate: (id: number) => `/tax-template/${id}/edit`,
  viewTaxTemplate: (id: number) => `/tax-template/${id}`,
  taxCategory: "/tax-category",
  createTaxCategory: "/tax-category/create",
  editTaxCategory: (id: number) => `/tax-category/${id}/edit`,

  zatcaCategory: "/zatca-category",
  createZatcaCategory: "/zatca-category/create",
  editZatcaCategory: (id: number) => `/zatca-category/${id}/edit`,

  // Cost Centers
  costCenter: "/cost-center",
  createCostCenter: "/cost-center/create",
  editCostCenter: (id: number) => `/cost-center/${id}/edit`,

  // Fiscal Year
  fiscalYear: "/fiscal-year",
  createFiscalYear: "/fiscal-year/create",
  editFiscalYear: (id: number) => `/fiscal-year/${id}/edit`,
  viewFiscalYear: (id: number) => `/fiscal-year/${id}`,

  // Terms and Conditions
  termsAndConditions: "/terms-and-conditions",
  createTermsAndConditions: "/terms-and-conditions/create",
  editTermsAndConditions: (id: number) => `/terms-and-conditions/${id}/edit`,
  viewTermsAndConditions: (id: number) => `/terms-and-conditions/${id}`,

  // Accounts Receivable and Payable
  accountReceivable: "/account-receivable",
  accountPayable: "/account-payable",

  // Financial Reporting
  financialReporting: "/financial-reporting",
  cashflow: "/cashflow",
  budgetVarianceReport: "/budget-variance-report",
  budgetSummary: "/budget-summary",
  fixedAssetRegister: "/fixed-asset-register",
  assetDepreciationLedger: "/asset-depreciation-ledger",
  assetMovementHistory: "/asset-movement-history",
  assetRepairHistory: "/asset-repair-history",
  profitAndLoss: "/profit-and-loss",
  trialBalance: "/trial-balance",
  balanceSheet: "/balance-sheet",
  financialStatement: "/financial-statement",
  profitAndLossStatement: "/profit-and-loss-statement",
  bankAccountSummary: "/bank-account-summary",
  monthlyBankTransactions: "/monthly-bank-transactions",
  bankStatementReport: "/bank-statement-report",
  paymentSummary: "/payment-summary",
  dailyPayments: "/daily-payments",

  // Documents
  documents: "/documents",

  // Stripe Payment
  paymentSuccess: (id: number) => `/payments/${id}/success`,
  paymentCancel: (id: number) => `/payments/${id}/cancel`,
}
