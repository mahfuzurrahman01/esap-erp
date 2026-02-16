import {
  MaterialRequirementsPlanApproval,
  MaterialRequirementsPlanApprovalPaginator,
  MaterialRequirementsPlanApprovalQueryOptions,
} from "@/modules/scm/types/production-control/materials-requirements-planning/material-requirements-plan-approval-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const MaterialRequirementsApprovalPlanService = {
  all: (params?: Partial<MaterialRequirementsPlanApprovalQueryOptions>) => {
    return HttpClient.get<MaterialRequirementsPlanApprovalPaginator>(
      ApiEndpoint.scm.getAllMaterialRequirementPlanApproval,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<MaterialRequirementsPlanApproval>(
      ApiEndpoint.scm.getMaterialRequirementPlanApprovalById(id)
    ),
  create: (input: MaterialRequirementsPlanApproval) =>
    HttpClient.post<MaterialRequirementsPlanApproval>(
      ApiEndpoint.scm.createMaterialRequirementPlanApproval,
      input
    ),
  update: (input: MaterialRequirementsPlanApproval) =>
    HttpClient.put<MaterialRequirementsPlanApproval>(
      ApiEndpoint.scm.updateMaterialRequirementPlanApproval,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(
      ApiEndpoint.scm.deleteMaterialRequirementPlanApproval(id)
    ),
}
