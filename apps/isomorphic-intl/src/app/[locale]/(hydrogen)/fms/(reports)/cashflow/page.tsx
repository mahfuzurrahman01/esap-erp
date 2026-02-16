import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import CashFlowTemplate from "@/modules/fms/components/templates/reports/cash-flow-template/cash-flow-template"

export const metadata = {
  ...metaObject("Cash Flow Forecasting"),
}

const pageHeader = {
  title: "text-cash-flow-forecasting",
}

export default function CashFlowPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} />

      <CashFlowTemplate />
    </>
  )
}
