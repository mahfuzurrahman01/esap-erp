import { metaObject } from "@/config/site.config"
import RiskAssessmentEditPage from "@/modules/scm/components/templates/supplier-relationship/risk-assessment/risk-assessment-edit"

export const metadata = {
  ...metaObject("Risk Assessment Edit"),
}

export default function page() {
  return (
    <>
      <RiskAssessmentEditPage />
    </>
  )
}
