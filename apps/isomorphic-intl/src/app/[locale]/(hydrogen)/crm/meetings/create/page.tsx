import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import MeetingCreateTemplate from "@/modules/crm/components/templates/meetings/create"

export const metadata = {
  ...metaObject("Meeting Create"),
}

const pageHeader = {
  title: "text-create-meeting",
  breadcrumb: [
    {
      name: "text-meeting",
    },
    {
      href: routes.crm.meetings,
      name: "text-meeting-list",
    },
    {
      name: "text-create-meeting",
    },
  ],
}

export default function MeetingCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <MeetingCreateTemplate />
    </>
  )
}
