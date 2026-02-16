"use client"

import { useState } from "react"

import { useSelectOptions } from "@/hooks/use-select-options"
import { useCustomerList } from "@/modules/crm/hooks/use-customers"
import { useQuotationList } from "@/modules/crm/hooks/use-quotation"
import { CustomerList } from "@/modules/crm/types/customer"
import { QuotationList } from "@/modules/crm/types/quotation"
import { SalesOrderDetail, SalesOrderList, taxDetails } from "@/modules/crm/types/sales-order"
import { useCOAList } from "@/modules/fms/hooks/use-coa"
import { useCurrencyList } from "@/modules/fms/hooks/use-currency"
import { COAList, CountryList, CurrencyList } from "@/modules/fms/types"
import { useTicketList } from "@/modules/crm/hooks/use-ticket"
import { TicketList } from "@/modules/crm/types/ticket"
import { useCampaignList } from "@/modules/crm/hooks/use-campaign"
import { CampaignList } from "@/modules/crm/types/campaign"
import { useLeadList } from "@/modules/crm/hooks/use-leads"
import { LeadList } from "@/modules/crm/types/lead"
import { useOpportunityList } from "@/modules/crm/hooks/use-opportunities"
import { useSalesOrderList } from "@/modules/crm/hooks/use-sales-order"
import { useSalesInvoiceList } from "@/modules/crm/hooks/use-sales-invoice"
import { SalesInvoice } from "@/modules/crm/types/sales-invoice"
import { useUserList } from "@/hooks/auth/use-user"
import { useCountryList } from "@/hooks/use-countries"

export function useSOTemplate() {
  const [taxDetails, setTaxDetails] = useState<taxDetails[]>([
    {
      id: "",
      chartOfAccountId: 0,
      taxRate: 0,
      taxAmount: 0,
      taxTypeId: 0,
      total: 0,
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
    console.log("ok")
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

  const { data: countries, isLoading: isCountryLoading } = useCountryList({pageSize:100})
  const countryOptions = useSelectOptions<CountryList>(
    countries?.data,
    "countryName"
  )

  const { data: tickets, isLoading: isTicketLoading } = useTicketList({pageSize:100})
  const ticketOptions = useSelectOptions<TicketList>(tickets?.data, "subject")
  
  const { data: campaigns, isLoading:isCampaignLoading } = useCampaignList({pageSize:100})
  const campaignOptions = useSelectOptions<CampaignList>(campaigns?.data, "subject")

  const { data: leads, isLoading:isLeadLoading } = useLeadList()
  const leadOptions = useSelectOptions<LeadList>(leads?.data, "title")

  const { data: outputData, isLoading:isOpportunityLoading }: any = useOpportunityList({pageSize:100})
  const opportunityData = outputData?.data
  const opportunityOptions = opportunityData?.map(
    (opportunity: any) => ({
      value: opportunity.id,
      label: opportunity?.name || "",
    })
  )

  const { data: orders, isLoading: isSalesOrderLoading } = useSalesOrderList({pageSize:100})
    const salesOrderOptions = useSelectOptions<SalesOrderList>(
      orders?.data,
      "salesOrderNo"
    )
    
  const { data: invoices, isLoading: isInvoiceLoading } = useSalesInvoiceList({pageSize:100})
    const invoiceOptions = useSelectOptions<SalesInvoice>(
      invoices?.data,
      "invoiceNo"
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
        total: 0
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

  const { data: output, isLoading: isUserLoading } = useUserList({pageSize:100})
  const users = output?.data || []
  const userOptions = users
    ?.filter((user: any) => user.firstName && user.firstName.trim() !== "")
    .map((user: any) => ({
      value: user.userId,
      label: `${user.firstName} ${user.lastName ?? ""}`.trim(),
    }))

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
    ticketOptions,
    isTicketLoading,
    campaignOptions,
    isCampaignLoading,
    leadOptions,
    isLeadLoading,
    opportunityOptions,
    isOpportunityLoading,
    salesOrderOptions,
    isSalesOrderLoading,
    invoiceOptions,
    isInvoiceLoading,
    userOptions,
    isUserLoading,
    countryOptions,
    isCountryLoading
  }
}
