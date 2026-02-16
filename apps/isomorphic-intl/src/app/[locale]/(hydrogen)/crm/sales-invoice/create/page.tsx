import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import SalesInvoiceCreateTemplate from "@/modules/crm/components/templates/sales-invoice/create"

export const metadata = {
  ...metaObject("Sales Invoice Create"),
}

const pageHeader = {
  title: "text-create-sales-invoice",
  breadcrumb: [
    {
      name: "text-sales",
    },
    {
      href: routes.crm.salesInvoice,
      name: "text-sales-invoice-list",
    },
    {
      name: "text-create-sales-invoice",
    },
  ],
}

export default function SalesInvoiceCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <SalesInvoiceCreateTemplate />
    </>
  )
}
