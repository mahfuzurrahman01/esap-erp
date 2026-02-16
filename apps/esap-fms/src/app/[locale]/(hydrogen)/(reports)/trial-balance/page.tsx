import PageHeader from "@/components/base/page-header"
import { metaObject } from "@/config/site.config"
import TrialBalanceTemplate from "@/modules/fms/components/templates/reports/trial-balance/trial-balance-template"

export const metadata = {
  ...metaObject("Trial Balance"),
}

const pageHeader = {
  title: "text-trial-balance",
}

export default function TrialBalancePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} />

      <TrialBalanceTemplate />
    </>
  )
}
