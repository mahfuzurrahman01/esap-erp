"use client"

import { useState } from "react"

import { useSelectOptions } from "@/hooks/use-select-options"
import { useCustomerList } from "@/modules/crm/hooks/use-customers"
import { useQuotationList } from "@/modules/crm/hooks/use-quotation"
import { useSalesOrderList } from "@/modules/crm/hooks/use-sales-order"
import { CustomerList } from "@/modules/crm/types/customer"
import { QuotationList } from "@/modules/crm/types/quotation"
import {
  SalesOrderDetail,
  SalesOrderList,
  taxDetails,
} from "@/modules/crm/types/sales-order"
import { useCOAList } from "@/modules/fms/hooks/use-coa"
import { useCurrencyList } from "@/modules/fms/hooks/use-currency"
import { COAList, CurrencyList } from "@/modules/fms/types"

export function useSOTemplate() {
  const [taxDetails, setTaxDetails] = useState<taxDetails[]>([
    {
      id: "",
      chartOfAccountId: 0,
      taxRate: 0,
      taxAmount: 0,
      taxTypeId: 0,
    },
  ])
  const [entries, setEntries] = useState<SalesOrderDetail[]>([
    {
      id: "",
      productId: "",
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0,
    },
  ])

  const addNewRow = () => {
    const newEntry: SalesOrderDetail = {
      id: "",
      productId: "",
      quantity: 0,
      totalPrice: 0,
      unitPrice: 0,
    }

    const updatedEntries = [...entries, newEntry]
    setEntries(updatedEntries)
  }

  const handleRowChange = (index: number, field: string, value: any) => {
    const newEntries = [...entries]
    newEntries[index] = {
      ...newEntries[index],
      [field]: value,
    }
    setEntries(newEntries)
  }

  const handleRowDelete = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index)
    // Update serial numbers
    const updatedEntries = newEntries.map((entry, i) => ({
      ...entry,
      sn: i + 1,
    }))
    setEntries(updatedEntries)
  }

  const { data: quotations, isLoading: isQuotationLoading } = useQuotationList({pageSize:100})
  const quotationOptions = useSelectOptions<QuotationList>(
    quotations?.data,
    "quotationNo"
  )

  const { data: orders, isLoading: isSalesOrderLoading } = useSalesOrderList({pageSize:100})
  const salesOrderOptions = useSelectOptions<SalesOrderList>(
    orders?.data,
    "salesOrderNo"
  )

  const { data: customers, isLoading: isCustomerLoading } = useCustomerList({pageSize:100})
  const customerOptions = useSelectOptions<CustomerList>(
    customers?.data,
    "firstName"
  )

  const { data: currencyList, isLoading: isCurrencyLoading } = useCurrencyList({pageSize:100})
  const currencyOptions = useSelectOptions<CurrencyList>(
    currencyList?.data,
    "currencyName"
  )

  const { data: coaList, isLoading: isCOALoading } = useCOAList({pageSize:100})
  const chartOfAccountOptions = useSelectOptions<COAList>(
    coaList?.data,
    "accountName"
  )

  const addNewVTRow = () => {
    setTaxDetails([
      ...taxDetails,
      {
        id: "",
        chartOfAccountId: 0,
        taxRate: 0,
        taxAmount: 0,
        taxTypeId: 0,
      },
    ])
  }

  const handleVTRowChange = (index: number, field: string, value: any) => {
    const newEntries = [...taxDetails]
    newEntries[index] = {
      ...newEntries[index],
      [field]: value,
    }
    setTaxDetails(newEntries)
  }

  const handleVTRowDelete = (index: number) => {
    const newEntries = taxDetails.filter((_, i) => i !== index)
    // Update serial numbers
    const updatedEntries = newEntries.map((entry, i) => ({
      ...entry,
      sn: i + 1,
    }))
    setTaxDetails(updatedEntries)
  }

  return {
    entries,
    setEntries,
    addNewRow,
    handleRowChange,
    handleRowDelete,
    quotationOptions,
    customerOptions,
    currencyOptions,
    chartOfAccountOptions,
    isCOALoading,
    addNewVTRow,
    handleVTRowDelete,
    handleVTRowChange,
    isCurrencyLoading,
    taxDetails,
    setTaxDetails,
    isCustomerLoading,
    isQuotationLoading,
    salesOrderOptions,
    isSalesOrderLoading,
  }
}
