import { useCallback } from "react"

import {
  useSelectOptions,
  useSelectOptionsWithApproval,
} from "@/hooks/use-select-options"
import { useAccountingTypesList, useBankAccountTypeList } from "@/modules/fms/hooks"
import { useAssetCategoryList } from "@/modules/fms/hooks/use-asset-category"
import { useCompanyList } from "@/modules/fms/hooks/use-company"
import { useCostCenterList } from "@/modules/fms/hooks/use-cost-center"
import { useCurrencyList } from "@/modules/fms/hooks/use-currency"
import { useTaxCategoryList } from "@/modules/fms/hooks/use-tax-category"
import { useTaxTemplateList } from "@/modules/fms/hooks/use-tax-template"
import { useTermsAndConditionsList } from "@/modules/fms/hooks/use-terms-and-conditions"
import {
  AssetCategoryList,
  BankAccountTypeList,
  CompanyList,
  CostCenterList,
  CurrencyList,
  TaxCategoryList,
  TaxTemplateList,
  TermsAndConditionsList,
} from "@/modules/fms/types"
import { useEmployeeList } from "@/modules/hrms/hooks/employee/use-employee"
import { Employee } from "@/types/hrms/employee/employee.types"

import {
  useInvoiceList,
  useMachinesList,
  useMaterialRequirementsPlanningList,
  useStockTransferList,
} from "../hooks"
import { useSalesOperationPlanList } from "../hooks/demand-and-forecasting/sales-operation-plan/use-sales-operation-plan"
import {
  useProductDropdown,
  useProductList,
} from "../hooks/inventory/product/use-product"
import { useProductCategoryList } from "../hooks/inventory/product/use-product-category"
import { useStockList } from "../hooks/inventory/stock/use-stock"
import { useWarehouseList } from "../hooks/inventory/warehouse/use-warehouse"
import { useWarehouseManagerList } from "../hooks/inventory/warehouse/use-warehouse-manager"
import { useFreightList } from "../hooks/logistic-and-transport/freight/use-freight"
import { usePurchasedOrderList } from "../hooks/procurement/purchased-order/use-purchased-order"
import { useRequisitionList } from "../hooks/procurement/requisition/use-requisition"
import { useUnitList } from "../hooks/procurement/requisition/use-unit"
import { usePaymentTermsList } from "../hooks/procurement/supplier/use-payment-terms"
import { useSupplierList } from "../hooks/procurement/supplier/use-supplier"
import { useWorkCentersList } from "../hooks/production-control/work-order-tracking/use-work-center"
import { SalesOperationPlan } from "../types/demand-and-forecasting/sales-operation-plan/sales-operation-plan-types"
import { ProductCategory } from "../types/inventory/products/product-category-types"
import { Product } from "../types/inventory/products/products-types"
import { Stock } from "../types/inventory/stock-overview/stock-overview-types"
import { StockTransfer } from "../types/inventory/stock-transfer/stock-transfer-types"
import { WarehouseManager } from "../types/inventory/warehouse/warehouse-manager-types"
import { Warehouse } from "../types/inventory/warehouse/warehouse-types"
import { Freight } from "../types/logistics-and-transport/freight/freight-types"
import { Invoice } from "../types/procurement/invoice/invoice-types"
import { PurchasedOrder } from "../types/procurement/purchased-order/purchased-order-types"
import { ItemUnit } from "../types/procurement/requisition/item-unit-types"
import { Requisition } from "../types/procurement/requisition/requisition-types"
import { PaymentTerms } from "../types/procurement/supplier/payment-terms-types"
import { Supplier } from "../types/procurement/supplier/supplier-types"
import { MaterialRequirementsPlanning } from "../types/production-control/materials-requirements-planning/material-requirements-planning-types"
import { Machine } from "../types/production-control/work-order-tracking/machine-types"
import { WorkCenter } from "../types/production-control/work-order-tracking/work-center-types"
import { AccountTypeList } from "@/modules/fms/types/accounting-types"

export const usePaymentTermsData = () => {
  const { data: paymentTermsDataList, isLoading: isPaymentTermsLoading } =
    usePaymentTermsList()
  const paymentTermsOptions = useSelectOptions<PaymentTerms>(
    paymentTermsDataList?.data,
    "name"
  )
  return { isPaymentTermsLoading, paymentTermsOptions }
}

