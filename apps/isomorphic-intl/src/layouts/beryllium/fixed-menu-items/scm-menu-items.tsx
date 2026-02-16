// import { SettingIcon } from "@/components/icons/crm/setting"
import { SettingIcon } from "@/components/icons/crm/setting"
import DashboardIcon from "@/components/icons/dashboard"
import ComplianceRiskIcon from "@/components/icons/scm/compliance-risk"
import DemandForecastIcon from "@/components/icons/scm/demand-forecast"
import InventoryIcon from "@/components/icons/scm/inventory"
import LogisticTransportIcon from "@/components/icons/scm/logistic-transport"
import ProcurementIcon from "@/components/icons/scm/procurement"
import ProductionControlIcon from "@/components/icons/scm/production-control"
import ReportAnalyticsIcon from "@/components/icons/scm/report-analytics"
import SupplierRelationshipIcon from "@/components/icons/scm/supplier-relationship"
import SupplyChainIcon from "@/components/icons/scm/supply-chain"
import { routes } from "@/config/routes"
import { FolderIcon } from "@/components/icons/hrms/folder-icon"

import { MenuItemsType } from "../beryllium-fixed-menu-items"
import { ADMIN_MENU_ROLES, SCM_MENU_ROLES } from "./user-roles"

export const scmMenuItems: MenuItemsType = {
  id: "4",
  name: "sidebar-menu-scm",
  title: "sidebar-menu-scms",
  icon: SupplyChainIcon,
  // roles: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
  menuItems: [
    {
      name: "sidebar-menu-dashboard",
      href: routes.scm.dashboard,
      icon: DashboardIcon,
      role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
    },
    {
      name: "sidebar-menu-procurement",
      icon: ProcurementIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-suppliers",
          href: routes.scm.procurement.suppliers.suppliers,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-requisitions",
          href: routes.scm.procurement.requisitions.requisitions,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-purchase-orders",
          href: routes.scm.procurement.purchaseOrders.purchaseOrders,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-purchase-invoice",
          href: routes.scm.procurement.invoiceBills.invoiceBills,
          badge: "",
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
      icon: SettingIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-supplier-category",
          href: routes.scm.procurement.setting.supplierCategory,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-payment-terms",
          href: routes.scm.procurement.setting.paymentTerms,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        // {
        //   name: "sidebar-menu-payment-method",
        //   href: routes.scm.procurement.setting.paymentMethods,
        //   badge: "",
        //   role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        // },
        {
          name: "sidebar-menu-requisition-approval",
          href: routes.scm.procurement.setting.requisitionApproval,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-purchase-order-approval",
          href: routes.scm.procurement.setting.purchaseOrderApproval,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-unit-measurement",
          href: routes.scm.procurement.setting.items,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-supplier-contract",
          href: routes.scm.procurement.setting.supplierContracts,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-inventory",
      icon: InventoryIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-stock-overview",
          href: routes.scm.inventory.stock.stockOverview,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-stock-replenishment",
          href: routes.scm.inventory.stockReplenishment.stockReplenishment,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-warehouse",
          href: routes.scm.inventory.warehouse.warehouse,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-stock-transfer",
          href: routes.scm.inventory.stockTransfer.stockTransfer,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-products",
          href: routes.scm.inventory.products.products,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-inventory-settings",
      icon: SettingIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-warehouse-manager",
          href: routes.scm.inventory.settings.warehouseManager,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-product-category",
          href: routes.scm.inventory.settings.productCategory,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-stock-replenishment-approval",
          href: routes.scm.inventory.settings.stockReplenishmentApproval,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-stock-transfer-approval",
          href: routes.scm.inventory.settings.stockTransferApproval,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-demand-and-forecasting",
      icon: DemandForecastIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-demand-forecasting",
          href: routes.scm.demandForecasting.forecast.demandForecasting,
          // badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-sales-operations-plan",
          href: routes.scm.demandForecasting.salesOperationsPlan
            .salesOperationPlan,
          // badge: "WIP",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-capacity-planning",
          href: routes.scm.demandForecasting.capacityPlanning.capacityPlanning,
          // badge: "WIP",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-forecasting-settings",
      icon: SettingIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-sales-operations-approval",
          href: routes.scm.demandForecasting.settings.salesOperationApproval,
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-supplier-relationship",
      icon: SupplierRelationshipIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-evaluation-history",
          href: routes.scm.supplierRelationship.evaluationHistory
            .evaluationHistory,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-risk-assessment",
          href: routes.scm.supplierRelationship.riskAssessment.riskAssessment,
          // badge: "WIP",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-logistic-transport",
      icon: LogisticTransportIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-shipment-tracking",
          href: routes.scm.logisticsAndTransport.shipment.shipment,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-freight-management",
          href: routes.scm.logisticsAndTransport.freight.freight,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-return-process",
          href: routes.scm.logisticsAndTransport.returnManagement
            .returnManagement,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-logistic-transport-settings",
      icon: SettingIcon,
      subMenuItems: [
        {
          name: "sidebar-menu-carriers",
          href: routes.scm.logisticsAndTransport.settings.carriers,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-return-process-approval",
          href: routes.scm.logisticsAndTransport.settings.returnProcessApproval,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-production-control",
      icon: ProductionControlIcon,
      subMenuItems: [
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
          href: routes.scm.productionControl.workOrderTracking
            .workOrderTracking,
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-production-control-settings",
      icon: SettingIcon,
      subMenuItems: [
        // {
        //   name: "sidebar-menu-item",
        //   href: routes.scm.productionControl.settings.item,
        //   badge: "",
        //   role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        // },
        {
          name: "sidebar-menu-work-center",
          href: routes.scm.productionControl.settings.workCenter,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-bill-of-material-approval",
          href: routes.scm.productionControl.settings.billOfMaterialsApproval,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-material-requirements-planning-approval",
          href: routes.scm.productionControl.settings
            .materialRequirementsPlanningApproval,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
        {
          name: "sidebar-menu-machine",
          href: routes.scm.productionControl.settings.machine,
          badge: "",
          role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
        },
      ],
    },
    {
      name: "sidebar-menu-compliance-risk",
      icon: ComplianceRiskIcon,
      subMenuItems: [
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
      icon: ReportAnalyticsIcon,
      subMenuItems: [
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
    {
      name: "sidebar-menu-scm-documents",
      icon: FolderIcon,
      href: routes.scm.documents.documents,
      // role: [...SCM_MENU_ROLES, ...ADMIN_MENU_ROLES],
    },
  ],
}
