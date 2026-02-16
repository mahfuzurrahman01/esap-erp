import { Metadata } from "next"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import CreateJournalEntryTemplate from "@/modules/fms/components/templates/journal-entry-template/create-journal-entry-template"

export async function generateMetadata(
  props: {
    params: Promise<{ id: string }>
  }
): Promise<Metadata> {
  const params = await props.params;
  const id = params.id

  return metaObject(`Edit Template ${id}`)
}

const pageHeader = {
  title: "text-edit-journal-entry-template",
  breadcrumb: [
    {
      href: routes.fms.journalTemplate,
      name: "text-journal-entry-template",
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
      <CreateJournalEntryTemplate id={id} mode="edit" />
    </div>
  )
}
