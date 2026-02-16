import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import QuotationCreateTemplate from "@/modules/crm/components/templates/quotation/create"

export const metadata = {
  ...metaObject("Quotation Create"),
}

const pageHeader = {
  title: "text-create-quotation",
  breadcrumb: [
    {
      name: "text-sales",
    },
    {
      href: routes.crm.quotation,
      name: "text-quotation-list",
    },
    {
      name: "text-create-quotation",
    },
  ],
}

export default function QuotationCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <QuotationCreateTemplate />
    </>
  )
}
