import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import LeadCreateTemplate from "@/modules/crm/components/templates/lead/create"

export const metadata = {
  ...metaObject("Lead Create"),
}

const pageHeader = {
  title: "text-create-lead",
  breadcrumb: [
    {
      name: "text-lead",
    },
    {
      href: routes.crm.leads,
      name: "text-lead-list",
    },
    {
      name: "text-create-lead",
    },
  ],
}

export default function LeadCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <LeadCreateTemplate />
    </>
  )
}
