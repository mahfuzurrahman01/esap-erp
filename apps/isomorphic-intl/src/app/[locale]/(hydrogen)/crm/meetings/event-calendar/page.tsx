import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import EventCalendarTemplate from "@/modules/crm/components/templates/meetings/event-calendar"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import { PiPlusBold } from "react-icons/pi"

export const metadata = {
  ...metaObject("Event Calendar"),
}

const pageHeader = {
  title: "text-event-calendar",
  breadcrumb: [
    {
      name: "text-communication",
    },
    {
      href: routes.crm.meetings,
      name: "text-meetings",
    },
    {
      name: "text-event-calendar",
    },
  ],
}

export default function EventCalendarPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.crm.createMeeting}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>
      <EventCalendarTemplate />
    </>
  )
}
