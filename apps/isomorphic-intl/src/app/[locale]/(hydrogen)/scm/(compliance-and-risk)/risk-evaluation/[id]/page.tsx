import { metaObject } from "@/config/site.config"
import RiskEvaluationDetailsPage from "@/modules/scm/components/templates/compliance-and-risk/risk-evaluation/risk-evaluation-view"

export const metadata = {
  ...metaObject("Risk Evaluation Details"),
}

export default function page() {
  return <RiskEvaluationDetailsPage />
}
