import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import ProfitAndLossTemplate from "@/modules/fms/components/templates/reports/profit-and-loss-template/profit-and-loss-template"

export const metadata = {
  ...metaObject("Profit and Loss Statement"),
}

const pageHeader = {
  title: "text-profit-and-loss-statement",
}

export default function ProfitAndLossPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} />

      <ProfitAndLossTemplate />
    </>
  )
}
