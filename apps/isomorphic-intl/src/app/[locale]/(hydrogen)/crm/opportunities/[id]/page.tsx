import React from "react"

import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import OpportunityDetailsTemplate from "@/modules/crm/components/templates/opportunities/view"

export const metadata = {
  ...metaObject("View Opportunity"),
}

const pageHeader = {
  title: "text-view-opportunity",
  breadcrumb: [
    {
      href: routes.crm.opportunities,
      name: "text-opportunity-list",
    },
    {
      name: "text-view-opportunity",
    },
  ],
}

export default async function OpportunityDetailsPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <OpportunityDetailsTemplate pageHeader={pageHeader} id={params.id} />
  )
}