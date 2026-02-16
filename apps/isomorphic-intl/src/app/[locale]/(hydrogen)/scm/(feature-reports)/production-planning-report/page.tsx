import { metaObject } from "@/config/site.config"
import ProductionPlanningReport from "@/modules/scm/components/templates/feature-reports/production-planning"

export const metadata = {
  ...metaObject("Production Planning Report"),
}

export default function ProductionPlanningReportPage() {
  return <ProductionPlanningReport />
}
