"use client"

import { useParams } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import CreateEditInvoiceBills from "@/modules/scm/components/containers/procurement/invoice-bills/create-invoice-bills"
import { usePurchasedOrderById } from "@/modules/scm/hooks/procurement/purchased-order/use-purchased-order"
import { routes } from "@/config/routes"

const pageHeader = {
  title: "text-create-purchase-invoice",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-purchase-invoice-list",
      href: routes.scm.procurement.invoiceBills.invoiceBills,
    },
    {
      name: "text-create-purchase-invoice",
    },
  ],
}

export default function CreateInvoiceBillsPage() {
  const params = useParams()
  const id = params.id as string
  const { data: purchasedOrderData } =
    usePurchasedOrderById(Number(id))

  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateEditInvoiceBills
        isEditForm={false}
        initialData={purchasedOrderData}
      />
    </>
  )
}
