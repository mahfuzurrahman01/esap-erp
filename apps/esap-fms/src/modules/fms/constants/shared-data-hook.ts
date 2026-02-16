import { useCallback, useEffect, useState } from "react"

import debounce from "lodash/debounce"

import { useCountryList } from "@/hooks/use-countries"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useUniqueSelectOptions } from "@/hooks/use-unique-select-options"
import { useCustomerList } from "@/modules/crm/hooks/use-customers"
import { CustomerList } from "@/modules/crm/types/customer"
import { useAccountingTypesList } from "@/modules/fms/hooks/use-accounting-type"
import { useAssetCategoryList } from "@/modules/fms/hooks/use-asset-category"
import { useAssetLocationList } from "@/modules/fms/hooks/use-asset-location"
import { useBankList } from "@/modules/fms/hooks/use-bank"
import { useBankAccountList } from "@/modules/fms/hooks/use-bank-account"
import { useBankAccountTypeList } from "@/modules/fms/hooks/use-bank-account-type"
import { useBankTransactionList } from "@/modules/fms/hooks/use-bank-transaction"
import { useBudgetAgainstList } from "@/modules/fms/hooks/use-budget-against"
import { useBudgetTemplateList } from "@/modules/fms/hooks/use-budget-template"
import { useCOAList } from "@/modules/fms/hooks/use-coa"
import { useCompanyList } from "@/modules/fms/hooks/use-company"
import { useCurrencyList } from "@/modules/fms/hooks/use-currency"
import { useJournalEntryList } from "@/modules/fms/hooks/use-journal-entry"
import { useJournalEntryTypeList } from "@/modules/fms/hooks/use-journal-entry-type"
import { useTaxCategoryList } from "@/modules/fms/hooks/use-tax-category"
import { useTaxTemplateList } from "@/modules/fms/hooks/use-tax-template"
import { useZatcaCategoryList } from "@/modules/fms/hooks/use-zatca-category"
import {
  AssetList,
  AssetMaintenanceList,
  AssetMovementList,
  BudgetTemplateList,
  CostCenterList,
  FiscalYearList,
  JournalEntryList,
  JournalEntryType,
  ModeOfPaymentList,
  PaymentList,
  PaymentRequestList,
  TaxCategoryList,
  TaxRuleTypeList,
  TaxTemplateList,
  TaxTemplateTypesList,
  TransactionPaymentTypeList,
  ZatcaCategoryList,
} from "@/modules/fms/types"
import { AssetCategoryList } from "@/modules/fms/types/asset-category"
import { AssetLocationList } from "@/modules/fms/types/asset-location"
import { BankList } from "@/modules/fms/types/bank"
import { BankAccountList } from "@/modules/fms/types/bank-account"
import { BankAccountTypeList } from "@/modules/fms/types/bank-account-types"
import { BankTransactionList } from "@/modules/fms/types/bank-transaction"
import { BudgetAgainstList } from "@/modules/fms/types/budget-against"
import { COAList } from "@/modules/fms/types/coa"
import { CompanyList } from "@/modules/fms/types/company"
import { CountryList } from "@/modules/fms/types/country"
import { CurrencyList } from "@/modules/fms/types/currency"
import { useDepartmentList } from "@/modules/hrms/hooks/employee/use-department"
import { useEmployeeList } from "@/modules/hrms/hooks/employee/use-employee"
import { useProductList } from "@/modules/scm/hooks/inventory/product/use-product"
import { useSupplierList } from "@/modules/scm/hooks/procurement/supplier/use-supplier"
import { Product } from "@/modules/scm/types/inventory/products/products-types"
import { Supplier } from "@/modules/scm/types/procurement/supplier/supplier-types"
import { Department } from "@/types/hrms/employee/department.types"
import { Employee } from "@/types/hrms/employee/employee.types"

import { useAssetList } from "../hooks/use-asset"
import { useAssetMaintenanceList } from "../hooks/use-asset-maintenance"
import { useAssetMovementList } from "../hooks/use-asset-movement"
import { useCostCenterList } from "../hooks/use-cost-center"
import { useFiscalYearList } from "../hooks/use-fiscal-year"
import { useModeOfPaymentList } from "../hooks/use-mode-of-payment"
import { usePaymentList } from "../hooks/use-payments"
import { usePaymentRequestList } from "../hooks/use-payments-request"
import { AccountTypeList } from "../types/accounting-types"

