import { Metadata } from "next"

import PageHeader from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateJournalEntry from "@/modules/fms/components/templates/journal-entry/create-journal-entry"

export async function generateMetadata(
  props: {
    params: Promise<{ id: string }>
  }
): Promise<Metadata> {
  const params = await props.params;
  const id = params.id

  return metaObject(`View ${id}`)
}

const pageHeader = {
  title: "text-view-journal-entry",
  breadcrumb: [
    {
      href: routes.fms.journalEntry,
      name: "text-journal-entry",
    },
    {
      name: "text-view",
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.editJournalEntry(params.id)}
            title="text-edit"
            icon={<PencilIcon className="me-1.5 h-4 w-4" />}
          />
        </div>
      </PageHeader>
      <CreateJournalEntry id={id} mode="view" />
    </div>
  )
}
