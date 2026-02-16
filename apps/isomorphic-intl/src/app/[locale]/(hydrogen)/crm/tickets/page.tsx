import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TicketListTemplate from "@/modules/crm/components/templates/tickets"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"

export const metadata = {
  ...metaObject("Ticket List"),
}

const pageHeader = {
  title: "text-ticket-list",
  breadcrumb: [
    {
      href: routes.crm.tickets,
      name: "text-tickets",
    },
    {
      name: "text-list",
    },
  ],
}

export default function ticketPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.createTicket}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <div className="@container">
        <TicketListTemplate />
      </div>
    </>
  )
}