// Individual hook functions that return only what's needed
export const useAssetCategoryData = () => {
  const { data: assetCategoryList, isLoading: isAssetCategoryLoading } =
    useAssetCategoryList({ pageSize: 100 })

  const assetCategoryOptions = useSelectOptions<AssetCategoryList>(
    assetCategoryList?.data,
    "assetCategoryName"
  )

  return { isAssetCategoryLoading, assetCategoryOptions }
}

export const useCompanyData = () => {
  const { data: companyList, isLoading: isCompanyLoading } = useCompanyList({
    pageSize: 100,
  })
  const companyOptions = useSelectOptions<CompanyList>(
    companyList?.data,
    "companyName"
  )
  return { isCompanyLoading, companyOptions, companyList }
}

export const useEmployeeData = () => {
  const { data: employeeList, isLoading: isEmployeeLoading } = useEmployeeList({
    pageSize: 100,
  })
  const employeeOptions = useSelectOptions<Employee>(
    employeeList?.data,
    "firstName"
  )
  return { isEmployeeLoading, employeeOptions, employeeList }
}

export const useDepartmentData = () => {
  const { data: departmentList, isLoading: isDepartmentLoading } =
    useDepartmentList({ pageSize: 100 })
  const departmentOptions = useSelectOptions<Department>(
    departmentList?.data,
    "departmentName"
  )
  return { isDepartmentLoading, departmentOptions, departmentList }
}

export const useAssetData = () => {
  const { data: assetList, isLoading: isAssetLoading } = useAssetList({
    pageSize: 100,
  })
  const assetOptions = useSelectOptions<AssetList>(
    assetList?.data,
    "assetSerialNumber"
  )

  return { isAssetLoading, assetOptions, assetList }
}

export const useAssetLocationData = () => {
  const { data: assetLocationList, isLoading: isAssetLocationLoading } =
    useAssetLocationList({ pageSize: 100 })
  const assetLocationOptions = useSelectOptions<AssetLocationList>(
    assetLocationList?.data,
    "assetLocationName"
  )
  return { isAssetLocationLoading, assetLocationOptions, assetLocationList }
}

export const useBankData = () => {
  const { data: bankList, isLoading: isBankLoading } = useBankList({
    pageSize: 100,
  })
  const bankOptions = useSelectOptions<BankList>(bankList?.data, "bankName")
  return { isBankLoading, bankOptions, bankList }
}

export const useBankAccountData = () => {
  const { data: bankAccountList, isLoading: isBankAccountLoading } =
    useBankAccountList({ pageSize: 100 })
  const bankAccountOptions = useSelectOptions<BankAccountList>(
    bankAccountList?.data,
    "accountName"
  )
  return { isBankAccountLoading, bankAccountOptions, bankAccountList }
}

export const useBankAccountTypeData = () => {
  const { data: bankAccountTypeList, isLoading: isBankAccountTypeLoading } =
    useBankAccountTypeList({ pageSize: 100 })
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

export const useBankTransactionData = () => {
  const { data: bankTransactionList, isLoading: isBankTransactionLoading } =
    useBankTransactionList({ pageSize: 100 })
  const bankTransactionOptions = useSelectOptions<BankTransactionList>(
    bankTransactionList?.data,
    "bankTransactionCode"
  )
  return {
    isBankTransactionLoading,
    bankTransactionOptions,
    bankTransactionList,
  }
}

export const useBudgetAgainstData = () => {
  const { data: budgetAgainstList, isLoading: isBudgetAgainstLoading } =
    useBudgetAgainstList({ pageSize: 100 })
  const budgetAgainstOptions = useSelectOptions<BudgetAgainstList>(
    budgetAgainstList?.data,
    "budgetAgainstName"
  )
  return { isBudgetAgainstLoading, budgetAgainstOptions, budgetAgainstList }
}

export const useBudgetTemplateData = () => {
  const { data: budgetTemplateList, isLoading: isBudgetTemplateLoading } =
    useBudgetTemplateList({ pageSize: 100 })
  const budgetTemplateOptions = useSelectOptions<BudgetTemplateList>(
    budgetTemplateList?.data,
    "budgetDistributionName"
  )
  return { isBudgetTemplateLoading, budgetTemplateOptions, budgetTemplateList }
}

export const useCOAData = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: coaList, isLoading: isCOALoading } = useCOAList({
    pageSize: 100,
    sort: "desc",
    search: searchQuery,
  })

  const coaOptions = useSelectOptions<COAList>(coaList?.data, "accountName")

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query)
    }, 300),
    []
  )

  const searchCOA = async (query: string) => {
    debouncedSearch(query)
  }

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  return { isCOALoading, coaOptions, coaList, searchCOA }
}

