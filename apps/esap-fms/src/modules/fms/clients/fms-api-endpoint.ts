export const FMSApiEndpoints = {
  // Country Management Endpoints
  country: "/fm2/v1/country/get-all-country",
  countryById: (id: number) => `/country/${id}`,
  createCountry: "/country/add-country",
  updateCountry: "/country/update-country",
  deleteCountry: (id: number) => `/country/delete-country/${id}`,
  bulkDeleteCountry: "/country/delete-countries",

  // Currency Management Endpoints
  currency: "/currency/get-all-currency",
  currencyById: (id: number) => `/currency/${id}`,
  createCurrency: "/currency/add-currency",
  updateCurrency: "/currency/update-currency",
  deleteCurrency: (id: number) => `/currency/delete-currency/${id}`,
  bulkCurrency: "/currency/delete-currencies",

  // Company Management Endpoints
  company: "/company/get-all-company",
  companyById: (id: number) => `/company/${id}`,
  createCompany: "/company/add-company",
  updateCompany: "/company/update-company",
  deleteCompany: (id: number) => `/company/delete-company/${id}`,
  bulkCompany: "/company/delete-companies",

  // Chart of Accounts Endpoints
  COA: "/chartofaccount/get-all-chart-of-accounts",
  COAById: (id: number) => `/chartofaccount/${id}`,
  createCOA: "/chartofaccount/add-chart-of-account",
  updateCOA: "/chartofaccount/update-chart-of-account",
  deleteCOA: (id: number) => `/chartofaccount/delete-chart-of-account/${id}`,
  bulkCOA: "/chartofaccount/delete-chart-of-accounts",

  // Accounting Types Endpoints
  accountTypes: "/accounttype/get-all-accounting-type",
  accountTypeById: (id: number) => `/accounttype/${id}`,
  createAccountType: "/accounttype/add-accounting-type",
  updateAccountType: "/accounttype/update-accounting-type",
  deleteAccountType: (id: number) =>
    `/accounttype/delete-accounting-type/${id}`,
  useBulkDeleteAccountType: "/accounttype/delete-accounting-types",

  // Journal Entry Endpoints
  journalEntry: "/journal/get-all-journals",
  journalEntryById: (id: number) => `/journal/${id}`,
  createJournalEntry: "/journal/add-journal",
  updateJournalEntry: "/journal/update-journal",
  deleteJournalEntry: (id: number) => `/journal/delete-journal/${id}`,
  bulkDeleteJournalEntry: "/journal/delete-journals",

  // Journal Entry Type Endpoints
  journalEntryType: "/journaltype/get-all-journal-types",
  journalEntryTypeById: (id: number) => `/journaltype/${id}`,
  createJournalEntryType: "/journaltype/add-journal-type",
  updateJournalEntryType: "/journaltype/update-journal-type",
  deleteJournalEntryType: (id: number) =>
    `/journaltype/delete-journal-type/${id}`,
  bulkJournalEntryType: "/journaltype/delete-journal-types",

  // Journal Template Endpoints
  journalEntryTemplate: "/journaltemplate/get-all-journal-templates",
  journalEntryTemplateById: (id: number) => `/journaltemplate/${id}`,
  createJournalTemplate: "/journaltemplate/add-journal-template",
  updateJournalTemplate: "/journaltemplate/update-journal-template",
  deleteJournalTemplate: (id: number) =>
    `/journaltemplate/delete-journal-template/${id}`,
  bulkDeleteJournalTemplate: "/journaltemplate/delete-journal-templates",

  // Currency Exchange Endpoints
  currencyExchange: "/currencyexchange/get-all",
  currencyExchangeById: (id: number) => `/currencyexchange/${id}`,
  createCurrencyExchange: "/currencyexchange/add",
  updateCurrencyExchange: "/currencyexchange/update",
  deleteCurrencyExchange: (id: number) => `/currencyexchange/delete/${id}`,
  bulkCurrencyExchange: "/currencyexchange/delete-multiple",

  // Cost Center Endpoints
  costCenter: "/costcenter/get-all-cost-center",
  costCenterById: (id: number) => `/costcenter/${id}`,
  createCostCenter: "/costcenter/add-cost-center",
  updateCostCenter: "/costcenter/update-cost-center",
  deleteCostCenter: (id: number) => `/costcenter/delete-cost-center/${id}`,
  bulkCostCenter: "/costcenter/delete-cost-centers",

  // Fiscal Year Endpoints
  fiscalYear: "/fiscalyear/get-all-fiscal-year",
  fiscalYearById: (id: number) => `/fiscalyear/${id}`,
  createFiscalYear: "/fiscalyear/add-fiscal-year",
  updateFiscalYear: "/fiscalyear/update-fiscal-year",
  deleteFiscalYear: (id: number) => `/fiscalyear/delete-fiscal-year/${id}`,
  bulkDeleteFiscalYear: "/fiscalyear/delete-fiscal-years",

  // Budget Against Endpoints
  budgetAgainst: "/budgetagainst/get-all-budget-against",
  budgetAgainstById: (id: number) => `/budgetagainst/${id}`,
  createBudgetAgainst: "/budgetagainst/add-budget-against",
  updateBudgetAgainst: "/budgetagainst/update-budget-against",
  deleteBudgetAgainst: (id: number) =>
    `/budgetagainst/delete-budget-against/${id}`,
  bulkBudgetAgainst: "/budgetagainst/delete-budget-againsts",

  // Budget Distribution Endpoints
  budgetDistribution: "/budgetdistribution/get-all-budget-distribution",
  budgetDistributionById: (id: number) => `/budgetdistribution/${id}`,
  createBudgetDistribution: "/budgetdistribution/add-budget-distribution",
  updateBudgetDistribution: "/budgetdistribution/update-budget-distribution",
  deleteBudgetDistribution: (id: number) =>
    `/budgetdistribution/delete-budget-distribution/${id}`,
  bulkBudgetDistribution: "/budgetdistribution/delete-budget-distributions",

  // Budget Management Endpoints
  budget: "/budget/get-all-budget",
  budgetById: (id: number) => `/budget/${id}`,
  createBudget: "/budget/add-budget",
  updateBudget: "/budget/update-budget",
  deleteBudget: (id: number) => `/budget/delete-budget/${id}`,
  bulkBudget: "/budget/delete-budgets",

  // Budget Variance Endpoints
  budgetVariance: "/budgetreport/get-budget-variance-report",
  budgetSummary: "/budgetreport/budget-summary-report",

  // Asset Management Endpoints
  asset: "/asset/get-all-asset",
  assetById: (id: number) => `/asset/${id}`,
  createAsset: "/asset/add-asset",
  updateAsset: "/asset/update-asset",
  deleteAsset: (id: number) => `/asset/delete-asset/${id}`,
  bulkAsset: "/asset/delete-assets",

  // Asset Category Endpoints
  assetCategory: "/assetcategory/get-all-asset-category",
  assetCategoryById: (id: number) => `/assetcategory/${id}`,
  createAssetCategory: "/assetcategory/add-asset-category",
  updateAssetCategory: "/assetcategory/update-asset-category",
  deleteAssetCategory: (id: number) =>
    `/assetcategory/delete-asset-category/${id}`,
  bulkAssetCategory: "/assetcategory/delete-asset-categories",

  // Asset Location Endpoints
  assetLocation: "/assetlocation/get-all-asset-location",
  assetLocationById: (id: number) => `/assetlocation/${id}`,
  createAssetLocation: "/assetlocation/add-asset-location",
  updateAssetLocation: "/assetlocation/update-asset-location",
  deleteAssetLocation: (id: number) =>
    `/assetlocation/delete-asset-location/${id}`,
  bulkAssetLocation: "/assetlocation/delete-asset-locations",

  checkProductAsset: (productId: number) =>
    `/asset/check-product-asset/${productId}`,
  getAssetWithoutMovement: "/asset/get-asset-list-without-movement",

  // Asset Movement Endpoints
  assetMovement: "/assetmovement/get-all-asset-movement",
  assetMovementById: (id: number) => `/assetmovement/${id}`,
  createAssetMovement: "/assetmovement/add-asset-movement",
  updateAssetMovement: "/assetmovement/update-asset-movement",
  deleteAssetMovement: (id: number) =>
    `/assetmovement/delete-asset-movement/${id}`,
  bulkAssetMovement: "/assetmovement/delete-asset-movements",

  // Asset Maintenance Endpoints
  assetMaintenance: "/assetmaintenance/get-all-asset-maintenance",
  assetMaintenanceById: (id: number) => `/assetmaintenance/${id}`,
  createAssetMaintenance: "/assetmaintenance/add-asset-maintenance",
  updateAssetMaintenance: "/assetmaintenance/update-asset-maintenance",
  deleteAssetMaintenance: (id: number) =>
    `/assetmaintenance/delete-asset-maintenance/${id}`,
  bulkAssetMaintenance: "/assetmaintenance/delete-asset-maintenances",

  // Asset Maintenance Status Endpoints
  // assetMaintenanceStatus:
  //   "/fm/asset-maintenance-status/get-all-asset-maintenance-statuses",
  // assetMaintenanceStatusById: (id: number) =>
  //   `/fm/asset-maintenance-status/get-asset-maintenance-status-by-id/${id}`,
  // createAssetMaintenanceStatus:
  //   "/fm/asset-maintenance-status/create-asset-maintenance-status",
  // updateAssetMaintenanceStatus: (id: number) =>
  //   `/fm/asset-maintenance-status/update-asset-maintenance-status/${id}`,
  // deleteAssetMaintenanceStatus: (id: number) =>
  //   `/fm/asset-maintenance-status/delete-asset-maintenance-status/${id}`,
  // bulkAssetMaintenanceStatus:
  //   "/fm/asset-maintenance-status/delete-asset-maintenance-statuses",

  // Asset Depreciation Schedule Endpoints
  assetDepreciationSchedule: "/assetdepreciation/get-all-asset-depreciation",
  assetDepreciationScheduleById: (id: number) => `/assetdepreciation/${id}`,
  // createAssetDepreciationSchedule: "/assetdepreciation/add-asset-depreciation",
  deleteAssetDepreciationSchedule: (id: number) =>
    `/assetdepreciation/delete-asset-depreciation/${id}`,
  bulkAssetDepreciationSchedule:
    "/assetdepreciation/delete-asset-depreciations",

  // Asset Repair Endpoints
  assetRepair: "/assetrepair/get-all-asset-repair",
  assetRepairById: (id: number) => `/assetrepair/${id}`,
  createAssetRepair: "/assetrepair/add-asset-repair",
  updateAssetRepair: "/assetrepair/update-asset-repair",
  deleteAssetRepair: (id: number) => `/assetrepair/delete-asset-repair/${id}`,
  bulkAssetRepair: "/assetrepair/delete-asset-repairs",

  // Asset Repair Status Endpoints
  // assetRepairStatus: "/fm/asset-repair-status/get-all-asset-repair-statuses",
  // assetRepairStatusById: (id: number) =>
  //   `/api/asset-repair-status/get-asset-repair-status-by-id/${id}`,
  // createAssetRepairStatus: "/fm/asset-repair-status/create-asset-repair-status",
  // updateAssetRepairStatus: (id: number) =>
  //   `/fm/asset-repair-status/update-asset-repair-status/${id}`,
  // deleteAssetRepairStatus: (id: number) =>
  //   `/fm/asset-repair-status/delete-asset-repair-status/${id}`,
  // bulkAssetRepairStatus: "/fm/asset-repair-status/delete-asset-repair-statuses",

  // Tax Management Endpoints
  taxCategory: "/taxcategory/get-all-tax-category",
  taxCategoryById: (id: number) => `/taxcategory/${id}`,
  createTaxCategory: "/taxcategory/add-tax-category",
  updateTaxCategory: "taxcategory/update-tax-category",
  deleteTaxCategory: (id: number) => `/taxcategory/delete-tax-category/${id}`,
  bulkTaxCategory: "/taxcategory/delete-tax-categories",

  // Tax Rule Endpoints
  taxRule: "/taxrule/get-all-tax-rule",
  taxRuleById: (id: number) => `/taxrule/${id}`,
  createTaxRule: "/taxrule/add-tax-rule",
  updateTaxRule: "/taxrule/update-tax-rule",
  deleteTaxRule: (id: number) => `/taxrule/delete-tax-rule/${id}`,
  bulkTaxRule: "/taxrule/delete-tax-rules",

  // Tax Rule Type Endpoints
  // taxRuleType: "/fm/tax-rule-type/get-all-tax-rule-types",
  // taxRuleTypeById: (id: number) =>
  //   `/fm/tax-rule-type/get-tax-rule-type-by-id/${id}`,
  // createTaxRuleType: "/fm/tax-rule-type/create-tax-rule-type",
  // updateTaxRuleType: (id: number) =>
  //   `/fm/tax-rule-type/update-tax-rule-type/${id}`,
  // deleteTaxRuleType: (id: number) =>
  //   `/fm/tax-rule-type/delete-tax-rule-type/${id}`,

  // ZATCA Category Endpoints
  zatcaCategory: "/zatcacategory/get-all-zatca-category",
  zatcaCategoryById: (id: number) => `/zatcacategory/${id}`,
  createZatcaCategory: "/zatcacategory/add-zatca-category",
  updateZatcaCategory: "/zatcacategory/update-zatca-category",
  deleteZatcaCategory: (id: number) =>
    `zatcacategory/delete-zatca-category/${id}`,
  bulkZatcaCategory: "/zatcacategory/delete--zatca-categories",

  // Tax Template Endpoints
  taxTemplate: "/taxtemplate/get-all-tax-template",
  taxTemplateById: (id: number) => `/taxtemplate/${id}`,
  createTaxTemplate: "/taxtemplate/add-tax-template",
  updateTaxTemplate: "/taxtemplate/update-tax-template",
  deleteTaxTemplate: (id: number) => `/taxtemplate/delete-tax-template/${id}`,
  bulkTaxTemplate: "/taxtemplate/delete-tax-templates",

  // Tax Template Types Endpoints
  // taxTemplateTypes: "/fm/tax-template-type/get-all-tax-template-types",
  // taxTemplateTypesById: (id: number) =>
  //   `/fm/tax-template-type/get-tax-template-type-by-id/${id}`,
  // createTaxTemplateTypes: "/fm/tax-template-type/create-tax-template-type",
  // updateTaxTemplateTypes: (id: number) =>
  //   `/fm/tax-template-type/update-tax-template-type/${id}`,
  // deleteTaxTemplateTypes: (id: number) =>
  //   `/fm/tax-template-type/delete-tax-template-type/${id}`,

  // Tax Type Endpoints
  // taxType: "/fm/tax-type/get-all-tax-types",
  // taxTypeById: (id: number) => `/fm/tax-type/get-tax-type-by-id/${id}`,
  // createTaxType: "/fm/tax-type/create-tax-type",
  // updateTaxType: (id: number) => `/fm/tax-type/update-tax-type/${id}`,
  // deleteTaxType: (id: number) => `/fm/tax-type/delete-tax-type/${id}`,

  // Payment Mode Endpoints
  modeOfPayment: "/modeofpayment/get-all",
  modeOfPaymentById: (id: number) => `/modeofpayment/${id}`,
  createModeOfPayment: "/modeofpayment/add-mode-of-payment",
  updateModeOfPayment: "/modeofpayment/update-mode-of-payment",
  deleteModeOfPayment: (id: number) => `/modeofpayment/delete/${id}`,
  bulkModeOfPayment: "/modeofpayment/delete-multiple",

  // Payment Request Type Endpoints
  // paymentRequestType: "/fm/payment-request-type/get-payment-request-types",
  // paymentRequestTypeById: (id: number) =>
  //   `/fm/payment-request-type/get-payment-request-type-by-id/${id}`,
  // createPaymentRequestType:
  //   "/fm/payment-request-type/create-payment-request-type",
  // updatePaymentRequestType: (id: number) =>
  //   `/fm/payment-request-type/update-payment-request-type/${id}`,
  // deletePaymentRequestType: (id: number) =>
  //   `/fm/payment-request-type/delete-payment-request-type/${id}`,

  // Payment Mode Type Endpoints
  // modeOfPaymentType: "/fm/mode-of-payment-type/get-all-mode-of-payment-types",
  // modeOfPaymentTypeById: (id: number) =>
  //   `/fm/mode-of-payment-type/get-mode-of-payment-type-by-id/${id}`,
  // createModeOfPaymentType:
  //   "/fm/mode-of-payment-type/create-mode-of-payment-type",
  // updateModeOfPaymentType: (id: number) =>
  //   `/fm/mode-of-payment-type/update-mode-of-payment-type/${id}`,
  // deleteModeOfPaymentType: (id: number) =>
  //   `/fm/mode-of-payment-type/delete-mode-of-payment-type/${id}`,

  // Payment Request Endpoints
  paymentRequest: "/paymentrequest/get-all",
  paymentRequestById: (id: number) => `/paymentrequest/${id}`,
  createPaymentRequest: "/paymentrequest/add-payment-request",
  updatePaymentRequest: "/paymentrequest/update-payment-request/",
  updatePaymentRequestStatus: "/paymentrequest/update-request-status",
  deletePaymentRequest: (id: number) => `/paymentrequest/delete/${id}`,
  bulkPaymentRequest: "/paymentrequest/delete-multiple",

  // Payment Endpoints
  payment: "/payment/get-all-payments",
  paymentById: (id: number) => `/payment/${id}`,
  createPayment: "/payment/add-payment",
  updatePayment: "/payment/update-payment",
  deletePayment: (id: number) => `/payment/delete-payment/${id}`,
  bulkPayment: "/payment/delete-payments",

  // Stripe Payment Endpoints
  createStripePayment: "/stripepayment/checkout-payment",

  // Bank Management Endpoints
  bank: "/bank/get-all-bank",
  bankById: (id: number) => `/bank/${id}`,
  createBank: "/bank/add-bank",
  updateBank: "/bank/update-bank",
  deleteBank: (id: number) => `/bank/delete-bank/${id}`,
  bulkBank: "/bank/delete-banks",

  // Bank Account Endpoints
  bankAccount: "/bankaccount/get-all-bank-account",
  bankAccountById: (id: number) => `/bankaccount/${id}`,
  createBankAccount: "/bankaccount/add-bank-account",
  updateBankAccount: "/bankaccount/update-bank-account",
  deleteBankAccount: (id: number) => `/bankaccount/delete-bank-account/${id}`,
  bulkBankAccount: "/bankaccount/delete-bank-accounts",

  // Bank Account Type Endpoints
  bankAccountType: "/bankaccounttype/get-all-bank-account-type",
  bankAccountTypeById: (id: number) => `/bankaccounttype/${id}`,
  createBankAccountType: "/bankaccounttype/add-bank-account-type",
  updateBankAccountType: "/bankaccounttype/update-bank-account-type",
  deleteBankAccountType: (id: number) =>
    `/bankaccounttype/delete-bank-account-type/${id}`,
  bulkBankAccountType: "/bankaccounttype/delete-bank-account-types",

  // Bank Transaction Endpoints
  bankTransaction: "/banktransaction/get-all-bank-transaction",
  bankTransactionById: (id: number) => `/banktransaction/${id}`,
  createBankTransaction: "/banktransaction/add-bank-transaction",
  updateBankTransaction: "/banktransaction/update-bank-transaction",
  deleteBankTransaction: (id: number) =>
    `/banktransaction/delete-bank-transaction/${id}`,
  bulkBankTransaction: "/banktransaction/delete-bank-transactions",

  // Bank Transaction Status Endpoints
  // bankTransactionStatus:
  //   "/fm/bank-transaction-status/get-bank-transaction-status",
  // bankTransactionStatusById: (id: number) =>
  //   `/fm/bank-transaction-status/get-bank-transaction-status-by-id/${id}`,
  // createBankTransactionStatus:
  //   "/fm/bank-transaction-status/create-bank-transaction-status",
  // updateBankTransactionStatus: (id: number) =>
  //   `/fm/bank-transaction-status/update-bank-transaction-status/${id}`,
  // deleteBankTransactionStatus: (id: number) =>
  //   `/fm/bank-transaction-status/delete-bank-transaction-status/${id}`,
  // bulkBankTransactionStatus:
  //   "/fm/bank-transaction-status/delete-bank-transaction-statuses",

  // Party Type Endpoints
  // partyType: "/fm/party-type/get-party-types",
  // partyTypeById: (id: number) => `/fm/party-type/get-party-type-by-id/${id}`,
  // createPartyType: "/fm/party-type/create-party-type",
  // updatePartyType: (id: number) => `/fm/party-type/update-party-type/${id}`,
  // deletePartyType: (id: number) => `/fm/party-type/delete-party-type/${id}`,

  // Bank Statement Endpoints
  importBankStatement: "/bankstatement/get-all-bank-statement",
  importBankStatementById: (id: number) => `/bankstatement/${id}`,
  createImportBankStatement: "/bankstatement/add-bank-statement",
  updateImportBankStatement: "/bankstatement/update-bank-statement",
  deleteImportBankStatement: (id: number) =>
    `/bankstatement/delete-bank-statement/${id}`,
  bulkImportBankStatement: "/bankstatement/delete-bank-statements",

  // Bank Clearance Endpoints
  bankClearance: "/bankclearance/get-all-bank-clearance",
  updateBankClearanceStatus: "/bankclearance/update-clearence-status",
  updateBankClearanceStatusBatch:
    "/bankclearance/update-clearance-status-batch",

  // Bank Reconciliation Endpoints
  bankReconciliation: "/bankreconciliation/get-all-unreconciled-transaction",
  updateReconciliation: (id: number) =>
    `/bankreconciliation/update-unreconciled-transaction/${id}`,
  bankUnreconciledPayment: "/bankreconciliation/get-all-unreconciled-payment",

  // FIXME: Rmove Transaction Payment Type Endpoints
  // transactionPaymentType:
  //   "/fm/transaction-payment-type/get-transaction-payment-types",
  // transactionPaymentTypeById: (id: number) =>
  //   `/fm/transaction-payment-type/get-transaction-payment-type-by-id/${id}`,
  // createTransactionPaymentType:
  //   "/fm/transaction-payment-type/create-transaction-payment-type",
  // updateTransactionPaymentType: (id: number) =>
  //   `/fm/transaction-payment-type/update-transaction-payment-type/${id}`,
  // deleteTransactionPaymentType: (id: number) =>
  //   `/fm/transaction-payment-type/delete-transaction-payment-type/${id}`,
  // bulkTransactionPaymentType:
  //   "/fm/transaction-payment-type/delete-transaction-payment-types",

  // Terms And Conditions Endpoints
  termsAndConditions:
    "/compliancetermsandcondition/get-all-compliance-terms-and-condition",
  termsAndConditionsById: (id: number) => `/compliancetermsandcondition/${id}`,
  createTermsAndConditions:
    "/compliancetermsandcondition/add-compliance-terms-and-condition",
  updateTermsAndConditions:
    "/compliancetermsandcondition/update-compliance-terms-and-condition",
  deleteTermsAndConditions: (id: number) =>
    `/compliancetermsandcondition/delete-compliance-terms-and-condition/${id}`,
  bulkTermsAndConditions:
    "/compliancetermsandcondition/delete-compliance-terms-and-conditions",

  // Financial Report Endpoints
  generalLedger: "/accountingreport/general-ledger-report",
  balanceSheet: "/paymentreport/get-balance-sheet-report",
  cashFlow: "/dashboard/cash-flow",
  fixedAssetRegister: "/assetreport/get-fixed-asset-register-report",
  assetDepreciationLedger: "/assetreport/get-asset-depreciation-ledger-report",
  assetMovementHistory: "assetreport/get-asset-movement-history-report",
  assetRepairHistory: "assetreport/get-asset-repair-history-report",
  trialBalance: "/accountingreport/trial-balance-report",
  profitAndLoss: "/paymentreport/get-profit-and-loss-statement-report",
  accountPayable: "/fm/account-payable/get-account-payable",
  accountReceivable: "/fm/account-receivable/get-account-receivable",
  bankAccountSummary: "/bankingreport/bank-account-summary",
  monthlyBankTransactions: "/bankingreport/monthly-bank-transactions",
  bankStatementReport: "/bankingreport/bank-statement-report/last-6-months",
  paymentSummary: "/paymentreport/payment-summary-by-company",
  dailyPayments: "/paymentreport/all-payment-history",

  // Dashboard Endpoints
  // incomeExpensesProfit: "/fm/dashboard/get-income-expenses-and-profit",
  // incomeStatement: "/fm/dashboard/get-income-statement",
  // topFiveCompanies: "/fm/dashboard/get-top-five-companies-total-income",
  // topBankTransactionsByPeriod: "/fm/dashboard/get-bank-transactions-by-period",
  // bankAccountBalance: "/fm/dashboard/get-account-balance",

  topCompanyIncome: "dashboard/get-top-company-income-report",
  companyWiseProfit: "dashboard/get-company-wise-profit-report",
  topBankAccount: "/dashboard/top-bank-accounts-with-history",
  cashFlowSummary: "/dashboard/cash-flow",
}
