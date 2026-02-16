export const scmRoutes = {
  dashboard: "/scm/scm-dashboard",
  procurement: {
    suppliers: {
      suppliers: "/scm/suppliers",
      addNewSupplier: "/scm/suppliers/add-new-supplier",
      editSupplier: (id: number) => `/scm/suppliers/${id}/edit`,
      supplierDetails: (id: number) => `/scm/suppliers/${id}`,
      contract: (id: number) => `/scm/suppliers/${id}/contract`,
      contractRenewalsList: (contractId: number) =>
        `/scm/suppliers/contract/${contractId}/contract-renewals-list`,
      contractDetails: (contractId: number, supplierId: number) =>
        `/scm/suppliers/${supplierId}/contract/${contractId}`,
      contractRenewals: (contractId: number, supplierId: number) =>
        `/scm/suppliers/${supplierId}/contract/${contractId}/contract-renewals`,
      slaMonitoring: (id: number, supplierId: number) =>
        `/scm/suppliers/${supplierId}/contract/${id}/sla-monitoring`,
      slaMonitoringList: (contractId: number, supplierId: number) =>
        `/scm/suppliers/${supplierId}/contract/${contractId}/sla-monitoring-list`,
      editSlaMonitoring: (
        slaId: number,
        contractId: number,
        supplierId: number
      ) =>
        `/scm/suppliers/${supplierId}/contract/${contractId}/sla-monitoring/${slaId}/edit`,
    },
    requisitions: {
      requisitions: "/scm/requisitions",
      createRequisition: "/scm/requisitions/create-requisition",
      confirmRequisition: "/scm/requisitions/confirm-requisition",
      editRequisitions: (id: number) => `/scm/requisitions/${id}/edit`,
      requisitionDetails: (id: number) => `/scm/requisitions/${id}`,
      sendByEmail: (id: number) => `/scm/requisitions/${id}/send-by-email`,
      generatePo: (id: number) => `/scm/requisitions/${id}/generate-po`,
    },
    purchaseOrders: {
      purchaseOrders: "/scm/purchase-orders",
      createPurchaseOrder: "/scm/purchase-orders/create-purchase-order",
      confirmPurchaseOrder: "/scm/purchase-orders/confirm-purchase-order",
      editPurchaseOrders: (id: number) => `/scm/purchase-orders/${id}/edit`,
      PurchaseOrdersDetails: (id: number) => `/scm/purchase-orders/${id}`,
      generateInvoice: (id: number) =>
        `/scm/purchase-orders/${id}/generate-invoice`,
    },
    invoiceBills: {
      invoiceBills: "/scm/invoice-bills",
      createInvoiceBill: "/scm/invoice-bills/create-invoice-bill",
      editInvoiceBills: (id: number) => `/scm/invoice-bills/${id}/edit`,
      invoiceBillsDetails: (id: number) => `/scm/invoice-bills/${id}`,
      paymentRequest: (id: number) => `/scm/invoice-bills/${id}/payment-request`,
      paymentEntry: (id: number) => `/scm/invoice-bills/${id}/payment-entry`,
      printInvoiceBills: (id: number) => `/scm/invoice-bills/${id}/print`,
    },


    supplierCollaboration: {
      supplierCollaboration: "/scm/supplier-collaboration",
      createEmailMessage: "/scm/supplier-collaboration/create-email-message",
      messageDetails: (id: number) => `/scm/supplier-collaboration/${id}`,
      replyEmailMessage: (id: number) =>
        `/scm/supplier-collaboration/${id}/reply-email-message`,
      messageList: "/scm/supplier-collaboration/message-list",
    },
    setting: {
      supplierCategory: "/scm/procurement-settings/supplier-category",
      paymentTerms: "/scm/procurement-settings/payment-terms",
      paymentMethods: "/scm/procurement-settings/payment-methods",
      requisitionApproval: "/scm/procurement-settings/requisition-approval",
      purchaseOrderApproval:
        "/scm/procurement-settings/purchased-order-approval",
      items: "/scm/procurement-settings/items",
      supplierContracts: "/scm/procurement-settings/supplier-contracts",
    },
  },
  inventory: {
    stock: {
      stockOverview: "/scm/stock-overview",
      stockEntry: "/scm/stock-overview/stock-entry",
      stockDetails: (id: number) => `/scm/stock-overview/${id}`,
      editStockEntry: (id: number) => `/scm/stock-overview/${id}/edit`,
    },
    stockReplenishment: {
      stockReplenishment: "/scm/stock-replenishment",
      createStockReplenishment:
        "/scm/stock-replenishment/create-stock-replenishment",
      editStockReplenishment: (id: number) =>
        `/scm/stock-replenishment/${id}/edit`,
      stockReplenishmentDetails: (id: number) =>
        `/scm/stock-replenishment/${id}`,
      createRequisition: (id: number) =>
        `/scm/stock-replenishment/${id}/create-requisition`,
    },
    warehouse: {
      warehouse: "/scm/warehouse",
      createWarehouse: "/scm/warehouse/create-warehouse",
      editWarehouse: (id: number) => `/scm/warehouse/${id}/edit`,
      warehouseDetails: (id: number) => `/scm/warehouse/${id}`,
    },
    stockTransfer: {
      stockTransfer: "/scm/stock-transfer",
      createStockTransfer: "/scm/stock-transfer/create-stock-transfer",
      editAllStockTransfer: (id: number) => `/scm/stock-transfer/${id}/edit`,
      allStockTransferDetails: (id: number) => `/scm/stock-transfer/${id}`,
    },
    products: {
      products: "/scm/products",
      createProduct: "/scm/products/product-entry",
      editProduct: (id: number) => `/scm/products/${id}/edit`,
      productDetails: (id: number) => `/scm/products/${id}`,
    },
    settings: {
      warehouseManager: "/scm/inventory-settings/warehouse-manager",
      productCategory: "/scm/inventory-settings/product-category",
      stockReplenishmentApproval:
        "/scm/inventory-settings/stock-replenishment-approval",
      stockTransferApproval: "/scm/inventory-settings/stock-transfer-approval",
    },
  },
  demandForecasting: {
    forecast: {
      demandForecasting: "/scm/demand-forecasting",
      createDemandForecasting:
        "/scm/demand-forecasting/create-demand-forecasting",
      editDemandForecasting: (id: number) =>
        `/scm/demand-forecasting/${id}/edit`,
      demandForecastingDetails: (id: number) => `/scm/demand-forecasting/${id}`,
      createSalesOperationPlan: (id: number) =>
        `/scm/demand-forecasting/${id}/create-sales-operation-planning`,
    },
    salesOperationsPlan: {
      salesOperationPlan: "/scm/sales-operations-plan",
      createSalesOperationPlan:
        "/scm/sales-operations-plan/create-sales-operation-plan",
      editSalesOperationPlan: (id: number) =>
        `/scm/sales-operations-plan/${id}/edit`,
      salesOperationPlanDetails: (id: number) =>
        `/scm/sales-operations-plan/${id}`,
      createRequisition: (id: number) =>
        `/scm/sales-operations-plan/${id}/create-requisition`,
    },


    capacityPlanning: {
      capacityPlanning: "/scm/capacity-planning",
      createCapacityPlanning: "/scm/capacity-planning/create-capacity-planning",
      editCapacityPlanning: (id: number) => `/scm/capacity-planning/${id}/edit`,
      capacityPlanningDetails: (id: number) => `/scm/capacity-planning/${id}`,
    },
    settings: {
      salesOperationApproval:
        "/scm/demand-forecasting-settings/sales-operation-approval",
    },
  },
  supplierRelationship: {
    evaluationHistory: {
      evaluationHistory: "/scm/evaluation-history",
      createEvaluationHistory: (id: number) =>
        `/scm/suppliers/${id}/create-evaluation`,
      editEvaluationHistory: (id: number) =>
        `/scm/evaluation-history/${id}/edit`,
      evaluationHistoryDetails: (id: number) => `/scm/evaluation-history/${id}`,
    },
    riskAssessment: {
      riskAssessment: "/scm/risk-assessment",
      createRiskAssessment: "/scm/risk-assessment/create-risk-assessment",
      editRiskAssessment: (id: number) => `/scm/risk-assessment/${id}/edit`,
      riskAssessmentDetails: (id: number) => `/scm/risk-assessment/${id}`,
    },
  },
  logisticsAndTransport: {
    shipment: {
      shipment: "/scm/shipment",
      createShipment: "/scm/shipment/create-shipment",
      editShipment: (id: number) => `/scm/shipment/${id}/edit`,
      shipmentDetails: (id: number) => `/scm/shipment/${id}`,
      createFreight: (id: number) => `/scm/shipment/${id}/create-freight`,
    },
    freight: {
      freight: "/scm/freight",
      createFreight: "/scm/freight/create-freight",
      editFreight: (id: number) => `/scm/freight/${id}/edit`,
      freightDetails: (id: number) => `/scm/freight/${id}`,
    },
    returnManagement: {
      returnManagement: "/scm/return-management",
      createReturnManagement: "/scm/return-management/create-return-management",
      editReturnManagement: (id: number) => `/scm/return-management/${id}/edit`,
      returnManagementDetails: (id: number) => `/scm/return-management/${id}`,
    },
    settings: {
      carriers: "/scm/logistic-and-transport-settings/carriers",
      returnProcessApproval:
        "/scm/logistic-and-transport-settings/return-process-approval",
    },
  },
  productionControl: {
    billOfMaterials: {
      billOfMaterials: "/scm/bill-of-materials",
      createBillOfMaterials: "/scm/bill-of-materials/create-bill-of-materials",
      editBillOfMaterials: (id: number) => `/scm/bill-of-materials/${id}/edit`,
      billOfMaterialsDetails: (id: number) => `/scm/bill-of-materials/${id}`,
      viewBillOfMaterials: (id: number) => `/scm/bill-of-materials/${id}/view`,
      createMaterialAvailability: (id: number) =>
        `/scm/bill-of-materials/${id}/create-material-availability`,
      createWorkOrderTracking: (id: number) =>
        `/scm/bill-of-materials/${id}/create-work-order-tracking`,
    },

    materialAvailability: {
      materialAvailability: "/scm/material-availability",
      createMaterialAvailability:
        "/scm/material-availability/create-material-availability",
      editMaterialAvailability: (id: number) =>
        `/scm/material-availability/${id}/edit`,
      materialAvailabilityDetails: (id: number) =>
        `/scm/material-availability/${id}`,
      createRequisition: (id: number) =>
        `/scm/material-availability/${id}/create-requisition`,
    },

    workOrderTracking: {
      workOrderTracking: "/scm/work-order-tracking",
      createWorkOrderTracking:
        "/scm/work-order-tracking/create-work-order-tracking",
      editWorkOrderTracking: (id: number) =>
        `/scm/work-order-tracking/${id}/edit`,
      workOrderTrackingDetails: (id: number) =>
        `/scm/work-order-tracking/${id}`,
    },
    settings: {
      item: "/scm/production-control-settings/item",
      workCenter: "/scm/production-control-settings/work-center",
      billOfMaterialsApproval:
        "/scm/production-control-settings/bill-of-materials-approval",
      materialRequirementsPlanningApproval:
        "/scm/production-control-settings/material-requirements-planning-approval",
      machine: "/scm/production-control-settings/machine",
    },
  },
  complianceAndRisk: {
    compliance: {
      compliance: "/scm/compliance",
      createCompliance: "/scm/compliance/create-compliance",
      editCompliance: (id: number) => `/scm/compliance/${id}/edit`,
      complianceDetails: (id: number) => `/scm/compliance/${id}`,
    },
    riskEvaluation: {
      riskEvaluation: "/scm/risk-evaluation",
      createRiskEvaluation: "/scm/risk-evaluation/create-risk-evaluation",
      editRiskEvaluation: (id: number) => `/scm/risk-evaluation/${id}/edit`,
      riskEvaluationDetails: (id: number) => `/scm/risk-evaluation/${id}`,
    },
  },
  reportingAndAnalytics: {
    forecastReviewAnalytics: "/scm/forecast-review-analytics",
    purchaseAnalytics: "/scm/purchase-analytics",
    purchaseOrderTrends: "/scm/purchase-order-trends",
    freightReport: "/scm/freight-report",
    productionPlanningReport: "/scm/production-planning-report",
    bomStockReport: "/scm/bom-stock-reports",
    costManagementReport: "/scm/cost-management-report",
    stockAnalyticsReport: "/scm/stock-analytics-report",
    inventoryItemShortageReport: "/scm/inventory-item-shortage-report",
    accountsPayableReport: "/scm/accounts-payable-report",
  },
  documents: {
    documents: "/scm/documents",
  },
}
