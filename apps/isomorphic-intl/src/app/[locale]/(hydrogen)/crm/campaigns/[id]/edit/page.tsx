import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CampaignEditTemplate from "@/modules/crm/components/templates/campaign/edit"

export const metadata = {
  ...metaObject("Campaign Edit"),
}
const pageHeader = {
  title: "text-edit-campaign",
  breadcrumb: [
    {
      name: "text-campaigns",
    },
    {
      href: routes.crm.campaigns,
      name: "text-campaign-list",
    },
    {
      name: "text-edit-campaign",
    },
  ],
}

export default async function CampaignEditPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <CampaignEditTemplate id={params.id} />
      </div>
    </>
  )
}
