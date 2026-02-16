import React from "react"

import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CampaignDetailsTemplate from "@/modules/crm/components/templates/campaign/view"

export const metadata = {
  ...metaObject("View Campaign"),
}

const pageHeader = {
  title: "text-view-campaign",
  breadcrumb: [
    {
      href: routes.crm.campaigns,
      name: "text-campaign-list",
    },
    {
      name: "text-view-campaign",
    },
  ],
}

export default async function CampaignDetailsPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <CampaignDetailsTemplate pageHeader={pageHeader} id={params.id} />
  )
}