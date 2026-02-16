export const SCMApiEndpoint = {
  // Dashboard
  getInvoiceMaterialCost: "/scm/v1/dashboard-report/invoice-materialcosts",
  getTopSupplier: "/scm/v1/dashboard-report/top-suppliers",
  getMostProducedProducts: "/scm/v1/dashboard-report/most-produced-products",
  getMonthlyForecast: "/scm/v1/dashboard-report/monthly-forecasts",
  getMainStaticCard: "/scm/v1/dashboard-report/main-static-card",
  getOtherStaticCard: "/scm/v1/dashboard-report/other-static-card",

  // Country
  getAllCountry: "/scm/v1/country/get-country-list",
  getCountryById: (id: number) => `/scm/v1/country/${id}`,
  createCountry: "/scm/v1/country/save-country",
  updateCountry: "/scm/v1/country/update-country",
  deleteCountry: (id: number) => `/scm/v1/country/delete-country/${id}`,

  // Currency
  getAllCurrency: "/scm/v1/currency/get-currency-list",
  getCurrencyById: (id: number) => `/scm/v1/currency/${id}`,
  createCurrency: "/scm/v1/currency/save-currency",
  updateCurrency: "/scm/v1/currency/update-currency",
  deleteCurrency: `/scm/v1/currency/delete-currency`,

  // Invoice
  getAllInvoice: "/scm/v1/invoice-bill/get-invoice-bill-list",
  getInvoiceById: (id: number) => `/scm/v1/invoice-bill/${id}`,
  createInvoice: "/scm/v1/invoice-bill/save-invoice-bill",
  updateInvoice: "/scm/v1/invoice-bill/update-invoice-bill",
  deleteInvoice: (id: number) =>
    `/scm/v1/invoice-bill/delete-invoice-bill/${id}`,
  bulkDeleteInvoice: `/scm/v1/invoice-bill/delete-invoice-bills`,
  updatePaymentStatus: "/scm/v1/invoice-bill/update-payment-status?paymentStatus=1",

  // Item Unit
  getAllItemUnit: "/scm/v1/item-unit/get-item-unit-list",
  getItemUnitById: (id: number) => `/scm/v1/item-unit/${id}`,
  createItemUnit: "/scm/v1/item-unit/save-item-unit",
  updateItemUnit: "/scm/v1/item-unit/update-item-unit",
  deleteItemUnit: (id: number) => `/scm/v1/item-unit/delete-item-unit/${id}`,
  bulkDeleteItemUnit: `/scm/v1/item-unit/delete-item-units`,

  // Payment Method
  getAllPaymentMethod: "/scm/v1/payment-method/get-payment-method-list",
  getPaymentMethodById: (id: number) => `/scm/v1/payment-method/${id}`,
  createPaymentMethod: "/scm/v1/payment-method/save-payment-method",
  updatePaymentMethod: "/scm/v1/payment-method/update-payment-method",
  deletePaymentMethod: (id: number) =>
    `/scm/v1/payment-method/delete-payment-method/${id}`,
  bulkDeletePaymentMethod: `/scm/v1/payment-method/delete-payment-methods`,

  // Payment Terms
  getAllPaymentTerms: "/scm/v1/payment-terms/get-payment-terms-list",
  getPaymentTermsById: (id: number) => `/scm/v1/payment-terms/${id}`,
  createPaymentTerms: "/scm/v1/payment-terms/save-payment-terms",
  updatePaymentTerms: "/scm/v1/payment-terms/update-payment-terms",
  deletePaymentTerms: (id: number) =>
    `/scm/v1/payment-terms/delete-payment-terms/${id}`,
  bulkDeletePaymentTerms: `/scm/v1/payment-terms/delete-payment-terms`,

  // Product
  getAllProduct: "/scm/v1/product/get-product-list",
  getProductDropdown: "/scm/v1/product/get-product-dropdown",
  getProductById: (id: number) => `/scm/v1/product/${id}`,
  createProduct: "/scm/v1/product/save-product",
  updateProduct: "/scm/v1/product/update-product",
  deleteProduct: (id: number) => `/scm/v1/product/delete-product/${id}`,
  bulkDeleteProduct: `/scm/v1/product/delete-products`,

  // Product Category
  getAllProductCategory: "/scm/v1/product-category/get-product-category-list",
  getProductCategoryById: (id: number) => `/scm/v1/product-category/${id}`,
  createProductCategory: "/scm/v1/product-category/save-product-category",
  updateProductCategory: "/scm/v1/product-category/update-product-category",
  deleteProductCategory: (id: number) =>
    `/scm/v1/product-category/delete-product-category/${id}`,
  bulkDeleteProductCategory: `/scm/v1/product-category/delete-product-categories`,
  // Purchase Order
  getAllPurchaseOrder: "/scm/v1/purchase-order/get-purchase-order-list",
  getPurchaseOrderById: (id: number) => `/scm/v1/purchase-order/${id}`,
  createPurchaseOrder: "/scm/v1/purchase-order/save-purchase-order",
  updatePurchaseOrder: "/scm/v1/purchase-order/update-purchase-order",
  deletePurchaseOrder: (id: number) =>
    `/scm/v1/purchase-order/delete-purchase-order/${id}`,
  bulkDeletePurchaseOrder: `/scm/v1/purchase-order/delete-purchase-orders`,
  searchPurchaseOrder: (params: {
    pageIndex: number
    pageSize: number
    search?: string
  }) =>
    `/scm/v1/purchase-order/get-purchase-order-list?${new URLSearchParams(
      params as any
    ).toString()}`,

  // Purchase Order Approval
  getAllPurchaseOrderApproval:
    "/scm/v1/purchase-order-approval/get-approval-list",
  getPurchaseOrderApprovalById: (id: number) =>
    `/scm/v1/purchase-order-approval/${id}`,
  createPurchaseOrderApproval: "/scm/v1/purchase-order-approval/save-approval",
  updatePurchaseOrderApproval:
    "/scm/v1/purchase-order-approval/update-approval",
  deletePurchaseOrderApproval: (id: number) =>
    `/scm/v1/purchase-order-approval/delete-approval/${id}`,
  bulkDeletePurchaseOrderApproval: `/scm/v1/purchase-order-approval/delete-approvals`,
  // Requisition
  getAllRequisition: "/scm/v1/requisition/get-requisition-list",
  getRequisitionById: (id: number) => `/scm/v1/requisition/${id}`,
  createRequisition: "/scm/v1/requisition/save-requisition",
  updateRequisition: "/scm/v1/requisition/update-requisition",
  deleteRequisition: (id: number) =>
    `/scm/v1/requisition/delete-requisition/${id}`,
  bulkDeleteRequisition: `/scm/v1/requisition/delete-requisitions`,
  sendByEmail: "/scm/v1/requisition/send-requisition-email",
  searchRequisition: (params: {
    pageIndex: number
    pageSize: number
    search?: string
  }) =>
    `/scm/v1/requisition/get-requisition-list?${new URLSearchParams(
      params as any
    ).toString()}`,

  // Requisition Approval
  getAllRequisitionApproval:
    "/scm/v1/requisition-approval/get-requisition-approval-list",
  getRequisitionApprovalById: (id: number) =>
    `/scm/v1/requisition-approval/${id}`,
  createRequisitionApproval:
    "/scm/v1/requisition-approval/save-requisition-approval",
  updateRequisitionApproval:
    "/scm/v1/requisition-approval/update-requisition-approval",
  deleteRequisitionApproval: (id: number) =>
    `/scm/v1/requisition-approval/delete-requisition-approval/${id}`,
  bulkDeleteRequisitionApproval: `/scm/v1/requisition-approval/delete-requisition-approvals`,

  // Supplier
  getAllSupplier: "/scm/v1/supplier/get-supplier-list",
  getSupplierDropdown: "/scm/v1/supplier/get-supplier-dropdown",
  getSupplierById: (id: number) => `/scm/v1/supplier/${id}`,
  createSupplier: "/scm/v1/supplier/save-supplier",
  updateSupplier: "/scm/v1/supplier/update-supplier",
  deleteSupplier: (id: number) => `/scm/v1/supplier/delete-supplier/${id}`,
  bulkDeleteSupplier: `/scm/v1/supplier/delete-suppliers`,
  searchSupplier: (params: {
    pageIndex: number
    pageSize: number
    search?: string
  }) =>
    `/scm/v1/supplier/get-supplier-list?${new URLSearchParams(params as any).toString()}`,

  // Supplier Category
  getAllSupplierCategory:
    "/scm/v1/supplier-category/get-supplier-category-list",
  getSupplierCategoryById: (id: number) => `/scm/v1/supplier-category/${id}`,
  createSupplierCategory: "/scm/v1/supplier-category/save-supplier-category",
  updateSupplierCategory: "/scm/v1/supplier-category/update-supplier-category",
  deleteSupplierCategory: (id: number) =>
    `/scm/v1/supplier-category/delete-supplier-category/${id}`,
  bulkDeleteSupplierCategory: `/scm/v1/supplier-category/delete-supplier-categories`,

  // Supplier Contact
  getAllSupplierContact: "/scm/v1/supplier-contract/get-contract-list",
  getSupplierContactById: (id: number) => `/scm/v1/supplier-contract/${id}`,
  createSupplierContact: "/scm/v1/supplier-contract/save-contract",
  deleteSupplierContact: (id: number) =>
    `/scm/v1/supplier-contract/delete-contract/${id}`,

  // Supplier Contract Renewal
  getSupplierContractRenewalById: (id: number) =>
    `/scm/v1/supplier-contract-renewal/${id}`,
  createSupplierContractRenewal:
    "/scm/v1/supplier-contract-renewal/save-contract-renewal",
  updateSupplierContractRenewal:
    "/scm/v1/supplier-contract-renewal/update-contract-renewal",
  deleteSupplierContractRenewal: `/scm/v1/supplier-contract-renewal/delete-contract-renewal`,

  // Service Level Agreement
  getAllServiceLevelAgreement:
    "/scm/v1/supplier-sla-tracker/get-sla-tracker-list",
  getServiceLevelAgreementById: (id: number) =>
    `/scm/v1/supplier-sla-tracker/${id}`,
  createServiceLevelAgreement: "/scm/v1/supplier-sla-tracker/save-sla-tracker",
  updateServiceLevelAgreement:
    "/scm/v1/supplier-sla-tracker/update-sla-tracker",
  deleteServiceLevelAgreement: (id: number) =>
    `/scm/v1/supplier-sla-tracker/delete-sla-tracker/${id}`,

  // Supplier Collaboration
  getAllSupplierCollaboration:
    "/scm/v1/supplier-collaboration/get-collaboration-list",
  getSupplierCollaborationById: (id: number) =>
    `/scm/v1/supplier-collaboration/${id}`,
  createSupplierCollaboration:
    "/scm/v1/supplier-collaboration/send-supplier-email",
  deleteSupplierCollaboration: (id: number) =>
    `/scm/v1/supplier-collaboration/delete-collaboration/${id}`,
  bulkDeleteSupplierCollaboration: `/scm/v1/supplier-collaboration/delete-collaborations`,
  markAsRead: (id: number) =>
    `/scm/v1/supplier-collaboration/email/${id}/mark-as-read`,
  markAsImportant: (id: number) =>
    `/scm/v1/supplier-collaboration/email/${id}/mark-as-important`,
  markAsStarred: (id: number) =>
    `/scm/v1/supplier-collaboration/email/${id}/mark-as-starred`,
  sendSupplierEmailReplay: "/scm/v1/supplier-collaboration/send-supplier-email-reply",




  // Warehouse
  getAllWarehouse: "/scm/v1/warehouse/get-warehouse-list",
  getWarehouseDropdown: "/scm/v1/warehouse/get-warehouse-dropdown",
  getWarehouseById: (id: number) => `/scm/v1/warehouse/${id}`,
  createWarehouse: "/scm/v1/warehouse/save-warehouse",
  updateWarehouse: "/scm/v1/warehouse/update-warehouse",
  deleteWarehouse: (id: number) => `/scm/v1/warehouse/delete-warehouse/${id}`,
  bulkDeleteWarehouse: `/scm/v1/warehouse/delete-warehouses`,
  searchWarehouse: (params: {
    pageIndex: number
    pageSize: number
    search?: string
  }) =>
    `/scm/v1/warehouse/get-warehouse-list?${new URLSearchParams(params as any).toString()}`,

  // Warehouse Manager
  getAllWarehouseManager:
    "/scm/v1/warehouse-manager/get-warehouse-manager-list",
  getWarehouseManagerById: (id: number) => `/scm/v1/warehouse-manager/${id}`,
  createWarehouseManager: "/scm/v1/warehouse-manager/save-warehouse-manager",
  updateWarehouseManager: "/scm/v1/warehouse-manager/update-warehouse-manager",
  deleteWarehouseManager: (id: number) =>
    `/scm/v1/warehouse-manager/delete-warehouse-manager/${id}`,
  bulkDeleteWarehouseManager: `/scm/v1/warehouse-manager/delete-warehouse-managers`,

  // Stock
  getAllInventory: "/scm/v1/inventory/get-inventory-list",
  getInventoryDropdown: "/scm/v1/inventory/get-inventory-dropdown",
  getInventoryById: (id: number) => `/scm/v1/inventory/${id}`,
  createInventory: "/scm/v1/inventory/save-inventory",
  updateInventory: "/scm/v1/inventory/update-inventory",
  deleteInventory: (id: number) => `/scm/v1/inventory/delete-inventory/${id}`,
  bulkDeleteInventory: `/scm/v1/inventory/delete-inventories`,
  patchInventoryReceived: "/scm/v1/inventory/update-inventory-stocks",
  patchInventoryUpdate: "/scm/v1/inventory/update-inventory-stock",

  // Stock Transfer
  getAllStockTransfer: "/scm/v1/stock-transfer/get-stock-transfer-list",
  getStockTransferDropdown:
    "/scm/v1/stock-transfer/get-stock-transfer-dropdown",
  getStockTransferById: (id: number) => `/scm/v1/stock-transfer/${id}`,
  createStockTransfer: "/scm/v1/stock-transfer/save-stock-transfer",
  updateStockTransfer: "/scm/v1/stock-transfer/update-stock-transfer",
  deleteStockTransfer: (id: number) =>
    `/scm/v1/stock-transfer/delete-stock-transfer/${id}`,
  bulkDeleteStockTransfer: `/scm/v1/stock-transfer/delete-stock-transfers`,

  // Stock Transfer Approval
  getAllStockTransferApproval:
    "/scm/v1/stock-transfer-approval/get-approval-list",
  getStockTransferApprovalById: (id: number) =>
    `/scm/v1/stock-transfer-approval/${id}`,
  createStockTransferApproval:
    "/scm/v1/stock-transfer-approval/save-stock-transfer-approval",
  updateStockTransferApproval:
    "/scm/v1/stock-transfer-approval/update-stock-transfer-approval",
  deleteStockTransferApproval: (id: number) =>
    `/scm/v1/stock-transfer-approval/delete-stock-transfer-approval/${id}`,
  bulkDeleteStockTransferApproval: `/scm/v1/stock-transfer-approval/delete-stock-transfer-approvals`,

  // Stock Replenishment
  getAllStockReplenishment:
    "/scm/v1/stock-replenishment/get-stock-replenishment-list",
  getStockReplenishmentById: (id: number) =>
    `/scm/v1/stock-replenishment/${id}`,
  createStockReplenishment:
    "/scm/v1/stock-replenishment/save-stock-replenishment",
  updateStockReplenishment:
    "/scm/v1/stock-replenishment/update-stock-replenishment",
  deleteStockReplenishment: (id: number) =>
    `/scm/v1/stock-replenishment/delete-stock-replenishment/${id}`,
  bulkDeleteStockReplenishment: `/scm/v1/stock-replenishment/delete-stock-replenishments`,

  // Stock Replenishment Approval
  getAllStockReplenishmentApproval:
    "/scm/v1/stock-replenishment-approval/get-replenishment-approval-list",
  getStockReplenishmentApprovalById: (id: number) =>
    `/scm/v1/stock-replenishment-approval/${id}`,
  createStockReplenishmentApproval:
    "/scm/v1/stock-replenishment-approval/save-replenishment-approval",
  updateStockReplenishmentApproval:
    "/scm/v1/stock-replenishment-approval/update-replenishment-approval",
  deleteStockReplenishmentApproval: (id: number) =>
    `/scm/v1/stock-replenishment-approval/delete-replenishment-approval/${id}`,
  bulkDeleteStockReplenishmentApproval: `/scm/v1/stock-replenishment-approval/delete-replenishment-approvals`,

  //Forecasting
  getAllForecasting: "/scm/v1/forecast/get-forecast-list",
  getForecastingById: (id: number) => `/scm/v1/forecast/${id}`,
  createForecasting: "/scm/v1/forecast/save-forecast",
  updateForecasting: "/scm/v1/forecast/update-forecast",
  deleteForecasting: (id: number) => `/scm/v1/forecast/delete-forecast/${id}`,
  bulkDeleteForecasting: `/scm/v1/forecast/delete-forecasts`,

  // Forecast Review
  getAllSalesOperationPlan: "/scm/v1/forecast-review/get-forecast-review-list",
  getSalesOperationPlanById: (id: number) => `/scm/v1/forecast-review/${id}`,
  createSalesOperationPlan: "/scm/v1/forecast-review/save-forecast-review",
  updateSalesOperationPlan: "/scm/v1/forecast-review/update-forecast-review",
  deleteSalesOperationPlan: (id: number) =>
    `/scm/v1/forecast-review/delete-forecast-review/${id}`,
  bulkDeleteSalesOperationPlan: `/scm/v1/forecast-review/delete-forecast-reviews`,

  // Forecast Review Approval
  getAllSalesOperationApproval:
    "/scm/v1/forecast-review-approval/get-approval-list",
  getSalesOperationApprovalById: (id: number) =>
    `/scm/v1/forecast-review-approval/${id}`,
  createSalesOperationApproval:
    "/scm/v1/forecast-review-approval/save-forecast-review-approval",
  updateSalesOperationApproval:
    "/scm/v1/forecast-review-approval/update-forecast-review-approval",
  deleteSalesOperationApproval: (id: number) =>
    `/scm/v1/forecast-review-approval/delete-forecast-review-approval/${id}`,
  bulkDeleteSalesOperationApproval: `/scm/v1/forecast-review-approval/delete-forecast-review-approvals`,
  // Capacity Planning
  getAllCapacityPlanning:
    "/scm/v1/capacity-planning/get-capacity-planning-list",
  getCapacityPlanningById: (id: number) => `/scm/v1/capacity-planning/${id}`,
  createCapacityPlanning: "/scm/v1/capacity-planning/save-capacity-planning",
  updateCapacityPlanning: "/scm/v1/capacity-planning/update-capacity-planning",
  deleteCapacityPlanning: (id: number) =>
    `/scm/v1/capacity-planning/delete-capacity-planning/${id}`,
  bulkDeleteCapacityPlanning: `/scm/v1/capacity-planning/delete-capacity-plannings`,

  // Risk Assessment
  getAllRiskAssessment: "/scm/v1/risk-assessment/get-risk-assessment-list",
  getRiskAssessmentById: (id: number) => `/scm/v1/risk-assessment/${id}`,
  createRiskAssessment: "/scm/v1/risk-assessment/save-risk-assessment",
  updateRiskAssessment: "/scm/v1/risk-assessment/update-risk-assessment",
  deleteRiskAssessment: (id: number) =>
    `/scm/v1/risk-assessment/delete-risk-assessment/${id}`,
  bulkDeleteRiskAssessment: `/scm/v1/risk-assessment/delete-risk-assessments`,

  // Supplier Evaluation
  getAllSupplierEvaluation:
    "/scm/v1/supplier-evaluation/get-supplier-evaluation-list",
  getSupplierEvaluationById: (id: number) =>
    `/scm/v1/supplier-evaluation/${id}`,
  createSupplierEvaluation:
    "/scm/v1/supplier-evaluation/save-supplier-evaluation",
  updateSupplierEvaluation:
    "/scm/v1/supplier-evaluation/update-supplier-evaluation",
  deleteSupplierEvaluation: (id: number) =>
    `/scm/v1/supplier-evaluation/delete-supplier-evaluation/${id}`,
  bulkDeleteSupplierEvaluation: `/scm/v1/supplier-evaluation/delete-supplier-evaluations`,

  // Carriers
  getAllCarriers: "/scm/v1/carrier/get-carrier-list",
  getCarrierById: (id: number) => `/scm/v1/carrier/${id}`,
  createCarrier: "/scm/v1/carrier/save-carrier",
  updateCarrier: "/scm/v1/carrier/update-carrier",
  deleteCarrier: (id: number) => `/scm/v1/carrier/delete-carrier/${id}`,
  bulkDeleteCarrier: `/scm/v1/carrier/delete-carriers`,

  // Freight
  getAllFreight: "/scm/v1/freight/get-freight-list",
  getFreightById: (id: number) => `/scm/v1/freight/${id}`,
  createFreight: "/scm/v1/freight/save-freight",
  updateFreight: "/scm/v1/freight/update-freight",
  deleteFreight: (id: number) => `/scm/v1/freight/delete-freight/${id}`,
  bulkDeleteFreight: `/scm/v1/freight/delete-freights`,

  // Shipment
  getAllShipment: "/scm/v1/shipment/get-shipment-list",
  getShipmentById: (id: number) => `/scm/v1/shipment/${id}`,
  createShipment: "/scm/v1/shipment/save-shipment",
  updateShipment: "/scm/v1/shipment/update-shipment",
  patchShipmentReceived: "/scm/v1/shipment/shipment-received",
  deleteShipment: (id: number) => `/scm/v1/shipment/delete-shipment/${id}`,
  bulkDeleteShipment: `/scm/v1/shipment/delete-shipments`,

  //return request
  getAllReturnRequest: "/scm/v1/return-request/get-return-request-list",
  getReturnRequestById: (id: number) => `/scm/v1/return-request/${id}`,
  createReturnRequest: "/scm/v1/return-request/save-return-request",
  updateReturnRequest: "/scm/v1/return-request/update-return-request",
  deleteReturnRequest: (id: number) =>
    `/scm/v1/return-request/delete-return-request/${id}`,
  bulkDeleteReturnRequest: `/scm/v1/return-request/delete-return-requests`,

  //return approval
  getAllReturnApproval: "/scm/v1/return-approval/get-return-approval-list",
  getReturnApprovalById: (id: number) => `/scm/v1/return-approval/${id}`,
  createReturnApproval: "/scm/v1/return-approval/save-return-approval",
  updateReturnApproval: "/scm/v1/return-approval/update-return-approval",
  deleteReturnApproval: (id: number) =>
    `/scm/v1/return-approval/delete-return-approval/${id}`,
  bulkDeleteReturnApproval: `/scm/v1/return-approval/delete-return-approvals`,

  // Bill of Materials
  getAllBillOfMaterials: "/scm/v1/bill-of-material/get-bill-of-material-list",
  getBillOfMaterialsById: (id: number) => `/scm/v1/bill-of-material/${id}`,
  createBillOfMaterials: "/scm/v1/bill-of-material/save-bill-of-material",
  updateBillOfMaterials: "/scm/v1/bill-of-material/update-bill-of-material",
  deleteBillOfMaterials: (id: number) =>
    `/scm/v1/bill-of-material/delete-bill-of-material/${id}`,
  bulkDeleteBillOfMaterials: `/scm/v1/bill-of-material/delete-bill-of-materials`,

  //Bill of Materials Approval
  getAllBillOfMaterialsApproval:
    "/scm/v1/bill-of-material-approval/get-bom-approval-list",
  getBillOfMaterialsApprovalById: (id: number) =>
    `/scm/v1/bill-of-material-approval/${id}`,
  createBillOfMaterialsApproval:
    "/scm/v1/bill-of-material-approval/save-bom-approval",
  updateBillOfMaterialsApproval:
    "/scm/v1/bill-of-material-approval/update-bom-approval",
  deleteBillOfMaterialsApproval: (id: number) =>
    `/scm/v1/bill-of-material-approval/delete-bom-approval/${id}`,
  bulkDeleteBillOfMaterialsApproval: `/scm/v1/bill-of-material-approval/delete-bom-approvals`,

  // Bill of Materials Version
  getAllBillOfMaterialsVersion:
    "/scm/v1/bill-of-material-version/get-bom-version-list",
  getBillOfMaterialsVersionById: (id: number) =>
    `/scm/v1/bill-of-material-version/${id}`,
  createBillOfMaterialsVersion:
    "/scm/v1/bill-of-material-version/save-bom-version",
  updateBillOfMaterialsVersion:
    "/scm/v1/bill-of-material-version/update-bom-version",
  deleteBillOfMaterialsVersion: (id: number) =>
    `/scm/v1/bill-of-material-version/delete-bom-version/${id}`,
  bulkDeleteBillOfMaterialsVersion: `/scm/v1/bill-of-material-version/delete-bom-versions`,

  // items
  getAllItems: "/scm/v1/item/get-item-list",
  getItemById: (id: number) => `/scm/v1/item/${id}`,
  createItem: "/scm/v1/item/save-item",
  updateItem: "/scm/v1/item/update-item",
  deleteItem: (id: number) => `/scm/v1/item/delete-item/${id}`,
  bulkDeleteItem: `/scm/v1/item/delete-items`,

  // Work Center
  getAllWorkCenter: "/scm/v1/work-center/get-work-center-list",
  getWorkCenterById: (id: number) => `/scm/v1/work-center/${id}`,
  createWorkCenter: "/scm/v1/work-center/save-work-center",
  updateWorkCenter: "/scm/v1/work-center/update-work-center",
  deleteWorkCenter: (id: number) =>
    `/scm/v1/work-center/delete-work-center/${id}`,
  bulkDeleteWorkCenter: `/scm/v1/work-center/delete-work-centers`,

  //Machine
  getAllMachine: "/scm/v1/machine/get-machine-list",
  getMachineById: (id: number) => `/scm/v1/machine/${id}`,
  createMachine: "/scm/v1/machine/save-machine",
  updateMachine: "/scm/v1/machine/update-machine",
  deleteMachine: (id: number) => `/scm/v1/machine/delete-machine/${id}`,
  bulkDeleteMachine: `/scm/v1/machine/delete-machines`,

  //Material Requirement Plan
  getAllMaterialRequirementPlan:
    "/scm/v1/material-requirement-plan/get-mrp-list",
  getMaterialRequirementPlanById: (id: number) =>
    `/scm/v1/material-requirement-plan/${id}`,
  createMaterialRequirementPlan:
    "/scm/v1/material-requirement-plan/save-material-requirement-plan",
  updateMaterialRequirementPlan:
    "/scm/v1/material-requirement-plan/update-material-requirement-plan",
  deleteMaterialRequirementPlan: (id: number) =>
    `/scm/v1/material-requirement-plan/delete-material-requirement-plan/${id}`,
  bulkDeleteMaterialRequirementPlan: `/scm/v1/material-requirement-plan/delete-material-requirement-plans`,

  //Material Requirement Plan Approval
  getAllMaterialRequirementPlanApproval:
    "/scm/v1/material-requirement-plan-approval/get-mrp-approval-list",
  getMaterialRequirementPlanApprovalById: (id: number) =>
    `/scm/v1/material-requirement-plan-approval/${id}`,
  createMaterialRequirementPlanApproval:
    "/scm/v1/material-requirement-plan-approval/save-mrp-approval",
  updateMaterialRequirementPlanApproval:
    "/scm/v1/material-requirement-plan-approval/update-mrp-approval",
  deleteMaterialRequirementPlanApproval: (id: number) =>
    `/scm/v1/material-requirement-plan-approval/delete-mrp-approval/${id}`,

  //Work Order
  getAllWorkOrder: "/scm/v1/work-order/get-work-order-list",
  getWorkOrderById: (id: number) => `/scm/v1/work-order/${id}`,
  createWorkOrder: "/scm/v1/work-order/save-work-order",
  updateWorkOrder: "/scm/v1/work-order/update-work-order",
  deleteWorkOrder: (id: number) => `/scm/v1/work-order/delete-work-order/${id}`,
  bulkDeleteWorkOrder: `/scm/v1/work-order/delete-work-orders`,

  // Compliance
  getAllCompliance: "/scm/v1/compliance/get-compliance-list",
  getComplianceById: (id: number) => `/scm/v1/compliance/${id}`,
  createCompliance: "/scm/v1/compliance/save-compliance",
  updateCompliance: "/scm/v1/compliance/update-compliance",
  deleteCompliance: (id: number) =>
    `/scm/v1/compliance/delete-compliance/${id}`,
  bulkDeleteCompliance: `/scm/v1/compliance/delete-compliances`,

  // Risk Evaluation
  getAllRiskEvaluation: "/scm/v1/risk-evaluation/get-risk-evaluation-list",
  getRiskEvaluationById: (id: number) => `/scm/v1/risk-evaluation/${id}`,
  createRiskEvaluation: "/scm/v1/risk-evaluation/save-risk-evaluation",
  updateRiskEvaluation: "/scm/v1/risk-evaluation/update-risk-evaluation",
  deleteRiskEvaluation: (id: number) =>
    `/scm/v1/risk-evaluation/delete-risk-evaluation/${id}`,
  bulkDeleteRiskEvaluation: `/scm/v1/risk-evaluation/delete-risk-evaluations`,

  // Feature Reports
  getForecastingReviewAnalytics:
    "/scm/v1/feature-report/forecast-review-analytics",
  getPurchaseAnalytics: "/scm/v1/feature-report/purchase-analytics",
  getPurchaseOrderTrendsReport: "/scm/v1/feature-report/purchase-order-trends",
  getFreightReport: "/scm/v1/feature-report/freight-report",
  getProductionPlanning: "/scm/v1/feature-report/production-planning",
  getBomStock: "/scm/v1/feature-report/bom-details-summary",
  getCostManagementReport: "/scm/v1/feature-report/bill-of-material-summary",
  getStockAnalyticsReport: "/scm/v1/feature-report/stock-analytics-report",
  getInventoryShortageReport:
    "/scm/v1/feature-report/inventory-shortage-report",
  getAccountPayableReport: "/scm/v1/feature-report/accounts-payable-report",
}
