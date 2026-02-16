import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import GeneralLedgerTemplate from "@/modules/fms/components/templates/reports/general-ledger"

export const metadata = {
  ...metaObject("General Ledger"),
}

const pageHeader = {
  title: "text-general-ledger",
}

export default function GeneralLedgerPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} />

      <GeneralLedgerTemplate />
    </>
  )
}
