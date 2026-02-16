import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import BillCreateTemplate from "@/modules/crm/components/templates/bills/create"

export const metadata = {
  ...metaObject("Bill Create"),
}

const pageHeader = {
  title: "text-create-bill",
  breadcrumb: [
    {
      name: "text-sales",
    },
    {
      href: routes.crm.bills,
      name: "text-bill-list",
    },
    {
      name: "text-create-bill",
    },
  ],
}

export default function BillCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <BillCreateTemplate />
    </>
  )
}
