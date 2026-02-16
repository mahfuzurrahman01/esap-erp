import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import OpportunityEditTemplate from "@/modules/crm/components/templates/opportunities/edit"

export const metadata = {
  ...metaObject("Opportunity Edit"),
}
const pageHeader = {
  title: "text-edit-opportunity",
  breadcrumb: [
    {
      name: "text-opportunities",
    },
    {
      href: routes.crm.opportunities,
      name: "text-opportunity-list",
    },
    {
      name: "text-edit-opportunity",
    },
  ],
}

export default async function OpportunityEditPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <OpportunityEditTemplate id={params.id} />
      </div>
    </>
  )
}
