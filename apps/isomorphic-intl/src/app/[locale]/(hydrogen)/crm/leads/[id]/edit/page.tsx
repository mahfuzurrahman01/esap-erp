import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import LeadEditTemplate from "@/modules/crm/components/templates/lead/edit"

export const metadata = {
  ...metaObject("Lead Edit"),
}
const pageHeader = {
  title: "text-edit-lead",
  breadcrumb: [
    {
      name: "text-leads",
    },
    {
      href: routes.crm.leads,
      name: "text-lead-list",
    },
    {
      name: "text-edit-lead",
    },
  ],
}

export default async function LeadEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <LeadEditTemplate id={params.id} />
      </div>
    </>
  )
}