export const useCurrencyData = () => {
  const { data: currenciesList, isLoading: isCurrenciesLoading } =
    useCurrencyList()
  const currencyOptions = useSelectOptions<CurrencyList>(
    currenciesList?.data,
    "currencyName"
  )
  return { isCurrenciesLoading, currencyOptions }
}

export const useSupplierData = () => {
  const { data: supplierDataList, isLoading: isSupplierLoading } =
    useSupplierList()
  const supplierOptions = useSelectOptions<Supplier>(
    supplierDataList?.data,
    "supplierName"
  )
  return { isSupplierLoading, supplierOptions }
}

export const useRequisitionData = () => {
  const { data: requisitionDataList, isLoading: isRequisitionLoading } =
    useRequisitionList()
  const requisitionOptions = useSelectOptionsWithApproval<Requisition>(
    requisitionDataList?.data,
    "requisitionNo"
  )
  return { isRequisitionLoading, requisitionOptions }
}

export const usePurchasedOrderData = () => {
  const { data: purchaseOrderDataList, isLoading: isPurchaseOrderLoading } =
    usePurchasedOrderList()
  const purchaseOrderOptions = useSelectOptionsWithApproval<PurchasedOrder>(
    purchaseOrderDataList?.data,
    "purchaseOrderNo"
  )
  return { isPurchaseOrderLoading, purchaseOrderOptions }
}

export const useInvoiceData = () => {
  const { data: invoiceDataList, isLoading: isInvoiceLoading } =
    useInvoiceList()
  const invoiceOptions = useSelectOptionsWithApproval<Invoice>(
    invoiceDataList?.data,
    "invoiceBillNo"
  )
  return { isInvoiceLoading, invoiceOptions }
}

export const useUnitData = () => {
  const { data: unitDataList, isLoading: isUnitLoading } = useUnitList()
  const unitOptions = useSelectOptions<ItemUnit>(unitDataList?.data, "name")
  return { isUnitLoading, unitOptions }
}

export const useProductDropdownData = () => {
  const { data: productDropdownDataList, isLoading: isProductDropdownLoading } =
    useProductDropdown()
  const productDropdownOptions = useSelectOptions<Product>(
    productDropdownDataList,
    "productName"
  )
  return { isProductDropdownLoading, productDropdownOptions }
}

export const useProductData = () => {
  const { data: productsDataList, isLoading: isProductsLoading } =
    useProductList()
  const productOptions = useSelectOptions<Product>(
    productsDataList?.data,
    "productName"
  )
  return { isProductsLoading, productOptions }
}
export const useProductCodeData = () => {
  const { data: productCodeDataList, isLoading: isProductCodeLoading } =
    useProductList()
  const productCodeOptions = useSelectOptions<Product>(
    productCodeDataList?.data,
    "productCode"
  )
  return { isProductCodeLoading, productCodeOptions }
}
export const useProductCategoryData = () => {
  const { data: productCategoryDataList, isLoading: isProductCategoryLoading } =
    useProductCategoryList()
  const productCategoryOptions = useSelectOptions<ProductCategory>(
    productCategoryDataList?.data,
    "name"
  )
  return { isProductCategoryLoading, productCategoryOptions }
}

export const useCompanyData = () => {
  const { data: companyDataList, isLoading: isCompanyLoading } =
    useCompanyList()
  const companyOptions = useSelectOptions<CompanyList>(
    companyDataList?.data,
    "companyName"
  )
  return { isCompanyLoading, companyOptions }
}

export const useWarehouseData = () => {
  const { data: warehouseDataList, isLoading: isWarehouseLoading } =
    useWarehouseList()
  const warehouseOptions = useSelectOptions<Warehouse>(
    warehouseDataList?.data,
    "location"
  )
  const warehouseTransferToOptions = useSelectOptions<Warehouse>(
    warehouseDataList?.data,
    "location"
  )
  const warehouseTransferFromOptions = useSelectOptions<Warehouse>(
    warehouseDataList?.data,
    "location"
  )
  return {
    isWarehouseLoading,
    warehouseOptions,
    warehouseTransferToOptions,
    warehouseTransferFromOptions,
  }
}

export const useWarehouseManagerData = () => {
  const {
    data: warehouseManagerDataList,
    isLoading: isWarehouseManagerLoading,
  } = useWarehouseManagerList()
  const warehouseManagerOptions = useSelectOptions<WarehouseManager>(
    warehouseManagerDataList?.data,
    "name"
  )
  return { isWarehouseManagerLoading, warehouseManagerOptions }
}

