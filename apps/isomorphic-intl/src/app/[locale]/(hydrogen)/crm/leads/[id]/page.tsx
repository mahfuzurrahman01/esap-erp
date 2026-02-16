import React from "react"

import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import LeadDetailsTemplate from "@/modules/crm/components/templates/lead/view"

export const metadata = {
  ...metaObject("View Lead"),
}

const pageHeader = {
  title: "text-view-lead",
  breadcrumb: [
    {
      href: routes.crm.leads,
      name: "text-lead-list",
    },
    {
      name: "text-view-lead",
    },
  ],
}

export default async function LeadDetailsPage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;
  return (
    <LeadDetailsTemplate pageHeader={pageHeader} id={params.id} />
  )
}