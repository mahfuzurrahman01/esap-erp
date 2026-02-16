import { RiskEvaluation } from "@/modules/scm/types/compliance-and-risk/risk-evaluation"

export const defaultRiskEvaluation: Partial<RiskEvaluation> = {
  riskType: "",
  riskImpact: "",
  riskProbability: "",
  residualRisk: "",
  followUpAction: "",
  riskDescription: "",
  mitigationAction: "",
  responsibleParty: "",
  mitigationDeadline: "",
  mitigationStatus: "",
  riskStatus: "",
  comments: "",
}
