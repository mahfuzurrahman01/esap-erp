import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import { metaObject } from "@/config/site.config"
import ImportBankStatement from "@/modules/fms/components/templates/import-bank-statement"

export const metadata = {
  ...metaObject("Import Bank Statement"),
}

const pageHeader = {
  title: "text-import-bank-statement",
  breadcrumb: [
    {
      href: routes.fms.importBankStatement,
      name: "text-import-bank-statement-list",
    },
    {
      name: "text-import-bank-statement",
    },
  ],
}

export default function FMSPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <ImportBankStatement />
    </>
  )
}
