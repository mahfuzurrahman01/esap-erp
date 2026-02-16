export const FMSApiEndpoints = {
  // Country Management Endpoints
  country: "/fm2/v1/country/get-all-country",
  countryById: (id: number) => `/fm2/v1/country/${id}`,
  createCountry: "/fm2/v1/country/add-country",
  updateCountry: "/fm2/v1/country/update-country",
  deleteCountry: (id: number) => `/fm2/v1/country/delete-country/${id}`,
  bulkDeleteCountry: "/fm2/v1/country/delete-countries",

  // Currency Management Endpoints
  currency: "/fm2/v1/currency/get-all-currency",
  currencyById: (id: number) => `/fm2/v1/currency/${id}`,
  createCurrency: "/fm2/v1/currency/add-currency",
  updateCurrency: "/fm2/v1/currency/update-currency",
  deleteCurrency: (id: number) => `/fm2/v1/currency/delete-currency/${id}`,
  bulkCurrency: "/fm2/v1/currency/delete-currencies",

  // Company Management Endpoints
  company: "/fm2/v1/company/get-all-company",
  companyById: (id: number) => `/fm2/v1/company/${id}`,
  createCompany: "/fm2/v1/company/add-company",
  updateCompany: "/fm2/v1/company/update-company",
  deleteCompany: (id: number) => `/fm2/v1/company/delete-company/${id}`,
  bulkCompany: "/fm2/v1/company/delete-companies",

  // Chart of Accounts Endpoints
  COA: "/fm2/v1/chartofaccount/get-all-chart-of-accounts",
  COAById: (id: number) => `/fm2/v1/chartofaccount/${id}`,
  createCOA: "/fm2/v1/chartofaccount/add-chart-of-account",
  updateCOA: "/fm2/v1/chartofaccount/update-chart-of-account",
  deleteCOA: (id: number) => `/fm2/v1/chartofaccount/delete-chart-of-account/${id}`,
  bulkCOA: "/fm2/v1/chartofaccount/delete-chart-of-accounts",

  // Accounting Types Endpoints
  accountTypes: "/fm2/v1/accounttype/get-all-accounting-type",
  accountTypeById: (id: number) => `/fm2/v1/accounttype/${id}`,
  createAccountType: "/fm2/v1/accounttype/add-accounting-type",
  updateAccountType: "/fm2/v1/accounttype/update-accounting-type",
  deleteAccountType: (id: number) =>
    `/fm2/v1/accounttype/delete-accounting-type/${id}`,
  useBulkDeleteAccountType: "/fm2/v1/accounttype/delete-accounting-types",

  // Journal Entry Endpoints
  journalEntry: "/fm2/v1/journal/get-all-journals",
  journalEntryById: (id: number) => `/fm2/v1/journal/${id}`,
  createJournalEntry: "/fm2/v1/journal/add-journal",
  updateJournalEntry: "/fm2/v1/journal/update-journal",
  deleteJournalEntry: (id: number) => `/fm2/v1/journal/delete-journal/${id}`,
  bulkDeleteJournalEntry: "/fm2/v1/journal/delete-journals",

  // Journal Entry Type Endpoints
  journalEntryType: "/fm2/v1/journaltype/get-all-journal-types",
  journalEntryTypeById: (id: number) => `/fm2/v1/journaltype/${id}`,
  createJournalEntryType: "/fm2/v1/journaltype/add-journal-type",
  updateJournalEntryType: "/fm2/v1/journaltype/update-journal-type",
  deleteJournalEntryType: (id: number) =>
    `/fm2/v1/journaltype/delete-journal-type/${id}`,
  bulkJournalEntryType: "/fm2/v1/journaltype/delete-journal-types",

  // Journal Template Endpoints
  journalEntryTemplate: "/fm2/v1/journaltemplate/get-all-journal-templates",
  journalEntryTemplateById: (id: number) => `/fm2/v1/journaltemplate/${id}`,
  createJournalTemplate: "/fm2/v1/journaltemplate/add-journal-template",
  updateJournalTemplate: "/fm2/v1/journaltemplate/update-journal-template",
  deleteJournalTemplate: (id: number) =>
    `/fm2/v1/journaltemplate/delete-journal-template/${id}`,
  bulkDeleteJournalTemplate: "/fm2/v1/journaltemplate/delete-journal-templates",

  // Currency Exchange Endpoints
  currencyExchange: "/fm2/v1/currencyexchange/get-all",
  currencyExchangeById: (id: number) => `/fm2/v1/currencyexchange/${id}`,
  createCurrencyExchange: "/fm2/v1/currencyexchange/add",
  updateCurrencyExchange: "/fm2/v1/currencyexchange/update",
  deleteCurrencyExchange: (id: number) => `/fm2/v1/currencyexchange/delete/${id}`,
  bulkCurrencyExchange: "/fm2/v1/currencyexchange/delete-multiple",

  // Cost Center Endpoints
  costCenter: "/fm2/v1/costcenter/get-all-cost-center",
  costCenterById: (id: number) => `/fm2/v1/costcenter/${id}`,
  createCostCenter: "/fm2/v1/costcenter/add-cost-center",
  updateCostCenter: "/fm2/v1/costcenter/update-cost-center",
  deleteCostCenter: (id: number) => `/fm2/v1/costcenter/delete-cost-center/${id}`,
  bulkCostCenter: "/fm2/v1/costcenter/delete-cost-centers",

  // Fiscal Year Endpoints
  fiscalYear: "/fm2/v1/fiscalyear/get-all-fiscal-year",
  fiscalYearById: (id: number) => `/fm2/v1/fiscalyear/${id}`,
  createFiscalYear: "/fm2/v1/fiscalyear/add-fiscal-year",
  updateFiscalYear: "/fm2/v1/fiscalyear/update-fiscal-year",
  deleteFiscalYear: (id: number) => `/fm2/v1/fiscalyear/delete-fiscal-year/${id}`,
  bulkDeleteFiscalYear: "/fm2/v1/fiscalyear/delete-fiscal-years",

  // Budget Against Endpoints
  budgetAgainst: "/fm2/v1/budgetagainst/get-all-budget-against",
  budgetAgainstById: (id: number) => `/fm2/v1/budgetagainst/${id}`,
  createBudgetAgainst: "/fm2/v1/budgetagainst/add-budget-against",
  updateBudgetAgainst: "/fm2/v1/budgetagainst/update-budget-against",
  deleteBudgetAgainst: (id: number) =>
    `/fm2/v1/budgetagainst/delete-budget-against/${id}`,
  bulkBudgetAgainst: "/fm2/v1/budgetagainst/delete-budget-againsts",

  // Budget Distribution Endpoints
  budgetDistribution: "/fm2/v1/budgetdistribution/get-all-budget-distribution",
  budgetDistributionById: (id: number) => `/fm2/v1/budgetdistribution/${id}`,
  createBudgetDistribution: "/fm2/v1/budgetdistribution/add-budget-distribution",
  updateBudgetDistribution: "/fm2/v1/budgetdistribution/update-budget-distribution",
  deleteBudgetDistribution: (id: number) =>
    `/fm2/v1/budgetdistribution/delete-budget-distribution/${id}`,
  bulkBudgetDistribution: "/fm2/v1/budgetdistribution/delete-budget-distributions",

  // Budget Management Endpoints
  budget: "/fm2/v1/budget/get-all-budget",
  budgetById: (id: number) => `/fm2/v1/budget/${id}`,
  createBudget: "/fm2/v1/budget/add-budget",
  updateBudget: "/fm2/v1/budget/update-budget",
  deleteBudget: (id: number) => `/fm2/v1/budget/delete-budget/${id}`,
  bulkBudget: "/fm2/v1/budget/delete-budgets",

  // Budget Variance Endpoints
  budgetVariance: "/fm2/v1/budgetreport/get-budget-variance-report",
  budgetSummary: "/fm2/v1/budgetreport/budget-summary-report",

  // Asset Management Endpoints
  asset: "/fm2/v1/asset/get-all-asset",
  assetById: (id: number) => `/fm2/v1/asset/${id}`,
  createAsset: "/fm2/v1/asset/add-asset",
  updateAsset: "/fm2/v1/asset/update-asset",
  deleteAsset: (id: number) => `/fm2/v1/asset/delete-asset/${id}`,
  bulkAsset: "/fm2/v1/asset/delete-assets",

  // Asset Category Endpoints
  assetCategory: "/fm2/v1/assetcategory/get-all-asset-category",
  assetCategoryById: (id: number) => `/fm2/v1/assetcategory/${id}`,
  createAssetCategory: "/fm2/v1/assetcategory/add-asset-category",
  updateAssetCategory: "/fm2/v1/assetcategory/update-asset-category",
  deleteAssetCategory: (id: number) =>
    `/fm2/v1/assetcategory/delete-asset-category/${id}`,
  bulkAssetCategory: "/fm2/v1/assetcategory/delete-asset-categories",

  // Asset Location Endpoints
  assetLocation: "/fm2/v1/assetlocation/get-all-asset-location",
  assetLocationById: (id: number) => `/fm2/v1/assetlocation/${id}`,
  createAssetLocation: "/fm2/v1/assetlocation/add-asset-location",
  updateAssetLocation: "/fm2/v1/assetlocation/update-asset-location",
  deleteAssetLocation: (id: number) =>
    `/fm2/v1/assetlocation/delete-asset-location/${id}`,
  bulkAssetLocation: "/fm2/v1/assetlocation/delete-asset-locations",

  checkProductAsset: (productId: number) =>
    `/fm2/v1/asset/check-product-asset/${productId}`,
  getAssetWithoutMovement: "/fm2/v1/asset/get-asset-list-without-movement",

  // Asset Movement Endpoints
  assetMovement: "/fm2/v1/assetmovement/get-all-asset-movement",
  assetMovementById: (id: number) => `/fm2/v1/assetmovement/${id}`,
  createAssetMovement: "/fm2/v1/assetmovement/add-asset-movement",
  updateAssetMovement: "/fm2/v1/assetmovement/update-asset-movement",
  deleteAssetMovement: (id: number) =>
    `/fm2/v1/assetmovement/delete-asset-movement/${id}`,
  bulkAssetMovement: "/fm2/v1/assetmovement/delete-asset-movements",

  // Asset Maintenance Endpoints
  assetMaintenance: "/fm2/v1/assetmaintenance/get-all-asset-maintenance",
  assetMaintenanceById: (id: number) => `/fm2/v1/assetmaintenance/${id}`,
  createAssetMaintenance: "/fm2/v1/assetmaintenance/add-asset-maintenance",
  updateAssetMaintenance: "/fm2/v1/assetmaintenance/update-asset-maintenance",
  deleteAssetMaintenance: (id: number) =>
    `/fm2/v1/assetmaintenance/delete-asset-maintenance/${id}`,
  bulkAssetMaintenance: "/fm2/v1/assetmaintenance/delete-asset-maintenances",

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
  assetDepreciationSchedule: "/fm2/v1/assetdepreciation/get-all-asset-depreciation",
  assetDepreciationScheduleById: (id: number) => `/fm2/v1/assetdepreciation/${id}`,
  // createAssetDepreciationSchedule: "/fm2/v1/assetdepreciation/add-asset-depreciation",
  deleteAssetDepreciationSchedule: (id: number) =>
    `/fm2/v1/assetdepreciation/delete-asset-depreciation/${id}`,
  bulkAssetDepreciationSchedule:
    "/fm2/v1/assetdepreciation/delete-asset-depreciations",

  // Asset Repair Endpoints
  assetRepair: "/fm2/v1/assetrepair/get-all-asset-repair",
  assetRepairById: (id: number) => `/fm2/v1/assetrepair/${id}`,
  createAssetRepair: "/fm2/v1/assetrepair/add-asset-repair",
  updateAssetRepair: "/fm2/v1/assetrepair/update-asset-repair",
  deleteAssetRepair: (id: number) => `/fm2/v1/assetrepair/delete-asset-repair/${id}`,
  bulkAssetRepair: "/fm2/v1/assetrepair/delete-asset-repairs",

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
  taxCategory: "/fm2/v1/taxcategory/get-all-tax-category",
  taxCategoryById: (id: number) => `/fm2/v1/taxcategory/${id}`,
  createTaxCategory: "/fm2/v1/taxcategory/add-tax-category",
  updateTaxCategory: "/fm2/v1/taxcategory/update-tax-category",
  deleteTaxCategory: (id: number) => `/fm2/v1/taxcategory/delete-tax-category/${id}`,
  bulkTaxCategory: "/fm2/v1/taxcategory/delete-tax-categories",

  // Tax Rule Endpoints
  taxRule: "/fm2/v1/taxrule/get-all-tax-rule",
  taxRuleById: (id: number) => `/fm2/v1/taxrule/${id}`,
  createTaxRule: "/fm2/v1/taxrule/add-tax-rule",
  updateTaxRule: "/fm2/v1/taxrule/update-tax-rule",
  deleteTaxRule: (id: number) => `/fm2/v1/taxrule/delete-tax-rule/${id}`,
  bulkTaxRule: "/fm2/v1/taxrule/delete-tax-rules",

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
  zatcaCategory: "/fm2/v1/zatcacategory/get-all-zatca-category",
  zatcaCategoryById: (id: number) => `/fm2/v1/zatcacategory/${id}`,
  createZatcaCategory: "/fm2/v1/zatcacategory/add-zatca-category",
  updateZatcaCategory: "/fm2/v1/zatcacategory/update-zatca-category",
  deleteZatcaCategory: (id: number) =>
    `/fm2/v1/zatcacategory/delete-zatca-category/${id}`,
  bulkZatcaCategory: "/fm2/v1/zatcacategory/delete--zatca-categories",

  // Tax Template Endpoints
  taxTemplate: "/fm2/v1/taxtemplate/get-all-tax-template",
  taxTemplateById: (id: number) => `/fm2/v1/taxtemplate/${id}`,
  createTaxTemplate: "/fm2/v1/taxtemplate/add-tax-template",
  updateTaxTemplate: "/fm2/v1/taxtemplate/update-tax-template",
  deleteTaxTemplate: (id: number) => `/fm2/v1/taxtemplate/delete-tax-template/${id}`,
  bulkTaxTemplate: "/fm2/v1/taxtemplate/delete-tax-templates",

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
  modeOfPayment: "/fm2/v1/modeofpayment/get-all",
  modeOfPaymentById: (id: number) => `/fm2/v1/modeofpayment/${id}`,
  createModeOfPayment: "/fm2/v1/modeofpayment/add-mode-of-payment",
  updateModeOfPayment: "/fm2/v1/modeofpayment/update-mode-of-payment",
  deleteModeOfPayment: (id: number) => `/fm2/v1/modeofpayment/delete/${id}`,
  bulkModeOfPayment: "/fm2/v1/modeofpayment/delete-multiple",

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
  paymentRequest: "/fm2/v1/paymentrequest/get-all",
  paymentRequestById: (id: number) => `/fm2/v1/paymentrequest/${id}`,
  createPaymentRequest: "/fm2/v1/paymentrequest/add-payment-request",
  updatePaymentRequest: "/fm2/v1/paymentrequest/update-payment-request/",
  updatePaymentRequestStatus: "/fm2/v1/paymentrequest/update-request-status",
  deletePaymentRequest: (id: number) => `/fm2/v1/paymentrequest/delete/${id}`,
  bulkPaymentRequest: "/fm2/v1/paymentrequest/delete-multiple",

  // Payment Endpoints
  payment: "/fm2/v1/payment/get-all-payments",
  paymentById: (id: number) => `/fm2/v1/payment/${id}`,
  createPayment: "/fm2/v1/payment/add-payment",
  updatePayment: "/fm2/v1/payment/update-payment",
  deletePayment: (id: number) => `/fm2/v1/payment/delete-payment/${id}`,
  bulkPayment: "/fm2/v1/payment/delete-payments",

  // Stripe Payment Endpoints
  createStripePayment: "/fm2/v1/stripepayment/checkout-payment",

  // Bank Management Endpoints
  bank: "/fm2/v1/bank/get-all-bank",
  bankById: (id: number) => `/fm2/v1/bank/${id}`,
  createBank: "/fm2/v1/bank/add-bank",
  updateBank: "/fm2/v1/bank/update-bank",
  deleteBank: (id: number) => `/fm2/v1/bank/delete-bank/${id}`,
  bulkBank: "/fm2/v1/bank/delete-banks",

  // Bank Account Endpoints
  bankAccount: "/fm2/v1/bankaccount/get-all-bank-account",
  bankAccountById: (id: number) => `/fm2/v1/bankaccount/${id}`,
  createBankAccount: "/fm2/v1/bankaccount/add-bank-account",
  updateBankAccount: "/fm2/v1/bankaccount/update-bank-account",
  deleteBankAccount: (id: number) => `/fm2/v1/bankaccount/delete-bank-account/${id}`,
  bulkBankAccount: "/fm2/v1/bankaccount/delete-bank-accounts",

  // Bank Account Type Endpoints
  bankAccountType: "/fm2/v1/bankaccounttype/get-all-bank-account-type",
  bankAccountTypeById: (id: number) => `/fm2/v1/bankaccounttype/${id}`,
  createBankAccountType: "/fm2/v1/bankaccounttype/add-bank-account-type",
  updateBankAccountType: "/fm2/v1/bankaccounttype/update-bank-account-type",
  deleteBankAccountType: (id: number) =>
    `/fm2/v1/bankaccounttype/delete-bank-account-type/${id}`,
  bulkBankAccountType: "/fm2/v1/bankaccounttype/delete-bank-account-types",

  // Bank Transaction Endpoints
  bankTransaction: "/fm2/v1/banktransaction/get-all-bank-transaction",
  bankTransactionById: (id: number) => `/fm2/v1/banktransaction/${id}`,
  createBankTransaction: "/fm2/v1/banktransaction/add-bank-transaction",
  updateBankTransaction: "/fm2/v1/banktransaction/update-bank-transaction",
  deleteBankTransaction: (id: number) =>
    `/fm2/v1/banktransaction/delete-bank-transaction/${id}`,
  bulkBankTransaction: "/fm2/v1/banktransaction/delete-bank-transactions",

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
  importBankStatement: "/fm2/v1/bankstatement/get-all-bank-statement",
  importBankStatementById: (id: number) => `/fm2/v1/bankstatement/${id}`,
  createImportBankStatement: "/fm2/v1/bankstatement/add-bank-statement",
  updateImportBankStatement: "/fm2/v1/bankstatement/update-bank-statement",
  deleteImportBankStatement: (id: number) =>
    `/fm2/v1/bankstatement/delete-bank-statement/${id}`,
  bulkImportBankStatement: "/fm2/v1/bankstatement/delete-bank-statements",

  // Bank Clearance Endpoints
  bankClearance: "/fm2/v1/bankclearance/get-all-bank-clearance",
  updateBankClearanceStatus: "/fm2/v1/bankclearance/update-clearence-status",
  updateBankClearanceStatusBatch:
    "/fm2/v1/bankclearance/update-clearance-status-batch",

  // Bank Reconciliation Endpoints
  bankReconciliation: "/fm2/v1/bankreconciliation/get-all-unreconciled-transaction",
  updateReconciliation: (id: number) =>
    `/fm2/v1/bankreconciliation/update-unreconciled-transaction/${id}`,
  bankUnreconciledPayment: "/fm2/v1/bankreconciliation/get-all-unreconciled-payment",

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
    "/fm2/v1/compliancetermsandcondition/get-all-compliance-terms-and-condition",
  termsAndConditionsById: (id: number) => `/fm2/v1/compliancetermsandcondition/${id}`,
  createTermsAndConditions:
    "/fm2/v1/compliancetermsandcondition/add-compliance-terms-and-condition",
  updateTermsAndConditions:
    "/fm2/v1/compliancetermsandcondition/update-compliance-terms-and-condition",
  deleteTermsAndConditions: (id: number) =>
    `/fm2/v1/compliancetermsandcondition/delete-compliance-terms-and-condition/${id}`,
  bulkTermsAndConditions:
    "/fm2/v1/compliancetermsandcondition/delete-compliance-terms-and-conditions",

  // Financial Report Endpoints
  generalLedger: "/fm2/v1/accountingreport/general-ledger-report",
  balanceSheet: "/fm2/v1/paymentreport/get-balance-sheet-report",
  cashFlow: "/fm2/v1/dashboard/cash-flow",
  fixedAssetRegister: "/fm2/v1/assetreport/get-fixed-asset-register-report",
  assetDepreciationLedger: "/fm2/v1/assetreport/get-asset-depreciation-ledger-report",
  assetMovementHistory: "/fm2/v1/assetreport/get-asset-movement-history-report",
  assetRepairHistory: "/fm2/v1/assetreport/get-asset-repair-history-report",
  trialBalance: "/fm2/v1/accountingreport/trial-balance-report",
  profitAndLoss: "/fm2/v1/paymentreport/get-profit-and-loss-statement-report",
  accountPayable: "/fm2/v1/account-payable/get-account-payable",
  accountReceivable: "/fm2/v1/account-receivable/get-account-receivable",
  bankAccountSummary: "/fm2/v1/bankingreport/bank-account-summary",
  monthlyBankTransactions: "/fm2/v1/bankingreport/monthly-bank-transactions",
  bankStatementReport: "/fm2/v1/bankingreport/bank-statement-report/last-6-months",
  paymentSummary: "/fm2/v1/paymentreport/payment-summary-by-company",
  dailyPayments: "/fm2/v1/paymentreport/all-payment-history",

  // Dashboard Endpoints
  // incomeExpensesProfit: "/fm/dashboard/get-income-expenses-and-profit",
  // incomeStatement: "/fm/dashboard/get-income-statement",
  // topFiveCompanies: "/fm/dashboard/get-top-five-companies-total-income",
  // topBankTransactionsByPeriod: "/fm/dashboard/get-bank-transactions-by-period",
  // bankAccountBalance: "/fm/dashboard/get-account-balance",

  topCompanyIncome: "/fm2/v1/dashboard/get-top-company-income-report",
  companyWiseProfit: "/fm2/v1/dashboard/get-company-wise-profit-report",
  topBankAccount: "/fm2/v1/dashboard/top-bank-accounts-with-history",
  cashFlowSummary: "/fm2/v1/dashboard/cash-flow",
}
