import { metaObject } from "@/config/site.config"
import RiskEvaluationListPage from "@/modules/scm/components/templates/compliance-and-risk/risk-evaluation/risk-evaluation-list"

export const metadata = {
  ...metaObject("Risk Evaluation"),
}

export default function page() {
  return <RiskEvaluationListPage />
}
