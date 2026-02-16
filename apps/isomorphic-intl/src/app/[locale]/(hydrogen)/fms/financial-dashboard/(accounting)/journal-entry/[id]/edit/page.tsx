import { Metadata } from "next"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateJournalEntry from "@/modules/fms/components/templates/journal-entry/create-journal-entry"

export async function generateMetadata(
  props: {
    params: Promise<{ id: string }>
  }
): Promise<Metadata> {
  const params = await props.params;
  const id = params.id

  return metaObject(`Edit ${id}`)
}

const pageHeader = {
  title: "text-edit-journal-entry",
  breadcrumb: [
    {
      href: routes.fms.journalEntry,
      name: "text-journal-entry",
    },
    {
      name: "text-edit",
    },
  ],
}

export default async function JournalEntryEditPage(
  props: {
    params: Promise<{ id: number }>
  }
) {
  const params = await props.params;
  const { id } = params

  return (
    <div className="flex h-full flex-col">
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateJournalEntry id={id} mode="edit" />
    </div>
  )
}
