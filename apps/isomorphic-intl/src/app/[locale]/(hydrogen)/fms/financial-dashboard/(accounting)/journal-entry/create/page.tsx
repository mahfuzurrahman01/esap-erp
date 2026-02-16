import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateJournalEntry from "@/modules/fms/components/templates/journal-entry/create-journal-entry"

export const metadata = {
  ...metaObject("Create Journal Entry"),
}

const pageHeader = {
  title: "text-create-journal-entry",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      href: routes.fms.journalEntry,
      name: "text-journal-entry",
    },
    {
      name: "text-create-journal-entry",
    },
  ],
}

export default function CreateJournalEntryPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateJournalEntry />
    </>
  )
}
