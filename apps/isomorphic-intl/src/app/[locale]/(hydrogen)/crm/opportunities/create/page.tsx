import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import OpportunityCreateTemplate from "@/modules/crm/components/templates/opportunities/create"

export const metadata = {
  ...metaObject("Opportunity Create"),
}

const pageHeader = {
  title: "text-create-opportunity",
  breadcrumb: [
    {
      name: "text-opportunity",
    },
    {
      href: routes.crm.opportunities,
      name: "text-opportunity-list",
    },
    {
      name: "text-create-opportunity",
    },
  ],
}

export default function CampaignCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <OpportunityCreateTemplate />
    </>
  )
}
