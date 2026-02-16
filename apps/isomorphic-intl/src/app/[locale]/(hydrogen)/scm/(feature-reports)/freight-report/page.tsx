import { metaObject } from "@/config/site.config"
import FreightReport from "@/modules/scm/components/templates/feature-reports/freight-report"

export const metadata = {
  ...metaObject("Freight Report"),
}

export default function FreightReportPage() {
  return <FreightReport />
}
