import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CustomerCreateTemplate from "@/modules/crm/components/templates/customers/create"

export const metadata = {
  ...metaObject("Customer Create"),
}

const pageHeader = {
  title: "text-create-customer",
  breadcrumb: [
    {
      name: "text-sales",
    },
    {
      href: routes.crm.customers,
      name: "text-customer-list",
    },
    {
      name: "text-create-customer",
    },
  ],
}

export default function CampaignCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CustomerCreateTemplate />
    </>
  )
}
