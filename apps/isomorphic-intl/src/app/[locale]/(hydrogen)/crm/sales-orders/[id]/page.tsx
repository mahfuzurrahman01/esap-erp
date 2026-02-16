import React from "react"

import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import SalesOrderDetailsTemplate from "@/modules/crm/components/templates/sales-orders/view"

export const metadata = {
  ...metaObject("View Sales Order"),
}

const pageHeader = {
  title: "text-view-sales-order",
  breadcrumb: [
    {
      name: "text-sales",
    },
    {
      href: routes.crm.salesOrders,
      name: "text-sales-order-list",
    },
    {
      name: "text-view-sales-order",
    },
  ],
}

export default async function SalesOrderDetailsPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <div className="@container">
      <SalesOrderDetailsTemplate pageHeader={pageHeader} id={params.id} />
    </div>
  )
}