export const useAssetCategoryData = () => {
  const { data: assetCategoryDataList, isLoading: isAssetCategoryLoading } =
    useAssetCategoryList()
  const assetCategoryOptions = useSelectOptions<AssetCategoryList>(
    assetCategoryDataList?.data,
    "assetCategoryName"
  )
  return { isAssetCategoryLoading, assetCategoryOptions }
}

export const useTermAndConditionsData = () => {
  const {
    data: termAndConditionsDataList,
    isLoading: isTermAndConditionsLoading,
  } = useTermsAndConditionsList()
  const termAndConditionsOptions = useSelectOptions<TermsAndConditionsList>(
    termAndConditionsDataList?.data,
    "termsAndConditionName"
  )
  return { isTermAndConditionsLoading, termAndConditionsOptions }
}

export const useWorkCenterData = () => {
  const { data: workCenterDataList, isLoading: isWorkCenterLoading } =
    useWorkCentersList()
  const workCenterOptions = useSelectOptions<WorkCenter>(
    workCenterDataList?.data,
    "workCenterName"
  )
  return { isWorkCenterLoading, workCenterOptions }
}

export const useStockTransferData = () => {
  const { data: stockTransferDataList, isLoading: isStockTransferLoading } =
    useStockTransferList()
  const stockTransferOptions = useSelectOptions<StockTransfer>(
    stockTransferDataList?.data,
    "stockTransferNo"
  )
  return { isStockTransferLoading, stockTransferOptions }
}

export const useSalesOperationPlanData = () => {
  const {
    data: salesOperationPlanDataList,
    isLoading: isSalesOperationPlanLoading,
  } = useSalesOperationPlanList()
  const salesOperationPlanOptions = useSelectOptions<SalesOperationPlan>(
    salesOperationPlanDataList?.data,
    "forecastPeriod"
  )
  return { isSalesOperationPlanLoading, salesOperationPlanOptions }
}

export const useFreightData = () => {
  const { data: freightDataList, isLoading: isFreightLoading } =
    useFreightList()
  const freightOptions = useSelectOptions<Freight>(
    freightDataList?.data,
    "origin"
  )
  return { isFreightLoading, freightOptions }
}

export const useEmployeeData = () => {
  const { data: employeeDataList, isLoading: isEmployeeLoading } =
    useEmployeeList()
  const employeeOptions = useSelectOptions<Employee>(
    employeeDataList?.data,
    "firstName"
  )
  return { isEmployeeLoading, employeeOptions }
}

export const useTaxChargeData = () => {
  const { data: taxChargeDataList, isLoading: isTaxChargeLoading } =
    useTaxCategoryList()
  const taxChargeOptions = useSelectOptions<TaxCategoryList>(
    taxChargeDataList?.data,
    "taxCategoryName"
  )
  return { isTaxChargeLoading, taxChargeOptions }
}

export const useTaxTemplateData = () => {
  const { data: taxTemplateDataList, isLoading: isTaxTemplateLoading } =
    useTaxTemplateList()
  const taxTemplateOptions = useSelectOptions<TaxTemplateList>(
    taxTemplateDataList?.data,
    "taxTemplateName"
  )
  return { isTaxTemplateLoading, taxTemplateOptions }
}

export const useAccountingTypesData = () => {
  const { data: accountingTypesList, isLoading: isAccountingTypesLoading } =
    useAccountingTypesList()
  const accountingTypesOptions = useSelectOptions<AccountTypeList>(
    accountingTypesList?.data,
    "accountingTypeName"
  )
  return {
    isAccountingTypesLoading,
    accountingTypesOptions,
    accountingTypesList,
  }
}

export const useBankAccountTypeData = () => {
  const { data: bankAccountTypeList, isLoading: isBankAccountTypeLoading } =
    useBankAccountTypeList()
  const bankAccountTypeOptions = useSelectOptions<BankAccountTypeList>(
    bankAccountTypeList?.data,
    "bankAccountTypeName"
  )
  return {
    isBankAccountTypeLoading,
    bankAccountTypeOptions,
    bankAccountTypeList,
  }
}

