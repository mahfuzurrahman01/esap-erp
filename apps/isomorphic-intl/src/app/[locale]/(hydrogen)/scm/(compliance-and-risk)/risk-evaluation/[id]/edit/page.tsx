import { metaObject } from "@/config/site.config"
import RiskEvaluationEditPage from "@/modules/scm/components/templates/compliance-and-risk/risk-evaluation/risk-evaluation-edit"

export const metadata = {
  ...metaObject("Edit Risk Evaluation"),
}

export default function page() {
  return <RiskEvaluationEditPage />
}
