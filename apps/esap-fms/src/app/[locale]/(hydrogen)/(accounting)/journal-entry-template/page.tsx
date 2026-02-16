import { PiPlusBold } from "react-icons/pi"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import JournalEntryTemplateTable from "@/modules/fms/components/containers/journal-entry-template"

export const metadata = {
  ...metaObject("Journal Entry Template"),
}

const pageHeader = {
  title: "text-journal-entry-template",
  breadcrumb: [
    {
      href: routes.fms.dashboard,
      name: "text-home",
    },
    {
      name: "text-journal-entry-template",
    },
  ],
}

export default function JournalEntryTemplatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.createJournalTemplate}
            title="text-create"
            icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
          />
        </div>
      </PageHeader>

      <JournalEntryTemplateTable />
    </>
  )
}
