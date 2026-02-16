import { metaObject } from "@/config/site.config"
import RiskAssessmentViewPage from "@/modules/scm/components/templates/supplier-relationship/risk-assessment/risk-assessment-view"

export const metadata = {
  ...metaObject("Risk Assessment Details"),
}

export default function page() {
  return (
    <>
      <RiskAssessmentViewPage />
    </>
  )
}
