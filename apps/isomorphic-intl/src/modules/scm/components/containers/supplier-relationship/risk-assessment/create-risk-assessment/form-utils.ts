import { RiskAssessment } from "@/modules/scm/types/supplier-relationship/risk-assessment/risk-assessment-types"

export const defaultRiskAssessment: RiskAssessment = {
  id: 0,
  supplierId: 0,
  supplierName: "",
  riskType: "",
  riskDescription: "",
  mitigationPlan: "",
  riskStatus: "",
}
