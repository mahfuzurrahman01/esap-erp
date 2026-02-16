import React from "react"

import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import SalesInvoiceDetailsTemplate from "@/modules/crm/components/templates/sales-invoice/view"

export const metadata = {
  ...metaObject("View Sales Invoice"),
}

const pageHeader = {
  title: "text-view-sales-invoice",
  breadcrumb: [
    {
      name: "text-sales",
    },
    {
      href: routes.crm.salesInvoice,
      name: "text-sales-invoice-list",
    },
    {
      name: "text-view-sales-invoice",
    },
  ],
}

export default async function SalesInvoiceDetailsPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  return (
    <div className="@container">
      <SalesInvoiceDetailsTemplate pageHeader={pageHeader} id={params.id} />
    </div>
  )
}
