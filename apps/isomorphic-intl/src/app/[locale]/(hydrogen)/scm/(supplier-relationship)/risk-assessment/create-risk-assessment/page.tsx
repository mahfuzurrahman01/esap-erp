import { metaObject } from "@/config/site.config"
import RiskAssessmentCreatePage from "@/modules/scm/components/templates/supplier-relationship/risk-assessment/create-risk-assessment"

export const metadata = {
  ...metaObject("Risk Assessment Create"),
}

export default function page() {
  return (
    <>
      <RiskAssessmentCreatePage />
    </>
  )
}