export const useAccountTypeData = () => {
  const { data: accountTypeList, isLoading: isAccountTypeLoading } =
    useAccountingTypesList({
      pageSize: 200,
    })
  const accountTypeOptions = useSelectOptions<AccountTypeList>(
    accountTypeList?.data,
    "accountingTypeName"
  )
  return { isAccountTypeLoading, accountTypeOptions, accountTypeList }
}

export const useCurrencyData = () => {
  const { data: currencyList, isLoading: isCurrencyLoading } = useCurrencyList({
    pageSize: 230,
  })
  const currencyOptions = useSelectOptions<CurrencyList>(
    currencyList?.data,
    "currencyName"
  )
  return { isCurrencyLoading, currencyOptions, currencyList }
}

export const useJournalEntryData = () => {
  const { data: journalEntryList, isLoading: isJournalEntryLoading } =
    useJournalEntryList({ pageSize: 300 })
  const journalEntryOptions = useSelectOptions<JournalEntryList>(
    journalEntryList?.data,
    "journalNo"
  )
  return { isJournalEntryLoading, journalEntryOptions, journalEntryList }
}

export const useJournalEntryTypeData = () => {
  const { data: journalEntryTypesList, isLoading: isJournalEntryTypesLoading } =
    useJournalEntryTypeList({ pageSize: 100 })
  const journalEntryTypeOptions = useSelectOptions<JournalEntryType>(
    journalEntryTypesList?.data,
    "journalTypeName"
  )
  return {
    isJournalEntryTypesLoading,
    journalEntryTypeOptions,
    journalEntryTypesList,
  }
}

export const useModeOfPaymentData = () => {
  const { data: modeOfPaymentList, isLoading: isModeOfPaymentLoading } =
    useModeOfPaymentList({ pageSize: 100 })
  const modeOfPaymentOptions = useSelectOptions<ModeOfPaymentList>(
    modeOfPaymentList?.data,
    "modeOfPaymentName"
  )
  return { isModeOfPaymentLoading, modeOfPaymentOptions, modeOfPaymentList }
}

export const usePaymentData = () => {
  const { data: paymentList, isLoading: isPaymentLoading } = usePaymentList({
    pageSize: 500,
  })
  const paymentOptions = useSelectOptions<PaymentList>(
    paymentList?.data,
    "paymentNo"
  )
  return { isPaymentLoading, paymentOptions, paymentList }
}

export const usePaymentRequestData = () => {
  const { data: paymentRequestList, isLoading: isPaymentRequestLoading } =
    usePaymentRequestList({ pageSize: 500 })
  const paymentRequestOptions = useSelectOptions<PaymentRequestList>(
    paymentRequestList?.data,
    "paymentRequestNo"
  )
  return { isPaymentRequestLoading, paymentRequestOptions, paymentRequestList }
}

export const useTaxCategoryData = () => {
  const { data: taxCategoryList, isLoading: isTaxCategoryLoading } =
    useTaxCategoryList({ pageSize: 100 })
  const taxCategoryOptions = useSelectOptions<TaxCategoryList>(
    taxCategoryList?.data,
    "taxCategoryName"
  )
  return { isTaxCategoryLoading, taxCategoryOptions, taxCategoryList }
}

export const useTaxTemplateData = () => {
  const { data: taxTemplateList, isLoading: isTaxTemplateLoading } =
    useTaxTemplateList({ pageSize: 100 })
  const taxTemplateOptions = useSelectOptions<TaxTemplateList>(
    taxTemplateList?.data,
    "taxTemplateTypeName"
  )
  return { isTaxTemplateLoading, taxTemplateOptions, taxTemplateList }
}