export const useCostCenterData = () => {
  const { data: costCenterList, isLoading: isCostCenterLoading } =
    useCostCenterList()
  const costCenterOptions = useSelectOptions<CostCenterList>(
    costCenterList?.data,
    "costCenterName"
  )
  return { isCostCenterLoading, costCenterOptions, costCenterList }
}

export const useStockData = () => {
  const { data: stockDataList, isLoading: isStockLoading } = useStockList()
  const stockOptions = useSelectOptions<Stock>(stockDataList?.data, "sku")
  return { isStockLoading, stockOptions }
}

export const useMachineData = () => {
  const { data: machineDataList, isLoading: isMachineLoading } =
    useMachinesList()
  const machineOptions = useSelectOptions<Machine>(
    machineDataList?.data,
    "machineName"
  )
  return { isMachineLoading, machineOptions }
}

export const useMaterialRequirementPlanData = () => {
  const {
    data: materialRequirementPlanDataList,
    isLoading: isMaterialRequirementPlanLoading,
  } = useMaterialRequirementsPlanningList()
  const materialRequirementPlanOptions =
    useSelectOptions<MaterialRequirementsPlanning>(
      materialRequirementPlanDataList?.data,
      "id"
    )
  return { isMaterialRequirementPlanLoading, materialRequirementPlanOptions }
}

export type SharedHookKeys =
  | "paymentTerms"
  | "stockTransfer"
  | "machine"
  | "currency"
  | "supplier"
  | "requisition"
  | "purchaseOrder"
  | "invoice"
  | "unit"
  | "productDropdown"
  | "product"
  | "productCode"
  | "productCategory"
  | "company"
  | "warehouse"
  | "warehouseManager"
  | "assetCategory"
  | "termAndConditions"
  | "workCenter"
  | "salesOperationPlan"
  | "freight"
  | "employee"
  | "taxCharge"
  | "taxTemplate"
  | "accountingTypes"
  | "costCenter"
  | "stock"
  | "materialRequirementPlan"

export const useSCMSharedDataHook = (selectedHooks: SharedHookKeys[]) => {
  const calculateResult = useCallback((hooks: SharedHookKeys[]) => {
    const result: Record<string, any> = {}

    hooks.forEach((hook) => {
      switch (hook) {
        case "paymentTerms":
          result.paymentTerms = usePaymentTermsData()
          break
        case "currency":
          result.currency = useCurrencyData()
          break
        case "supplier":
          result.supplier = useSupplierData()
          break
        case "requisition":
          result.requisition = useRequisitionData()
          break
        case "purchaseOrder":
          result.purchaseOrder = usePurchasedOrderData()
          break
        case "invoice":
          result.invoice = useInvoiceData()
          break
        case "unit":
          result.unit = useUnitData()
          break
        case "productDropdown":
          result.productDropdown = useProductDropdownData()
          break
        case "product":
          result.product = useProductData()
          break
        case "productCode":
          result.productCode = useProductCodeData()
          break
        case "productCategory":
          result.productCategory = useProductCategoryData()
          break
        case "company":
          result.company = useCompanyData()
          break
        case "warehouse":
          result.warehouse = useWarehouseData()
          break
        case "warehouseManager":
          result.warehouseManager = useWarehouseManagerData()
          break
        case "assetCategory":
          result.assetCategory = useAssetCategoryData()
          break
        case "termAndConditions":
          result.termAndConditions = useTermAndConditionsData()
          break
        case "workCenter":
          result.workCenter = useWorkCenterData()
          break
        case "salesOperationPlan":
          result.salesOperationPlan = useSalesOperationPlanData()
          break
        case "freight":
          result.freight = useFreightData()
          break
        case "employee":
          result.employee = useEmployeeData()
          break
        case "taxCharge":
          result.taxCharge = useTaxChargeData()
          break
        case "taxTemplate":
          result.taxTemplate = useTaxTemplateData()
          break
        case "accountingTypes":
          result.accountingTypes = useAccountingTypesData()
          break
        case "costCenter":
          result.costCenter = useCostCenterData()
          break
        case "stock":
          result.stock = useStockData()
          break
        case "machine":
          result.machine = useMachineData()
          break
        case "materialRequirementPlan":
          result.materialRequirementPlan = useMaterialRequirementPlanData()
          break
        case "stockTransfer":
          result.stockTransfer = useStockTransferData()
          break
      }
    })
    return result
  }, [])
  return calculateResult(selectedHooks)
}
