import { routes } from "@/config/routes"

// Note: do not add href in the label object, it is rendering as label
export const pageLinks = [
  // label start
  {
    name: "sidebar-menu-fms",
  },
  // label end
  {
    name: "sidebar-menu-dashboard",
    href: routes.fms.dashboard,
  },
  {
    name: "sidebar-menu-coa",
    href: routes.fms.coa,
  },
  {
    name: "sidebar-menu-create-coa",
    href: routes.fms.createCOA,
  },
  {
    name: "sidebar-menu-general-ledger",
    href: routes.fms.generalLedger,
  },
  {
    name: "sidebar-menu-journal-entry",
    href: routes.fms.journalEntry,
  },
  {
    name: "sidebar-menu-create-journal-entry",
    href: routes.fms.createJournal,
  },
  {
    name: "sidebar-menu-journal-template",
    href: routes.fms.journalTemplate,
  },
  {
    name: "sidebar-menu-create-journal-template",
    href: routes.fms.createJournalTemplate,
  },
  {
    name: "sidebar-menu-company",
    href: routes.fms.company,
  },
  {
    name: "sidebar-menu-create-company",
    href: routes.fms.createCompany,
  },
  {
    name: "sidebar-menu-country",
    href: routes.fms.country,
  },
  {
    name: "sidebar-menu-create-country",
    href: routes.fms.createCountry,
  },
  {
    name: "sidebar-menu-assets",
    href: routes.fms.asset,
  },
  {
    name: "sidebar-menu-new-assets",
    href: routes.fms.createAsset,
  },
  {
    name: "sidebar-menu-bank",
    href: routes.fms.bank,
  },
  {
    name: "sidebar-menu-new-banks",
    href: routes.fms.newBanks,
  },
  {
    name: "sidebar-menu-bank-transactions",
    href: routes.fms.bankTransactions,
  },
  {
    name: "sidebar-menu-reconciliation",
    href: routes.fms.reconciliation,
  },
  {
    name: "sidebar-menu-budget",
    href: routes.fms.budget,
  },
  {
    name: "sidebar-menu-create-budget",
    href: routes.fms.createBudget,
  },
  {
    name: "sidebar-menu-budget-template",
    href: routes.fms.budgetDistribution,
  },
  {
    name: "sidebar-menu-create-budget-template",
    href: routes.fms.createBudgetDistribution,
  },
  {
    name: "sidebar-menu-account-receivable",
    href: routes.fms.accountReceivable,
  },
  {
    name: "sidebar-menu-account-payable",
    href: routes.fms.accountPayable,
  },
  {
    name: "sidebar-menu-payments",
    href: routes.fms.payments,
  },
  {
    name: "sidebar-menu-make-payments",
    href: routes.fms.makePayments,
  },
  {
    name: "sidebar-menu-mode-of-payment",
    href: routes.fms.modeOfPayment,
  },
  {
    name: "sidebar-menu-create-mode-of-payment",
    href: routes.fms.createModeOfPayment,
  },
  {
    name: "sidebar-menu-currency",
    href: routes.fms.currency,
  },
  {
    name: "sidebar-menu-create-currency",
    href: routes.fms.createCurrency,
  },
  {
    name: "sidebar-menu-currency-exchange",
    href: routes.fms.currencyExchange,
  },
  {
    name: "sidebar-menu-tax-rule",
    href: routes.fms.taxRule,
  },
  {
    name: "sidebar-menu-financial-reporting",
    href: routes.fms.financialReporting,
  },
  {
    name: "sidebar-menu-cost-center",
    href: routes.fms.costCenter,
  },
  {
    name: "sidebar-menu-create-cost-center",
    href: routes.fms.createCostCenter,
  },
  {
    name: "sidebar-menu-budget-against",
    href: routes.fms.budgetAgainst,
  },
  {
    name: "sidebar-menu-create-budget-against",
    href: routes.fms.createBudgetAgainst,
  },
  {
    name: "sidebar-menu-tax-template",
    href: routes.fms.taxTemplate,
  },
  {
    name: "sidebar-menu-create-tax-template",
    href: routes.fms.createTaxTemplate,
  },
  {
    name: "sidebar-menu-tax-rule",
    href: routes.fms.taxRule,
  },
  {
    name: "sidebar-menu-create-tax-rule",
    href: routes.fms.createTaxRule,
  },
  {
    name: "sidebar-menu-tax-category",
    href: routes.fms.taxCategory,
  },
  {
    name: "sidebar-menu-create-tax-category",
    href: routes.fms.createTaxCategory,
  },
]
