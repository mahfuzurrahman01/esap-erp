import {
  BillOfMaterialsApproval,
  BillOfMaterialsApprovalPaginator,
  BillOfMaterialsApprovalQueryOptions,
} from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-approval-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const BillOfMaterialsApprovalService = {
  all: (params?: Partial<BillOfMaterialsApprovalQueryOptions>) => {
    return HttpClient.get<BillOfMaterialsApprovalPaginator>(
      ApiEndpoint.scm.getAllBillOfMaterialsApproval,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<BillOfMaterialsApproval>(
      ApiEndpoint.scm.getBillOfMaterialsApprovalById(id)
    ),
  create: (input: BillOfMaterialsApproval) =>
    HttpClient.post<BillOfMaterialsApproval>(
      ApiEndpoint.scm.createBillOfMaterialsApproval,
      input
    ),
  update: (input: BillOfMaterialsApproval) =>
    HttpClient.put<BillOfMaterialsApproval>(
      ApiEndpoint.scm.updateBillOfMaterialsApproval,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteBillOfMaterialsApproval(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(
      ApiEndpoint.scm.bulkDeleteBillOfMaterialsApproval,
      ids
    )
  },
}
