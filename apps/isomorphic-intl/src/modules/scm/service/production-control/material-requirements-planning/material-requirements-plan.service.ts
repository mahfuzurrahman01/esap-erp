import {
  MaterialRequirementsPlanning,
  MaterialRequirementsPlanningPaginator,
  MaterialRequirementsPlanningQueryOptions,
} from "@/modules/scm/types/production-control/materials-requirements-planning/material-requirements-planning-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const MaterialRequirementsPlanService = {
  all: (params?: Partial<MaterialRequirementsPlanningQueryOptions>) => {
    return HttpClient.get<MaterialRequirementsPlanningPaginator>(
      ApiEndpoint.scm.getAllMaterialRequirementPlan,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<MaterialRequirementsPlanning>(
      ApiEndpoint.scm.getMaterialRequirementPlanById(id)
    ),
  create: (input: MaterialRequirementsPlanning) =>
    HttpClient.post<MaterialRequirementsPlanning>(
      ApiEndpoint.scm.createMaterialRequirementPlan,
      input
    ),
  update: (input: MaterialRequirementsPlanning) =>
    HttpClient.put<MaterialRequirementsPlanning>(
      ApiEndpoint.scm.updateMaterialRequirementPlan,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteMaterialRequirementPlan(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(
      ApiEndpoint.scm.bulkDeleteMaterialRequirementPlan,
      ids
    )
  },
}
