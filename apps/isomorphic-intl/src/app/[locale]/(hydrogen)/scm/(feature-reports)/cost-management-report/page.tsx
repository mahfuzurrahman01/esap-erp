import { metaObject } from "@/config/site.config"
import CostManagementReport from "@/modules/scm/components/templates/feature-reports/cost-management-report"

export const metadata = {
  ...metaObject("Cost Management Report"),
}

export default function CostManagementReportPage() {
  return <CostManagementReport />
}
