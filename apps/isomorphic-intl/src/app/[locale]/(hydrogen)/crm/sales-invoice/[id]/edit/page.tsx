import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import SalesInvoiceEditTemplate from "@/modules/crm/components/templates/sales-invoice/edit"

export const metadata = {
  ...metaObject("Sales Invoice Edit"),
}

const pageHeader = {
  title: "text-edit-sales-invoice",
  breadcrumb: [
    {
      name: "text-sales",
    },
    {
      href: routes.crm.salesInvoice,
      name: "text-sales-invoice-list",
    },
    {
      name: "text-edit-sales-invoice",
    },
  ],
}

export default async function SalesInvoiceEditPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <SalesInvoiceEditTemplate id={params.id} />
      </div>
    </>
  )
}
