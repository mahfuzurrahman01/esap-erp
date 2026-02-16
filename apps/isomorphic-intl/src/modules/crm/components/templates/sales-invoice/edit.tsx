"use client"

import SkeletonLoader from "@/components/base/skeleton-loader"
import SalesInvoiceForm from "@/modules/crm/components/containers/sales-invoice/form"
import { useSalesInvoiceById } from "@/modules/crm/hooks/use-sales-invoice"
import { SalesInvoice } from "@/modules/crm/types/sales-invoice"

export default function SalesInvoiceEditTemplate({ id }: { id: string }) {
  const { data: salesInvoice, isLoading } = useSalesInvoiceById(id) as {
    data: SalesInvoice | undefined
    isLoading: boolean
  }

  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <SalesInvoiceForm id={id} salesInvoiceData={salesInvoice} />
  )
}
