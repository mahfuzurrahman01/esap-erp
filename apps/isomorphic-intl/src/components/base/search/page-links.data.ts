import { routes } from "@/config/routes"

// Note: do not add href in the label object, it is rendering as label
export const pageLinks = [
  // label start
  // {
  //   name: "sidebar-menu-home",
  // },
  // label end

  // HR routes
  {
    name: "sidebar-menu-dashboard",
    href: routes.hr.dashboard,
  },
  {
    name: "sidebar-menu-employees",
    href: routes.hr.employees,
  },
  {
    name: "sidebar-menu-create-employee",
    href: routes.hr.createEmployee,
  },
  {
    name: "sidebar-menu-departments",
    href: routes.hr.departments,
  },
  {
    name: "sidebar-menu-create-department",
    href: routes.hr.createDepartment,
  },
  {
    name: "sidebar-menu-contracts",
    href: routes.hr.contracts,
  },
  {
    name: "sidebar-menu-create-contract",
    href: routes.hr.createContract,
  },
  {
    name: "sidebar-menu-employee-setting-items",
    href: routes.hr.employeeSettingItems,
  },
  {
    name: "sidebar-menu-activity-plans",
    href: routes.hr.activityPlans,
  },
  {
    name: "sidebar-menu-create-activity-plan",
    href: routes.hr.createActivityPlan,
  },
  {
    name: "sidebar-menu-attendances",
    href: routes.hr.attendances,
  },
  {
    name: "sidebar-menu-leave-time-off",
    href: routes.hr.leaveTimeOff,
  },
  {
    name: "sidebar-menu-holiday-calendar",
    href: routes.hr.holidayCalendar,
  },
  {
    name: "sidebar-menu-off-days",
    href: routes.hr.offDays,
  },
  {
    name: "sidebar-menu-create-off-days",
    href: routes.hr.createOffDays,
  },
  {
    name: "sidebar-menu-leave-requests",
    href: routes.hr.leaveRequest,
  },
  {
    name: "sidebar-menu-leave-allocations",
    href: routes.hr.leaveAllocations,
  },
  {
    name: "sidebar-menu-reconciliation-requests",
    href: routes.hr.reconciliationRequests,
  },
  {
    name: "sidebar-menu-leave-type",
    href: routes.hr.leaveType,
  },
  {
    name: "sidebar-menu-saudization",
    href: routes.hr.saudization,
  },
  {
    name: "sidebar-menu-saudization-settings",
    href: routes.hr.saudizationSettings,
  },
  {
    name: "sidebar-menu-saudization-reports",
    href: routes.hr.saudizationReports,
  },

  // FMS routes
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

  // SCM routes
  // label start
  {
    name: "sidebar-menu-scm",
  },
  // label end
  {
    name: "sidebar-menu-suppliers",
    href: routes.scm.procurement.suppliers.suppliers,
  },
  {
    name: "sidebar-menu-add-new-supplier",
    href: routes.scm.procurement.suppliers.addNewSupplier,
  },
  {
    name: "sidebar-menu-requisitions",
    href: routes.scm.procurement.requisitions.requisitions,
  },
  {
    name: "sidebar-menu-create-requisition",
    href: routes.scm.procurement.requisitions.createRequisition,
  },
  {
    name: "sidebar-menu-purchase-orders",
    href: routes.scm.procurement.purchaseOrders.purchaseOrders,
  },
  {
    name: "sidebar-menu-create-purchase-order",
    href: routes.scm.procurement.purchaseOrders.createPurchaseOrder,
  },
  {
    name: "sidebar-menu-invoice-bills",
    href: routes.scm.procurement.invoiceBills.invoiceBills,
  },
  {
    name: "sidebar-menu-create-invoice-bill",
    href: routes.scm.procurement.invoiceBills.createInvoiceBill,
  },
  {
    name: "sidebar-menu-stock-overview",
    href: routes.scm.inventory.stock.stockOverview,
  },
  {
    name: "sidebar-menu-stock-entry",
    href: routes.scm.inventory.stock.stockEntry,
  },
  {
    name: "sidebar-menu-stock-replenishment",
    href: routes.scm.inventory.stockReplenishment.stockReplenishment,
  },
  {
    name: "sidebar-menu-create-stock-replenishment",
    href: routes.scm.inventory.stockReplenishment.createStockReplenishment,
  },
  {
    name: "sidebar-menu-warehouse-management",
    href: routes.scm.inventory.warehouse.warehouse,
  },
  {
    name: "sidebar-menu-create-warehouse",
    href: routes.scm.inventory.warehouse.createWarehouse,
  },
  {
    name: "sidebar-menu-stock-transfer",
    href: routes.scm.inventory.stockTransfer.stockTransfer,
  },
  {
    name: "sidebar-menu-create-stock-transfer",
    href: routes.scm.inventory.stockTransfer.createStockTransfer,
  },
  {
    name: "sidebar-menu-products",
    href: routes.scm.inventory.products.products,
  },
  {
    name: "sidebar-menu-create-product",
    href: routes.scm.inventory.products.createProduct,
  },
  {
    name: "sidebar-menu-demand-forecasting",
    href: routes.scm.demandForecasting.forecast.demandForecasting,
  },
  {
    name: "sidebar-menu-create-demand-forecasting",
    href: routes.scm.demandForecasting.forecast.createDemandForecasting,
  },
  {
    name: "sidebar-menu-sales-operations-plan",
    href: routes.scm.demandForecasting.salesOperationsPlan.salesOperationPlan,
  },
  {
    name: "sidebar-menu-create-sales-operations-plan",
    href: routes.scm.demandForecasting.salesOperationsPlan
      .createSalesOperationPlan,
  },
  {
    name: "sidebar-menu-capacity-planning",
    href: routes.scm.demandForecasting.capacityPlanning.capacityPlanning,
  },
  {
    name: "sidebar-menu-create-capacity-planning",
    href: routes.scm.demandForecasting.capacityPlanning.createCapacityPlanning,
  },
  {
    name: "sidebar-menu-evaluation-history",
    href: routes.scm.supplierRelationship.evaluationHistory.evaluationHistory,
  },
  // {
  //   name: "sidebar-menu-create-evaluation-history",
  //   href: routes.scm.supplierRelationship.evaluationHistory
  //     .createEvaluationHistory,
  // },
  {
    name: "sidebar-menu-risk-assessment",
    href: routes.scm.supplierRelationship.riskAssessment.riskAssessment,
  },
  {
    name: "sidebar-menu-create-risk-assessment",
    href: routes.scm.supplierRelationship.riskAssessment.createRiskAssessment,
  },
  {
    name: "sidebar-menu-logistics-and-transport",
    href: routes.scm.logisticsAndTransport.shipment.shipment,
  },
  { 
    name: "sidebar-menu-product-control",
    href: routes.scm.productionControl.billOfMaterials.billOfMaterials,
  },
  {
    name: "sidebar-menu-create-product-control",
    href: routes.scm.productionControl.billOfMaterials.createBillOfMaterials,
  },
  {
    name: "sidebar-menu-material-availability",
    href: routes.scm.productionControl.materialAvailability.materialAvailability,
  },
  {
    name: "sidebar-menu-create-material-availability",
    href: routes.scm.productionControl.materialAvailability.createMaterialAvailability,
  },
  {
    name: "sidebar-menu-work-order-tracking",
    href: routes.scm.productionControl.workOrderTracking.workOrderTracking,
  },
  {
    name: "sidebar-menu-create-work-order-tracking",
    href: routes.scm.productionControl.workOrderTracking.createWorkOrderTracking,
  },
  {
    name: "sidebar-menu-compliance-and-risk",
    href: routes.scm.complianceAndRisk.compliance.compliance,
  },
  {
    name: "sidebar-menu-reporting-and-analytics",
    href: routes.scm.reportingAndAnalytics.forecastReviewAnalytics,
  },
  {
    name: "sidebar-menu-scm-documents",
    href: routes.scm.documents.documents,
  },

  // CRM routes
  // label start
  {
    name: "sidebar-menu-crm",
  },
  // label end
  {
    name: "sidebar-menu-dashboard",
    href: routes.crm.dashboard,
  },
  {
    name: "sidebar-menu-users",
    href: routes.crm.users,
  },
  {
    name: "sidebar-menu-profile",
    href: routes.crm.profile,
  },
  // {
  //   name: "sidebar-menu-reset-password",
  //   href: routes.crm.resetPassword,
  // },
  {
    name: "sidebar-menu-roles",
    href: routes.crm.roles,
  },
  {
    name: "sidebar-menu-permissions",
    href: routes.crm.permissions,
  },
  {
    name: "sidebar-menu-items",
    href: routes.crm.items,
  },
  {
    name: "sidebar-menu-create-product",
    href: routes.crm.createProduct,
  },
  {
    name: "sidebar-menu-stocks",
    href: routes.crm.stocks,
  },
  {
    name: "sidebar-menu-create-stock",
    href: routes.crm.stockCreate,
  },
  {
    name: "sidebar-menu-categories",
    href: routes.crm.categories,
  },
  {
    name: "sidebar-menu-attributes",
    href: routes.crm.attributes,
  },
  {
    name: "sidebar-menu-leads",
    href: routes.crm.leads,
  },
  {
    name: "sidebar-menu-opportunities",
    href: routes.crm.opportunities,
  },
  {
    name: "sidebar-menu-deals",
    href: routes.crm.deals,
  },
  {
    name: "sidebar-menu-tasks",
    href: routes.crm.tasks,
  },
  {
    name: "sidebar-menu-create-task",
    href: routes.crm.createTask,
  },
  {
    name: "sidebar-menu-activities",
    href: routes.crm.activities,
  },
  {
    name: "sidebar-menu-create-activity",
    href: routes.crm.createActivity,
  },
  {
    name: "sidebar-menu-campaigns",
    href: routes.crm.campaigns,
  },
  {
    name: "sidebar-menu-create-campaign",
    href: routes.crm.createCampaign,
  },
  {
    name: "sidebar-menu-contacts",
    href: routes.crm.contacts,
  },
  {
    name: "sidebar-menu-create-contact",
    href: routes.crm.createContact,
  },

  // Support routes
  {
    name: "sidebar-menu-dashboard",
    href: routes.support.dashboard,
  },
  {
    name: "sidebar-menu-inbox",
    href: routes.support.inbox,
  },
  {
    name: "sidebar-menu-snippets",
    href: routes.support.snippets,
  },
  {
    name: "sidebar-menu-create-snippet",
    href: routes.support.createSnippet,
  },
  {
    name: "sidebar-menu-templates",
    href: routes.support.templates,
  },
  {
    name: "sidebar-menu-create-template",
    href: routes.support.createTemplate,
  },

  // Widgets routes
  // {
  //   name: "sidebar-menu-cards",
  //   href: routes.widgets.cards,
  // },
  // {
  //   name: "sidebar-menu-icons",
  //   href: routes.widgets.icons,
  // },
  // {
  //   name: "sidebar-menu-charts",
  //   href: routes.widgets.charts,
  // },
  // {
  //   name: "sidebar-menu-maps",
  //   href: routes.widgets.maps,
  // },
  // {
  //   name: "sidebar-menu-banners",
  //   href: routes.widgets.banners,
  // },

  // Forms routes
  // {
  //   name: "sidebar-menu-profile-settings",
  //   href: routes.forms.profileSettings,
  // },
  // {
  //   name: "sidebar-menu-notification-preference",
  //   href: routes.forms.notificationPreference,
  // },
  // {
  //   name: "sidebar-menu-personal-information",
  //   href: routes.forms.personalInformation,
  // },
  // {
  //   name: "sidebar-menu-newsletter",
  //   href: routes.forms.newsletter,
  // },

  // Invoice routes
  // {
  //   name: "sidebar-menu-invoice-home",
  //   href: routes.invoice.home,
  // },
  // {
  //   name: "sidebar-menu-create-invoice",
  //   href: routes.invoice.create,
  // },
  // {
  //   name: "sidebar-menu-invoice-builder",
  //   href: routes.invoice.builder,
  // },
]
