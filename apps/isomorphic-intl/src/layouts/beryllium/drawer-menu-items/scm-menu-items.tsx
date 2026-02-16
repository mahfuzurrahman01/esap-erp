import { SettingIcon } from "@/components/icons/crm/setting";
import DashboardIcon from "@/components/icons/dashboard";
import ComplianceRiskIcon from "@/components/icons/scm/compliance-risk";
import DemandForecastIcon from "@/components/icons/scm/demand-forecast";
import InventoryIcon from "@/components/icons/scm/inventory";
import LogisticTransportIcon from "@/components/icons/scm/logistic-transport";
import ProcurementIcon from "@/components/icons/scm/procurement";
import ProductionControlIcon from "@/components/icons/scm/production-control";
import ReportAnalyticsIcon from "@/components/icons/scm/report-analytics";
import SupplierRelationshipIcon from "@/components/icons/scm/supplier-relationship";
import { routes } from "@/config/routes";
import { ADMIN_MENU_ROLES, SCM_MENU_ROLES } from "../fixed-menu-items/user-roles";
import { FolderIcon } from "@/components/icons/hrms/folder-icon";





export const scmMenuItems = [
  {
    name: "sidebar-menu-scms",
  },
  {
    name: "sidebar-menu-dashboard",
    href: routes.scm.dashboard,
    icon: <DashboardIcon className="h-6 w-6" />,
    role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
  },
  {
    name: "sidebar-menu-procurement",
    href: "#",
    icon: <ProcurementIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-suppliers",
        href: routes.scm.procurement.suppliers.suppliers,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-requisitions",
        href: routes.scm.procurement.requisitions.requisitions,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-purchase-orders",
        href: routes.scm.procurement.purchaseOrders.purchaseOrders,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-purchase-invoice",
        href: routes.scm.procurement.invoiceBills.invoiceBills,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      // {
      //   name: "sidebar-menu-supplier-collaboration",
      //   href: routes.scm.procurement.supplierCollaboration
      //     .supplierCollaboration,
      //   role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      // },
    ],
  },
  {
    name: "sidebar-menu-procurement-settings",
    href: "#",
    icon: <SettingIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-supplier-category",
        href: routes.scm.procurement.setting.supplierCategory,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-payment-terms",
        href: routes.scm.procurement.setting.paymentTerms,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      // {
      //   name: "sidebar-menu-payment-method",
      //   href: routes.scm.procurement.setting.paymentMethods,
      //   role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      // },
      {
        name: "sidebar-menu-requisition-approval",
        href: routes.scm.procurement.setting.requisitionApproval,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-purchase-order-approval",
        href: routes.scm.procurement.setting.purchaseOrderApproval,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-unit-measurement",
        href: routes.scm.procurement.setting.items,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-supplier-contract",
        href: routes.scm.procurement.setting.supplierContracts,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-inventory",
    href: "#",
    icon: <InventoryIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-stock-overview",
        href: routes.scm.inventory.stock.stockOverview,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-stock-replenishment",
        href: routes.scm.inventory.stockReplenishment.stockReplenishment,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-warehouse",
        href: routes.scm.inventory.warehouse.warehouse,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-stock-transfer",
        href: routes.scm.inventory.stockTransfer.stockTransfer,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-products",
        href: routes.scm.inventory.products.products,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-inventory-settings",
    href: "#",
    icon: <SettingIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-warehouse-manager",
        href: routes.scm.inventory.settings.warehouseManager,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-product-category",
        href: routes.scm.inventory.settings.productCategory,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-stock-replenishment-approval",
        href: routes.scm.inventory.settings.stockReplenishmentApproval,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-stock-transfer-approval",
        href: routes.scm.inventory.settings.stockTransferApproval,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-demand-and-forecasting",
    href: "#",
    icon: <DemandForecastIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-demand-forecasting",
        href: routes.scm.demandForecasting.forecast.demandForecasting,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-sales-and-operations-planning",
        href: routes.scm.demandForecasting.salesOperationsPlan
          .salesOperationPlan,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-capacity-planning",
        href: routes.scm.demandForecasting.capacityPlanning.capacityPlanning,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-forecasting-settings",
    href: "#",
    icon: <SettingIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-sales-operations-approval",
        href: routes.scm.demandForecasting.settings.salesOperationApproval,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-supplier-relationship",
    href: "#",
    icon: <SupplierRelationshipIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-evaluation-history",
        href: routes.scm.supplierRelationship.evaluationHistory
          .evaluationHistory,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-risk-assessment",
        href: routes.scm.supplierRelationship.riskAssessment.riskAssessment,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-logistic-transport",
    href: "#",
    icon: <LogisticTransportIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-shipment-tracking",
        href: routes.scm.logisticsAndTransport.shipment.shipment,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-freight-management",
        href: routes.scm.logisticsAndTransport.freight.freight,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-return-process",
        href: routes.scm.logisticsAndTransport.returnManagement
          .returnManagement,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-logistic-transport-settings",
    href: "#",
    icon: <SettingIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-carriers",
        href: routes.scm.logisticsAndTransport.settings.carriers,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-return-process-approval",
        href: routes.scm.logisticsAndTransport.settings.returnProcessApproval,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-production-control",
    href: "#",
    icon: <ProductionControlIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-bill-of-materials",
        href: routes.scm.productionControl.billOfMaterials.billOfMaterials,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-material-availability",
        href: routes.scm.productionControl.materialAvailability
          .materialAvailability,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-work-order-tracking",
        href: routes.scm.productionControl.workOrderTracking.workOrderTracking,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-production-control-settings",
    href: "#",
    icon: <SettingIcon className="h-6 w-6" />,
    dropdownItems: [
      // {
      //   name: "sidebar-menu-item",
      //   href: routes.scm.productionControl.settings.item,
      //   role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      // },
      {
        name: "sidebar-menu-work-center",
        href: routes.scm.productionControl.settings.workCenter,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-bill-of-material-approval",
        href: routes.scm.productionControl.settings.billOfMaterialsApproval,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-material-requirements-planning-approval",
        href: routes.scm.productionControl.settings
          .materialRequirementsPlanningApproval,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-machine",
        href: routes.scm.productionControl.settings.machine,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-compliance-risk",
    href: "#",
    icon: <ComplianceRiskIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-compliance",
        href: routes.scm.complianceAndRisk.compliance.compliance,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-risk-evaluation",
        href: routes.scm.complianceAndRisk.riskEvaluation.riskEvaluation,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
    ],
  },
  {
    name: "sidebar-menu-report-analytics",
    href: "#",
    icon: <ReportAnalyticsIcon className="h-6 w-6" />,
    dropdownItems: [
      {
        name: "sidebar-menu-forecast-review-analytics",
        href: routes.scm.reportingAndAnalytics.forecastReviewAnalytics,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-purchase-analytics",
        href: routes.scm.reportingAndAnalytics.purchaseAnalytics,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-purchase-order-trends",
        href: routes.scm.reportingAndAnalytics.purchaseOrderTrends,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-freight-report",
        href: routes.scm.reportingAndAnalytics.freightReport,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-production-planning-report",
        href: routes.scm.reportingAndAnalytics.productionPlanningReport,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-bom-stock-report",
        href: routes.scm.reportingAndAnalytics.bomStockReport,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-cost-management-report",
        href: routes.scm.reportingAndAnalytics.costManagementReport,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-stock-analytics-report",
        href: routes.scm.reportingAndAnalytics.stockAnalyticsReport,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      {
        name: "sidebar-menu-inventory-item-shortage-report",
        href: routes.scm.reportingAndAnalytics.inventoryItemShortageReport,
        role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      },
      // {
      //   name: "sidebar-menu-accounts-payable-report",
      //   href: routes.scm.reportingAndAnalytics.accountsPayableReport,
      //   role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
      // },
    ],
  },
  // {
  //   name: "sidebar-menu-scm-documents",
  //   href: routes.scm.documents.documents,
  //   icon: <FolderIcon className="h-6 w-6" />,
  // },
]