export const taxRuleTypeOptions = [
  { label: "Sales", value: "Sales" },
  { label: "Purchase", value: "Purchase" },
]

export const taxTypeOptions = [
  { label: "Actual", value: "Actual" },
  { label: "On net total", value: "On net total" },
]

export const taxTemplateTypesOptions = [
  { label: "Purchase", value: "Purchase" },
  { label: "Sales", value: "Sales" },
]

export const useZatcaCategoryData = () => {
  const { data: zatcaCategoryList, isLoading: isZatcaCategoryLoading } =
    useZatcaCategoryList({ pageSize: 100 })
  const zatcaCategoryOptions = useSelectOptions<ZatcaCategoryList>(
    zatcaCategoryList?.data,
    "zatcaCategoryName"
  )
  return { isZatcaCategoryLoading, zatcaCategoryOptions, zatcaCategoryList }
}

export const useProductData = () => {
  const { data: productList, isLoading: isProductLoading } = useProductList({
    pageSize: 100,
  })
  const productOptions = useSelectOptions<Product>(
    productList?.data,
    "productCode"
  )
  return { isProductLoading, productOptions, productList }
}

export const useSupplierData = () => {
  const { data: supplierList, isLoading: isSupplierLoading } = useSupplierList({
    pageSize: 100,
  })
  const supplierOptions = useSelectOptions<Supplier>(
    supplierList?.data,
    "supplierName"
  )
  return { isSupplierLoading, supplierOptions, supplierList }
}

export const useCustomerData = () => {
  const { data: customerList, isLoading: isCustomerLoading } = useCustomerList({
    pageSize: 100,
  })
  const customerOptions = useSelectOptions<CustomerList>(
    customerList?.data,
    "firstName"
  )
  return { isCustomerLoading, customerOptions, customerList }
}

export const useCountryData = () => {
  const { data: countryList, isLoading: isCountryLoading } = useCountryList({
    pageSize: 100,
  })
  const countryOptions = useSelectOptions<CountryList>(
    countryList?.data,
    "countryName"
  )
  return { isCountryLoading, countryOptions, countryList }
}

