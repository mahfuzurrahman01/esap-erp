import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import BalanceSheetTemplate from "@/modules/fms/components/templates/reports/balance-sheet-template/balance-sheet-template"

export const metadata = {
  ...metaObject("Balance Sheet"),
}

const pageHeader = {
  title: "text-balance-sheet",
}

export default function BalanceSheetPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} />

      <BalanceSheetTemplate />
    </>
  )
}
