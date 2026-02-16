import React from "react"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TicketEditTemplate from "@/modules/crm/components/templates/tickets/edit"

export const metadata = {
  ...metaObject("Ticket Edit"),
}
const pageHeader = {
  title: "text-edit-ticket",
  breadcrumb: [
    {
      name: "text-supports",
    },
    {
      href: routes.crm.tickets,
      name: "text-tickets",
    },
    {
      name: "text-edit-ticket",
    },
  ],
}

export default async function TicketEditPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="@container">
        <TicketEditTemplate id={params.id} />
      </div>
    </>
  )
}
