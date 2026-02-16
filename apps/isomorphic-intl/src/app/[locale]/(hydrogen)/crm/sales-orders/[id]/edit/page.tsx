import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import SalesOrderEditTemplate from "@/modules/crm/components/templates/sales-orders/edit"

export const metadata = {
  ...metaObject("SalesOrder Edit"),
}

const pageHeader = {
  title: "text-edit-sales-order",
  breadcrumb: [
    {
      name: "text-sales",
    },
    {
      href: routes.crm.salesOrders,
      name: "text-sales-order-list",
    },
    {
      name: "text-edit-sales-order",
    },
  ],
}

export default async function SalesOrderEditPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <SalesOrderEditTemplate id={params.id} />
      </div>
    </>
  )
}
