import { metaObject } from "@/config/site.config"
import RiskAssessmentListPage from "@/modules/scm/components/templates/supplier-relationship/risk-assessment/risk-assessment-list"

export const metadata = {
  ...metaObject("Risk Assessment"),
}

export default function page() {
  return (
    <>
      <RiskAssessmentListPage />
    </>
  )
}
