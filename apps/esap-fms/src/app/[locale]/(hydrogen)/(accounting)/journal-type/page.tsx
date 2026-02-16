import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import JournalTypes from "@/modules/fms/components/templates/journal-type"

export const metadata = {
  ...metaObject("Journal Type List"),
}

const pageHeader = {
  title: "text-journal-type",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-journal-type",
    },
  ],
}

export default function JournalTypePage() {
  return (
    <>
      <JournalTypes pageHeader={pageHeader} />
    </>
  )
}
