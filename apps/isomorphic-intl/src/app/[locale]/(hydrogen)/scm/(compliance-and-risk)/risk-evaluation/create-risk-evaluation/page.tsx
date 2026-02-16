import { metaObject } from "@/config/site.config"
import RiskEvaluationCreatePage from "@/modules/scm/components/templates/compliance-and-risk/risk-evaluation/create-risk-evaluation"

export const metadata = {
  ...metaObject("Create Risk Evaluation"),
}

export default function page() {
  return <RiskEvaluationCreatePage />
}
