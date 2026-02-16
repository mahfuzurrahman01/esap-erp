import { metaObject } from "@/config/site.config"
import FinancialDashboard from "@/modules/fms/components/templates/financial-dashboard"
import HrmsDashboardPage from "./hrms/dashboard/page"

export const metadata = {
  ...metaObject("Dashboard"),
}

export default function FileDashboardPage() {
  return <HrmsDashboardPage />
}
