import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CampaignCreateTemplate from "@/modules/crm/components/templates/campaign/create"

export const metadata = {
  ...metaObject("Campaign Create"),
}

const pageHeader = {
  title: "text-create-campaign",
  breadcrumb: [
    {
      name: "text-campaign",
    },
    {
      href: routes.crm.campaigns,
      name: "text-campaign-list",
    },
    {
      name: "text-create-campaign",
    },
  ],
}

export default function CampaignCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CampaignCreateTemplate />
    </>
  )
}
