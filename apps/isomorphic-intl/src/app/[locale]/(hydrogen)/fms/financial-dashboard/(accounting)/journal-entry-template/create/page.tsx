import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateJournalEntryTemplate from "@/modules/fms/components/templates/journal-entry-template/create-journal-entry-template"

export const metadata = {
  ...metaObject("Create Journal Entry Template"),
}

const pageHeader = {
  title: "text-create-journal-entry-template",
  breadcrumb: [
    {
      href: routes.fms.journalTemplate,
      name: "text-journal-entry-template",
    },
    {
      name: "text-create-journal-entry-template",
    },
  ],
}

export default function CreateJournalEntryPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateJournalEntryTemplate />
    </>
  )
}