export const useAccountingTypesData = () => {
  const { data: accountingTypesList, isLoading: isAccountingTypesLoading } =
    useAccountingTypesList({ pageSize: 100 })
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

export const useCostCenterData = () => {
  const { data: costCenterList, isLoading: isCostCenterLoading } =
    useCostCenterList({ pageSize: 100 })
  const costCenterOptions = useSelectOptions<CostCenterList>(
    costCenterList?.data,
    "costCenterName"
  )
  return { isCostCenterLoading, costCenterOptions, costCenterList }
}

export const useAssetMaintenanceData = () => {
  const { data: assetMaintenanceList, isLoading: isAssetMaintenanceLoading } =
    useAssetMaintenanceList({ pageSize: 100 })
  const assetMaintenanceOptions = useSelectOptions<AssetMaintenanceList>(
    assetMaintenanceList?.data,
    "assetSerialNumber"
  )
  return {
    isAssetMaintenanceLoading,
    assetMaintenanceOptions,
    assetMaintenanceList,
  }
}

export const useAssetMovementData = () => {
  const { data: assetMovementList, isLoading: isAssetMovementLoading } =
    useAssetMovementList({ pageSize: 100 })
  const assetMovementOptions = useSelectOptions<AssetMovementList>(
    assetMovementList?.data,
    "assetMovementSerialNumber"
  )
  return { isAssetMovementLoading, assetMovementOptions, assetMovementList }
}

export const useFiscalYearData = () => {
  const { data: fiscalYearList, isLoading: isFiscalYearLoading } =
    useFiscalYearList({ pageSize: 100 })
  const fiscalYearOptions = useSelectOptions<FiscalYearList>(
    fiscalYearList?.data,
    "yearRange"
  )
  return { isFiscalYearLoading, fiscalYearOptions, fiscalYearList }
}

export const partyTypeOptions = [
  { label: "Supplier", value: "Supplier" },
  { label: "Employee", value: "Employee" },
  { label: "Customer", value: "Customer" },
]

// Add TypeScript types for better type safety
export type SharedHookKeys =
  | "assetCategory"
  | "assetLocation"
  | "bank"
  | "bankAccount"
  | "bankAccountType"
  | "bankTransaction"
  | "budgetAgainst"
  | "budgetTemplate"
  | "coa"
  | "accountTypes"
  | "parentAccount"
  | "currency"
  | "journalEntry"
  | "journalEntryType"
  | "modeOfPayment"
  | "modeOfPaymentType"
  | "paymentType"
  | "payment"
  | "paymentRequest"
  | "paymentRequestType"
  | "taxCategory"
  | "taxRuleType"
  | "taxTemplate"
  | "taxTemplateTypes"
  | "zatcaCategory"
  | "product"
  | "supplier"
  | "customer"
  | "country"
  | "accountingTypes"
  | "costCenter"
  | "paymentStatus"
  | "assetMaintenance"
  | "assetMovement"
  | "company"
  | "employee"
  | "department"
  | "asset"
  | "fiscalYear"

// Single declaration of useSharedDataHooks with proper typing and memoization
export const useSharedDataHooks = (selectedHooks: SharedHookKeys[]) => {
  const calculateResult = useCallback((hooks: SharedHookKeys[]) => {
    const result: Record<string, any> = {}

    hooks.forEach((hook) => {
      try {
        switch (hook) {
          case "assetCategory":
            result.assetCategory = useAssetCategoryData()
            break
          case "assetLocation":
            result.assetLocation = useAssetLocationData()
            break
          case "bank":
            result.bank = useBankData()
            break
          case "bankAccount":
            result.bankAccount = useBankAccountData()
            break
          case "bankAccountType":
            result.bankAccountType = useBankAccountTypeData()
            break
          case "bankTransaction":
            result.bankTransaction = useBankTransactionData()
            break
          case "budgetAgainst":
            result.budgetAgainst = useBudgetAgainstData()
            break
          case "budgetTemplate":
            result.budgetTemplate = useBudgetTemplateData()
            break
          case "coa":
            result.coa = useCOAData()
            break
          case "accountTypes":
            result.accountType = useAccountTypeData()
            break
          case "currency":
            result.currency = useCurrencyData()
            break
          case "journalEntry":
            result.journalEntry = useJournalEntryData()
            break
          case "journalEntryType":
            result.journalEntryType = useJournalEntryTypeData()
            break
          case "modeOfPayment":
            result.modeOfPayment = useModeOfPaymentData()
            break
          case "payment":
            result.payment = usePaymentData()
            break
          case "paymentRequest":
            result.paymentRequest = usePaymentRequestData()
            break
          case "taxCategory":
            result.taxCategory = useTaxCategoryData()
            break
          case "taxTemplate":
            result.taxTemplate = useTaxTemplateData()
            break
          case "zatcaCategory":
            result.zatcaCategory = useZatcaCategoryData()
            break
          case "product":
            result.product = useProductData()
            break
          case "supplier":
            result.supplier = useSupplierData()
            break
          case "customer":
            result.customer = useCustomerData()
            break
          case "country":
            result.country = useCountryData()
            break
          case "accountingTypes":
            result.accountingTypes = useAccountingTypesData()
            break
          case "costCenter":
            result.costCenter = useCostCenterData()
            break
          case "assetMaintenance":
            result.assetMaintenance = useAssetMaintenanceData()
            break
          case "assetMovement":
            result.assetMovement = useAssetMovementData()
            break
          case "company":
            result.company = useCompanyData()
            break
          case "employee":
            result.employee = useEmployeeData()
            break
          case "department":
            result.department = useDepartmentData()
            break
          case "asset":
            result.asset = useAssetData()
            break
          case "fiscalYear":
            result.fiscalYear = useFiscalYearData()
            break
        }
      } catch (error) {
        console.warn(`Error loading data for ${hook}:`, error)
        result[hook] = {
          isLoading: false,
          error,
          data: undefined,
          [`${hook}Options`]: [],
        }
      }
    })

    return result
  }, [])

  return calculateResult(selectedHooks)
}
