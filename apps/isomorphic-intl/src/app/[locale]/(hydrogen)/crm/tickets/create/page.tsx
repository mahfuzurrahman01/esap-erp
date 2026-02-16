import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TicketCreateTemplate from "@/modules/crm/components/templates/tickets/create"

export const metadata = {
  ...metaObject("Ticket Create"),
}

const pageHeader = {
  title: "text-create-Ticket",
  breadcrumb: [
    {
      name: "text-supports",
    },
    {
      href: routes.crm.tickets,
      name: "text-tickets",
    },
    {
      name: "text-create-Ticket",
    },
  ],
}

export default function TicketCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <TicketCreateTemplate />
    </>
  )
}
