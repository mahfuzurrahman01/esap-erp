import AccountingIcon from "@/components/icons/accounting"
import AssetsIcon from "@/components/icons/assets"
import BankingIcon from "@/components/icons/banking"
import BudgetingIcon from "@/components/icons/budgeting"
import DashboardIcon from "@/components/icons/dashboard"
import PayrollConfigurationIcon from "@/components/icons/hrms/payroll-configuration"
import PaymentsIcon from "@/components/icons/paymets"
import ReportingIcon from "@/components/icons/reporting"
import TaxIcon from "@/components/icons/tax"
import { routes } from "@/config/routes"

import { ADMIN_MENU_ROLES } from "../fixed-menu-items/user-roles"
import { FMS_MENU_ROLES } from "../fixed-menu-items/user-roles"

export const fmsMenuItems = [
  // label start
  {
    name: "sidebar-menu-fm",
  },
  // label end
  {
    name: "sidebar-menu-dashboard",
    href: routes.fms.dashboard,
    icon: <DashboardIcon className="h-6 w-6" />,
    role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
  },
  {
    name: "sidebar-menu-accounting",
    href: "#",
    icon: <AccountingIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-coa",
        href: routes.fms.coa,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-journal-entry",
        href: routes.fms.journalEntry,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-journal-template",
        href: routes.fms.journalTemplate,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-journal-type",
        href: routes.fms.journalType,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-company",
        href: routes.fms.company,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-country",
        href: routes.fms.country,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-budget-management",
    href: "#",
    icon: <BudgetingIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-budget",
        href: routes.fms.budget,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-budget-distribution",
        href: routes.fms.budgetDistribution,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-budget-against",
        href: routes.fms.budgetAgainst,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-cost-center",
        href: routes.fms.costCenter,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-fiscal-year",
        href: routes.fms.fiscalYear,
      },
    ],
  },
  {
    name: "sidebar-menu-assets",
    href: "#",
    icon: <AssetsIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-all-assets",
        href: routes.fms.asset,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-assets-location",
        href: routes.fms.assetLocation,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-assets-category",
        href: routes.fms.assetCategory,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-assets-movement",
        href: routes.fms.assetMovement,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-assets-maintenance",
        href: routes.fms.assetMaintenance,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-assets-repair",
        href: routes.fms.assetRepair,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      // {
      //   name: "sidebar-menu-assets-value-adjustment",
      //   href: routes.fms.assetValueAdjustment,
      // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      //   badge: "WIP",
      // },
      {
        name: "sidebar-menu-assets-depreciation-schedule",
        href: routes.fms.assetDepreciationSchedule,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-banking",
    href: "#",
    icon: <BankingIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-bank",
        href: routes.fms.bank,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-bank-account",
        href: routes.fms.bankAccount,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-bank-transactions",
        href: routes.fms.bankTransactions,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-bank-statement",
        href: routes.fms.bankStatement,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-bank-clearance",
        href: routes.fms.bankClearance,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-bank-reconciliation",
        href: routes.fms.bankReconciliation,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-payments",
    href: "#",
    icon: <PaymentsIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-payment-list",
        href: routes.fms.payments,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-payment-request-list",
        href: routes.fms.paymentRequest,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-mode-of-payment",
        href: routes.fms.modeOfPayment,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-currency",
    icon: <PayrollConfigurationIcon className="h-6 w-6" />,
    subMenuItems: [
      {
        name: "sidebar-menu-currency",
        href: routes.fms.currency,
        // role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-currency-exchange",
        href: routes.fms.currencyExchange,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-tax-management",
    href: "#",
    icon: <TaxIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-tax-category",
        href: routes.fms.taxCategory,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-tax-rule",
        href: routes.fms.taxRule,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-tax-template",
        href: routes.fms.taxTemplate,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-compliances",
    href: "#",
    icon: <TaxIcon className="h-6 w-6" />,
    subMenuItems: [
      {
        name: "sidebar-menu-terms-and-conditions",
        href: routes.fms.termsAndConditions,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-financial-reporting",
    href: "#",
    icon: <ReportingIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-gl",
        href: routes.fms.generalLedger,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-budget-summary",
        href: routes.fms.budgetSummary,
      },
      {
        name: "sidebar-menu-budget-variance-report",
        href: routes.fms.budgetVarianceReport,
      },
      {
        name: "sidebar-menu-fixed-asset-register",
        href: routes.fms.fixedAssetRegister,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-asset-depreciation-ledger",
        href: routes.fms.assetDepreciationLedger,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      // {
      //   name: "sidebar-menu-financial-statement",
      //   href: routes.fms.financialStatement,
      //   badge: "WIP",
      //   role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      // },
      {
        name: "sidebar-menu-account-receivable",
        href: routes.fms.accountReceivable,
      },
      {
        name: "sidebar-menu-account-payable",
        href: routes.fms.accountPayable,
      },
      {
        name: "sidebar-menu-trial-balance",
        href: routes.fms.trialBalance,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-profit-and-loss",
        href: routes.fms.profitAndLoss,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-balance-sheet",
        href: routes.fms.balanceSheet,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      // {
      //   name: "sidebar-menu-cashflow-forecasting",
      //   href: routes.fms.cashflow,
      //   role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      // },
      {
        name: "sidebar-menu-bank-account-summary",
        href: routes.fms.bankAccountSummary,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-monthly-bank-transactions",
        href: routes.fms.monthlyBankTransactions,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-bank-statement-report",
        href: routes.fms.bankStatementReport,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-payment-summary",
        href: routes.fms.paymentSummary,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-payments-history",
        href: routes.fms.dailyPayments,
        role: [...FMS_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
]
