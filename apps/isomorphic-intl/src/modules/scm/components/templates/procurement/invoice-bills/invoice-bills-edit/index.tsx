"use client"

import { useParams } from "next/navigation"
import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import CreateEditInvoiceBill from "@/modules/scm/components/containers/procurement/invoice-bills/create-invoice-bills"
import { useInvoiceById } from "@/modules/scm/hooks/procurement/invoice/use-invoice"
import { Invoice } from "@/modules/scm/types/procurement/invoice/invoice-types"

const pageHeader = {
  title: "text-purchase-invoice-edit",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-purchase-invoice-list",
      href: routes.scm.procurement.invoiceBills.invoiceBills,
    },
    {
      name: "text-purchase-invoice-edit",
    },
  ],
}

export default function EditInvoiceBillsPage() {
  const { id } = useParams()
  const { data: invoiceData } = useInvoiceById(Number(id))
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateEditInvoiceBill
        isEditForm={true}
        initialData={invoiceData as Invoice}
      />
    </>
  )
}
