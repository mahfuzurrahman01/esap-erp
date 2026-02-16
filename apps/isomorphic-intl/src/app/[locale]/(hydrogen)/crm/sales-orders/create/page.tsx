import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import SalesOrderCreateTemplate from "@/modules/crm/components/templates/sales-orders/create"

export const metadata = {
  ...metaObject("Sales Order Create"),
}

const pageHeader = {
  title: "text-create-sales-order",
  breadcrumb: [
    {
      name: "text-sales",
    },
    {
      href: routes.crm.salesOrders,
      name: "text-sales-order-list",
    },
    {
      name: "text-create-sales-order",
    },
  ],
}

export default function SalesorderCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <SalesOrderCreateTemplate />
    </>
  )
}
