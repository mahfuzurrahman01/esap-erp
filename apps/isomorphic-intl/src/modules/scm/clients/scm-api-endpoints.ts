export const SCMApiEndpoint = {
  // Dashboard
  getInvoiceMaterialCost: "/v1/dashboard-report/invoice-materialcosts",
  getTopSupplier: "/v1/dashboard-report/top-suppliers",
  getMostProducedProducts: "/v1/dashboard-report/most-produced-products",
  getMonthlyForecast: "/v1/dashboard-report/monthly-forecasts",
  getMainStaticCard: "/v1/dashboard-report/main-static-card",
  getOtherStaticCard: "/v1/dashboard-report/other-static-card",

  // Country
  getAllCountry: "/v1/country/get-country-list",
  getCountryById: (id: number) => `/v1/country/${id}`,
  createCountry: "/v1/country/save-country",
  updateCountry: "/v1/country/update-country",
  deleteCountry: (id: number) => `/v1/country/delete-country/${id}`,

  // Currency
  getAllCurrency: "/v1/currency/get-currency-list",
  getCurrencyById: (id: number) => `/v1/currency/${id}`,
  createCurrency: "/v1/currency/save-currency",
  updateCurrency: "/v1/currency/update-currency",
  deleteCurrency: `/v1/currency/delete-currency`,

  // Invoice
  getAllInvoice: "/v1/invoice-bill/get-invoice-bill-list",
  getInvoiceById: (id: number) => `/v1/invoice-bill/${id}`,
  createInvoice: "/v1/invoice-bill/save-invoice-bill",
  updateInvoice: "/v1/invoice-bill/update-invoice-bill",
  deleteInvoice: (id: number) => `/v1/invoice-bill/delete-invoice-bill/${id}`,
  bulkDeleteInvoice: `/v1/invoice-bill/delete-invoice-bills`,
  updatePaymentStatus: "/v1/invoice-bill/update-payment-status?paymentStatus=1",

  // Item Unit
  getAllItemUnit: "/v1/item-unit/get-item-unit-list",
  getItemUnitById: (id: number) => `/v1/item-unit/${id}`,
  createItemUnit: "/v1/item-unit/save-item-unit",
  updateItemUnit: "/v1/item-unit/update-item-unit",
  deleteItemUnit: (id: number) => `/v1/item-unit/delete-item-unit/${id}`,
  bulkDeleteItemUnit: `/v1/item-unit/delete-item-units`,

  // Payment Method
  getAllPaymentMethod: "/v1/payment-method/get-payment-method-list",
  getPaymentMethodById: (id: number) => `/v1/payment-method/${id}`,
  createPaymentMethod: "/v1/payment-method/save-payment-method",
  updatePaymentMethod: "/v1/payment-method/update-payment-method",
  deletePaymentMethod: (id: number) =>
    `/v1/payment-method/delete-payment-method/${id}`,
  bulkDeletePaymentMethod: `/v1/payment-method/delete-payment-methods`,

  // Payment Terms
  getAllPaymentTerms: "/v1/payment-terms/get-payment-terms-list",
  getPaymentTermsById: (id: number) => `/v1/payment-terms/${id}`,
  createPaymentTerms: "/v1/payment-terms/save-payment-terms",
  updatePaymentTerms: "/v1/payment-terms/update-payment-terms",
  deletePaymentTerms: (id: number) =>
    `/v1/payment-terms/delete-payment-terms/${id}`,
  bulkDeletePaymentTerms: `/v1/payment-terms/delete-payment-terms`,

  // Product
  getAllProduct: "/v1/product/get-product-list",
  getProductDropdown: "/v1/product/get-product-dropdown",
  getProductById: (id: number) => `/v1/product/${id}`,
  createProduct: "/v1/product/save-product",
  updateProduct: "/v1/product/update-product",
  deleteProduct: (id: number) => `/v1/product/delete-product/${id}`,
  bulkDeleteProduct: `/v1/product/delete-products`,

  // Product Category
  getAllProductCategory: "/v1/product-category/get-product-category-list",
  getProductCategoryById: (id: number) => `/v1/product-category/${id}`,
  createProductCategory: "/v1/product-category/save-product-category",
  updateProductCategory: "/v1/product-category/update-product-category",
  deleteProductCategory: (id: number) =>
    `/v1/product-category/delete-product-category/${id}`,
  bulkDeleteProductCategory: `/v1/product-category/delete-product-categories`,
  // Purchase Order
  getAllPurchaseOrder: "/v1/purchase-order/get-purchase-order-list",
  getPurchaseOrderById: (id: number) => `/v1/purchase-order/${id}`,
  createPurchaseOrder: "/v1/purchase-order/save-purchase-order",
  updatePurchaseOrder: "/v1/purchase-order/update-purchase-order",
  deletePurchaseOrder: (id: number) =>
    `/v1/purchase-order/delete-purchase-order/${id}`,
  bulkDeletePurchaseOrder: `/v1/purchase-order/delete-purchase-orders`,
  searchPurchaseOrder: (params: {
    pageIndex: number
    pageSize: number
    search?: string
  }) =>
    `/v1/purchase-order/get-purchase-order-list?${new URLSearchParams(
      params as any
    ).toString()}`,

  // Purchase Order Approval
  getAllPurchaseOrderApproval: "/v1/purchase-order-approval/get-approval-list",
  getPurchaseOrderApprovalById: (id: number) =>
    `/v1/purchase-order-approval/${id}`,
  createPurchaseOrderApproval: "/v1/purchase-order-approval/save-approval",
  updatePurchaseOrderApproval: "/v1/purchase-order-approval/update-approval",
  deletePurchaseOrderApproval: (id: number) =>
    `/v1/purchase-order-approval/delete-approval/${id}`,
  bulkDeletePurchaseOrderApproval: `/v1/purchase-order-approval/delete-approvals`,
  // Requisition
  getAllRequisition: "/v1/requisition/get-requisition-list",
  getRequisitionById: (id: number) => `/v1/requisition/${id}`,
  createRequisition: "/v1/requisition/save-requisition",
  updateRequisition: "/v1/requisition/update-requisition",
  deleteRequisition: (id: number) => `/v1/requisition/delete-requisition/${id}`,
  bulkDeleteRequisition: `/v1/requisition/delete-requisitions`,
  sendByEmail: "/v1/requisition/send-requisition-email",
  searchRequisition: (params: {
    pageIndex: number
    pageSize: number
    search?: string
  }) =>
    `/v1/requisition/get-requisition-list?${new URLSearchParams(
      params as any
    ).toString()}`,

  // Requisition Approval
  getAllRequisitionApproval:
    "/v1/requisition-approval/get-requisition-approval-list",
  getRequisitionApprovalById: (id: number) => `/v1/requisition-approval/${id}`,
  createRequisitionApproval:
    "/v1/requisition-approval/save-requisition-approval",
  updateRequisitionApproval:
    "/v1/requisition-approval/update-requisition-approval",
  deleteRequisitionApproval: (id: number) =>
    `/v1/requisition-approval/delete-requisition-approval/${id}`,
  bulkDeleteRequisitionApproval: `/v1/requisition-approval/delete-requisition-approvals`,

  // Supplier
  getAllSupplier: "/v1/supplier/get-supplier-list",
  getSupplierDropdown: "/v1/supplier/get-supplier-dropdown",
  getSupplierById: (id: number) => `/v1/supplier/${id}`,
  createSupplier: "/v1/supplier/save-supplier",
  updateSupplier: "/v1/supplier/update-supplier",
  deleteSupplier: (id: number) => `/v1/supplier/delete-supplier/${id}`,
  bulkDeleteSupplier: `/v1/supplier/delete-suppliers`,
  searchSupplier: (params: {
    pageIndex: number
    pageSize: number
    search?: string
  }) =>
    `/v1/supplier/get-supplier-list?${new URLSearchParams(params as any).toString()}`,

  // Supplier Category
  getAllSupplierCategory: "/v1/supplier-category/get-supplier-category-list",
  getSupplierCategoryById: (id: number) => `/v1/supplier-category/${id}`,
  createSupplierCategory: "/v1/supplier-category/save-supplier-category",
  updateSupplierCategory: "/v1/supplier-category/update-supplier-category",
  deleteSupplierCategory: (id: number) =>
    `/v1/supplier-category/delete-supplier-category/${id}`,
  bulkDeleteSupplierCategory: `/v1/supplier-category/delete-supplier-categories`,

  // Supplier Contact
  getAllSupplierContact: "/v1/supplier-contract/get-contract-list",
  getSupplierContactById: (id: number) => `/v1/supplier-contract/${id}`,
  createSupplierContact: "/v1/supplier-contract/save-contract",
  deleteSupplierContact: (id: number) =>
    `/v1/supplier-contract/delete-contract/${id}`,

  // Supplier Contract Renewal
  getSupplierContractRenewalById: (id: number) =>
    `/v1/supplier-contract-renewal/${id}`,
  createSupplierContractRenewal:
    "/v1/supplier-contract-renewal/save-contract-renewal",
  updateSupplierContractRenewal:
    "/v1/supplier-contract-renewal/update-contract-renewal",
  deleteSupplierContractRenewal: `/v1/supplier-contract-renewal/delete-contract-renewal`,

  // Service Level Agreement
  getAllServiceLevelAgreement: "/v1/supplier-sla-tracker/get-sla-tracker-list",
  getServiceLevelAgreementById: (id: number) =>
    `/v1/supplier-sla-tracker/${id}`,
  createServiceLevelAgreement: "/v1/supplier-sla-tracker/save-sla-tracker",
  updateServiceLevelAgreement: "/v1/supplier-sla-tracker/update-sla-tracker",
  deleteServiceLevelAgreement: (id: number) =>
    `/v1/supplier-sla-tracker/delete-sla-tracker/${id}`,

  // Supplier Collaboration
  getAllSupplierCollaboration:
    "/v1/supplier-collaboration/get-collaboration-list",
  getSupplierCollaborationById: (id: number) =>
    `/v1/supplier-collaboration/${id}`,
  createSupplierCollaboration: "/v1/supplier-collaboration/send-supplier-email",
  deleteSupplierCollaboration: (id: number) =>
    `/v1/supplier-collaboration/delete-collaboration/${id}`,
  bulkDeleteSupplierCollaboration: `/v1/supplier-collaboration/delete-collaborations`,
  markAsRead: (id: number) =>
    `/v1/supplier-collaboration/email/${id}/mark-as-read`,
  markAsImportant: (id: number) =>
    `/v1/supplier-collaboration/email/${id}/mark-as-important`,
  markAsStarred: (id: number) =>
    `/v1/supplier-collaboration/email/${id}/mark-as-starred`,
  sendSupplierEmailReplay:
    "/v1/supplier-collaboration/send-supplier-email-reply",

  // Warehouse
  getAllWarehouse: "/v1/warehouse/get-warehouse-list",
  getWarehouseDropdown: "/v1/warehouse/get-warehouse-dropdown",
  getWarehouseById: (id: number) => `/v1/warehouse/${id}`,
  createWarehouse: "/v1/warehouse/save-warehouse",
  updateWarehouse: "/v1/warehouse/update-warehouse",
  deleteWarehouse: (id: number) => `/v1/warehouse/delete-warehouse/${id}`,
  bulkDeleteWarehouse: `/v1/warehouse/delete-warehouses`,
  searchWarehouse: (params: {
    pageIndex: number
    pageSize: number
    search?: string
  }) =>
    `/v1/warehouse/get-warehouse-list?${new URLSearchParams(params as any).toString()}`,

  // Warehouse Manager
  getAllWarehouseManager: "/v1/warehouse-manager/get-warehouse-manager-list",
  getWarehouseManagerById: (id: number) => `/v1/warehouse-manager/${id}`,
  createWarehouseManager: "/v1/warehouse-manager/save-warehouse-manager",
  updateWarehouseManager: "/v1/warehouse-manager/update-warehouse-manager",
  deleteWarehouseManager: (id: number) =>
    `/v1/warehouse-manager/delete-warehouse-manager/${id}`,
  bulkDeleteWarehouseManager: `/v1/warehouse-manager/delete-warehouse-managers`,

  // Stock
  getAllInventory: "/v1/inventory/get-inventory-list",
  getInventoryDropdown: "/v1/inventory/get-inventory-dropdown",
  getInventoryById: (id: number) => `/v1/inventory/${id}`,
  createInventory: "/v1/inventory/save-inventory",
  updateInventory: "/v1/inventory/update-inventory",
  deleteInventory: (id: number) => `/v1/inventory/delete-inventory/${id}`,
  bulkDeleteInventory: `/v1/inventory/delete-inventories`,
  patchInventoryReceived: "/v1/inventory/update-inventory-stocks",
  patchInventoryUpdate: "/v1/inventory/update-inventory-stock",

  // Stock Transfer
  getAllStockTransfer: "/v1/stock-transfer/get-stock-transfer-list",
  getStockTransferDropdown: "/v1/stock-transfer/get-stock-transfer-dropdown",
  getStockTransferById: (id: number) => `/v1/stock-transfer/${id}`,
  createStockTransfer: "/v1/stock-transfer/save-stock-transfer",
  updateStockTransfer: "/v1/stock-transfer/update-stock-transfer",
  deleteStockTransfer: (id: number) =>
    `/v1/stock-transfer/delete-stock-transfer/${id}`,
  bulkDeleteStockTransfer: `/v1/stock-transfer/delete-stock-transfers`,

  // Stock Transfer Approval
  getAllStockTransferApproval: "/v1/stock-transfer-approval/get-approval-list",
  getStockTransferApprovalById: (id: number) =>
    `/v1/stock-transfer-approval/${id}`,
  createStockTransferApproval:
    "/v1/stock-transfer-approval/save-stock-transfer-approval",
  updateStockTransferApproval:
    "/v1/stock-transfer-approval/update-stock-transfer-approval",
  deleteStockTransferApproval: (id: number) =>
    `/v1/stock-transfer-approval/delete-stock-transfer-approval/${id}`,
  bulkDeleteStockTransferApproval: `/v1/stock-transfer-approval/delete-stock-transfer-approvals`,

  // Stock Replenishment
  getAllStockReplenishment:
    "/v1/stock-replenishment/get-stock-replenishment-list",
  getStockReplenishmentById: (id: number) => `/v1/stock-replenishment/${id}`,
  createStockReplenishment: "/v1/stock-replenishment/save-stock-replenishment",
  updateStockReplenishment:
    "/v1/stock-replenishment/update-stock-replenishment",
  deleteStockReplenishment: (id: number) =>
    `/v1/stock-replenishment/delete-stock-replenishment/${id}`,
  bulkDeleteStockReplenishment: `/v1/stock-replenishment/delete-stock-replenishments`,

  // Stock Replenishment Approval
  getAllStockReplenishmentApproval:
    "/v1/stock-replenishment-approval/get-replenishment-approval-list",
  getStockReplenishmentApprovalById: (id: number) =>
    `/v1/stock-replenishment-approval/${id}`,
  createStockReplenishmentApproval:
    "/v1/stock-replenishment-approval/save-replenishment-approval",
  updateStockReplenishmentApproval:
    "/v1/stock-replenishment-approval/update-replenishment-approval",
  deleteStockReplenishmentApproval: (id: number) =>
    `/v1/stock-replenishment-approval/delete-replenishment-approval/${id}`,
  bulkDeleteStockReplenishmentApproval: `/v1/stock-replenishment-approval/delete-replenishment-approvals`,

  //Forecasting
  getAllForecasting: "/v1/forecast/get-forecast-list",
  getForecastingById: (id: number) => `/v1/forecast/${id}`,
  createForecasting: "/v1/forecast/save-forecast",
  updateForecasting: "/v1/forecast/update-forecast",
  deleteForecasting: (id: number) => `/v1/forecast/delete-forecast/${id}`,
  bulkDeleteForecasting: `/v1/forecast/delete-forecasts`,

  // Forecast Review
  getAllSalesOperationPlan: "/v1/forecast-review/get-forecast-review-list",
  getSalesOperationPlanById: (id: number) => `/v1/forecast-review/${id}`,
  createSalesOperationPlan: "/v1/forecast-review/save-forecast-review",
  updateSalesOperationPlan: "/v1/forecast-review/update-forecast-review",
  deleteSalesOperationPlan: (id: number) =>
    `/v1/forecast-review/delete-forecast-review/${id}`,
  bulkDeleteSalesOperationPlan: `/v1/forecast-review/delete-forecast-reviews`,

  // Forecast Review Approval
  getAllSalesOperationApproval:
    "/v1/forecast-review-approval/get-approval-list",
  getSalesOperationApprovalById: (id: number) =>
    `/v1/forecast-review-approval/${id}`,
  createSalesOperationApproval:
    "/v1/forecast-review-approval/save-forecast-review-approval",
  updateSalesOperationApproval:
    "/v1/forecast-review-approval/update-forecast-review-approval",
  deleteSalesOperationApproval: (id: number) =>
    `/v1/forecast-review-approval/delete-forecast-review-approval/${id}`,
  bulkDeleteSalesOperationApproval: `/v1/forecast-review-approval/delete-forecast-review-approvals`,
  // Capacity Planning
  getAllCapacityPlanning: "/v1/capacity-planning/get-capacity-planning-list",
  getCapacityPlanningById: (id: number) => `/v1/capacity-planning/${id}`,
  createCapacityPlanning: "/v1/capacity-planning/save-capacity-planning",
  updateCapacityPlanning: "/v1/capacity-planning/update-capacity-planning",
  deleteCapacityPlanning: (id: number) =>
    `/v1/capacity-planning/delete-capacity-planning/${id}`,
  bulkDeleteCapacityPlanning: `/v1/capacity-planning/delete-capacity-plannings`,

  // Risk Assessment
  getAllRiskAssessment: "/v1/risk-assessment/get-risk-assessment-list",
  getRiskAssessmentById: (id: number) => `/v1/risk-assessment/${id}`,
  createRiskAssessment: "/v1/risk-assessment/save-risk-assessment",
  updateRiskAssessment: "/v1/risk-assessment/update-risk-assessment",
  deleteRiskAssessment: (id: number) =>
    `/v1/risk-assessment/delete-risk-assessment/${id}`,
  bulkDeleteRiskAssessment: `/v1/risk-assessment/delete-risk-assessments`,

  // Supplier Evaluation
  getAllSupplierEvaluation:
    "/v1/supplier-evaluation/get-supplier-evaluation-list",
  getSupplierEvaluationById: (id: number) => `/v1/supplier-evaluation/${id}`,
  createSupplierEvaluation: "/v1/supplier-evaluation/save-supplier-evaluation",
  updateSupplierEvaluation:
    "/v1/supplier-evaluation/update-supplier-evaluation",
  deleteSupplierEvaluation: (id: number) =>
    `/v1/supplier-evaluation/delete-supplier-evaluation/${id}`,
  bulkDeleteSupplierEvaluation: `/v1/supplier-evaluation/delete-supplier-evaluations`,

  // Carriers
  getAllCarriers: "/v1/carrier/get-carrier-list",
  getCarrierById: (id: number) => `/v1/carrier/${id}`,
  createCarrier: "/v1/carrier/save-carrier",
  updateCarrier: "/v1/carrier/update-carrier",
  deleteCarrier: (id: number) => `/v1/carrier/delete-carrier/${id}`,
  bulkDeleteCarrier: `/v1/carrier/delete-carriers`,

  // Freight
  getAllFreight: "/v1/freight/get-freight-list",
  getFreightById: (id: number) => `/v1/freight/${id}`,
  createFreight: "/v1/freight/save-freight",
  updateFreight: "/v1/freight/update-freight",
  deleteFreight: (id: number) => `/v1/freight/delete-freight/${id}`,
  bulkDeleteFreight: `/v1/freight/delete-freights`,

  // Shipment
  getAllShipment: "/v1/shipment/get-shipment-list",
  getShipmentById: (id: number) => `/v1/shipment/${id}`,
  createShipment: "/v1/shipment/save-shipment",
  updateShipment: "/v1/shipment/update-shipment",
  patchShipmentReceived: "/v1/shipment/shipment-received",
  deleteShipment: (id: number) => `/v1/shipment/delete-shipment/${id}`,
  bulkDeleteShipment: `/v1/shipment/delete-shipments`,

  //return request
  getAllReturnRequest: "/v1/return-request/get-return-request-list",
  getReturnRequestById: (id: number) => `/v1/return-request/${id}`,
  createReturnRequest: "/v1/return-request/save-return-request",
  updateReturnRequest: "/v1/return-request/update-return-request",
  deleteReturnRequest: (id: number) =>
    `/v1/return-request/delete-return-request/${id}`,
  bulkDeleteReturnRequest: `/v1/return-request/delete-return-requests`,

  //return approval
  getAllReturnApproval: "/v1/return-approval/get-return-approval-list",
  getReturnApprovalById: (id: number) => `/v1/return-approval/${id}`,
  createReturnApproval: "/v1/return-approval/save-return-approval",
  updateReturnApproval: "/v1/return-approval/update-return-approval",
  deleteReturnApproval: (id: number) =>
    `/v1/return-approval/delete-return-approval/${id}`,
  bulkDeleteReturnApproval: `/v1/return-approval/delete-return-approvals`,

  // Bill of Materials
  getAllBillOfMaterials: "/v1/bill-of-material/get-bill-of-material-list",
  getBillOfMaterialsById: (id: number) => `/v1/bill-of-material/${id}`,
  createBillOfMaterials: "/v1/bill-of-material/save-bill-of-material",
  updateBillOfMaterials: "/v1/bill-of-material/update-bill-of-material",
  deleteBillOfMaterials: (id: number) =>
    `/v1/bill-of-material/delete-bill-of-material/${id}`,
  bulkDeleteBillOfMaterials: `/v1/bill-of-material/delete-bill-of-materials`,

  //Bill of Materials Approval
  getAllBillOfMaterialsApproval:
    "/v1/bill-of-material-approval/get-bom-approval-list",
  getBillOfMaterialsApprovalById: (id: number) =>
    `/v1/bill-of-material-approval/${id}`,
  createBillOfMaterialsApproval:
    "/v1/bill-of-material-approval/save-bom-approval",
  updateBillOfMaterialsApproval:
    "/v1/bill-of-material-approval/update-bom-approval",
  deleteBillOfMaterialsApproval: (id: number) =>
    `/v1/bill-of-material-approval/delete-bom-approval/${id}`,
  bulkDeleteBillOfMaterialsApproval: `/v1/bill-of-material-approval/delete-bom-approvals`,

  // Bill of Materials Version
  getAllBillOfMaterialsVersion:
    "/v1/bill-of-material-version/get-bom-version-list",
  getBillOfMaterialsVersionById: (id: number) =>
    `/v1/bill-of-material-version/${id}`,
  createBillOfMaterialsVersion: "/v1/bill-of-material-version/save-bom-version",
  updateBillOfMaterialsVersion:
    "/v1/bill-of-material-version/update-bom-version",
  deleteBillOfMaterialsVersion: (id: number) =>
    `/v1/bill-of-material-version/delete-bom-version/${id}`,
  bulkDeleteBillOfMaterialsVersion: `/v1/bill-of-material-version/delete-bom-versions`,

  // items
  getAllItems: "/v1/item/get-item-list",
  getItemById: (id: number) => `/v1/item/${id}`,
  createItem: "/v1/item/save-item",
  updateItem: "/v1/item/update-item",
  deleteItem: (id: number) => `/v1/item/delete-item/${id}`,
  bulkDeleteItem: `/v1/item/delete-items`,

  // Work Center
  getAllWorkCenter: "/v1/work-center/get-work-center-list",
  getWorkCenterById: (id: number) => `/v1/work-center/${id}`,
  createWorkCenter: "/v1/work-center/save-work-center",
  updateWorkCenter: "/v1/work-center/update-work-center",
  deleteWorkCenter: (id: number) => `/v1/work-center/delete-work-center/${id}`,
  bulkDeleteWorkCenter: `/v1/work-center/delete-work-centers`,

  //Machine
  getAllMachine: "/v1/machine/get-machine-list",
  getMachineById: (id: number) => `/v1/machine/${id}`,
  createMachine: "/v1/machine/save-machine",
  updateMachine: "/v1/machine/update-machine",
  deleteMachine: (id: number) => `/v1/machine/delete-machine/${id}`,
  bulkDeleteMachine: `/v1/machine/delete-machines`,

  //Material Requirement Plan
  getAllMaterialRequirementPlan: "/v1/material-requirement-plan/get-mrp-list",
  getMaterialRequirementPlanById: (id: number) =>
    `/v1/material-requirement-plan/${id}`,
  createMaterialRequirementPlan:
    "/v1/material-requirement-plan/save-material-requirement-plan",
  updateMaterialRequirementPlan:
    "/v1/material-requirement-plan/update-material-requirement-plan",
  deleteMaterialRequirementPlan: (id: number) =>
    `/v1/material-requirement-plan/delete-material-requirement-plan/${id}`,
  bulkDeleteMaterialRequirementPlan: `/v1/material-requirement-plan/delete-material-requirement-plans`,

  //Material Requirement Plan Approval
  getAllMaterialRequirementPlanApproval:
    "/v1/material-requirement-plan-approval/get-mrp-approval-list",
  getMaterialRequirementPlanApprovalById: (id: number) =>
    `/v1/material-requirement-plan-approval/${id}`,
  createMaterialRequirementPlanApproval:
    "/v1/material-requirement-plan-approval/save-mrp-approval",
  updateMaterialRequirementPlanApproval:
    "/v1/material-requirement-plan-approval/update-mrp-approval",
  deleteMaterialRequirementPlanApproval: (id: number) =>
    `/v1/material-requirement-plan-approval/delete-mrp-approval/${id}`,

  //Work Order
  getAllWorkOrder: "/v1/work-order/get-work-order-list",
  getWorkOrderById: (id: number) => `/v1/work-order/${id}`,
  createWorkOrder: "/v1/work-order/save-work-order",
  updateWorkOrder: "/v1/work-order/update-work-order",
  deleteWorkOrder: (id: number) => `/v1/work-order/delete-work-order/${id}`,
  bulkDeleteWorkOrder: `/v1/work-order/delete-work-orders`,

  // Compliance
  getAllCompliance: "/v1/compliance/get-compliance-list",
  getComplianceById: (id: number) => `/v1/compliance/${id}`,
  createCompliance: "/v1/compliance/save-compliance",
  updateCompliance: "/v1/compliance/update-compliance",
  deleteCompliance: (id: number) => `/v1/compliance/delete-compliance/${id}`,
  bulkDeleteCompliance: `/v1/compliance/delete-compliances`,

  // Risk Evaluation
  getAllRiskEvaluation: "/v1/risk-evaluation/get-risk-evaluation-list",
  getRiskEvaluationById: (id: number) => `/v1/risk-evaluation/${id}`,
  createRiskEvaluation: "/v1/risk-evaluation/save-risk-evaluation",
  updateRiskEvaluation: "/v1/risk-evaluation/update-risk-evaluation",
  deleteRiskEvaluation: (id: number) =>
    `/v1/risk-evaluation/delete-risk-evaluation/${id}`,
  bulkDeleteRiskEvaluation: `/v1/risk-evaluation/delete-risk-evaluations`,

  // Feature Reports
  getForecastingReviewAnalytics: "/v1/feature-report/forecast-review-analytics",
  getPurchaseAnalytics: "/v1/feature-report/purchase-analytics",
  getPurchaseOrderTrendsReport: "/v1/feature-report/purchase-order-trends",
  getFreightReport: "/v1/feature-report/freight-report",
  getProductionPlanning: "/v1/feature-report/production-planning",
  getBomStock: "/v1/feature-report/bom-details-summary",
  getCostManagementReport: "/v1/feature-report/bill-of-material-summary",
  getStockAnalyticsReport: "/v1/feature-report/stock-analytics-report",
  getInventoryShortageReport: "/v1/feature-report/inventory-shortage-report",
  getAccountPayableReport: "/v1/feature-report/accounts-payable-report",
}
