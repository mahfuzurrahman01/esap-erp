import {
  SupplierEvaluation,
  SupplierEvaluationPaginator,
  SupplierEvaluationQueryOptions,
} from "@/modules/scm/types/supplier-relationship/supplier-evaluation/supplier-evaluation-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const SupplierEvaluationService = {
  all: (params?: Partial<SupplierEvaluationQueryOptions>) => {
    return HttpClient.get<SupplierEvaluationPaginator>(
      ApiEndpoint.scm.getAllSupplierEvaluation,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<SupplierEvaluation>(
      ApiEndpoint.scm.getSupplierEvaluationById(id)
    ),
  create: (input: SupplierEvaluation) =>
    HttpClient.post<SupplierEvaluation>(
      ApiEndpoint.scm.createSupplierEvaluation,
      input
    ),
  update: (input: SupplierEvaluation) =>
    HttpClient.put<SupplierEvaluation>(
      ApiEndpoint.scm.updateSupplierEvaluation,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteSupplierEvaluation(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(
      ApiEndpoint.scm.bulkDeleteSupplierEvaluation,
      ids
    )
  },
}
