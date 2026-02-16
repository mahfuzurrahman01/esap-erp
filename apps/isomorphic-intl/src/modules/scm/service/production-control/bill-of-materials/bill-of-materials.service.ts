import {
  BillOfMaterials,
  BillOfMaterialsPaginator,
  BillOfMaterialsQueryOptions,
} from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-type"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const BillOfMaterialsService = {
  all: (params?: Partial<BillOfMaterialsQueryOptions>) => {
    return HttpClient.get<BillOfMaterialsPaginator>(
      ApiEndpoint.scm.getAllBillOfMaterials,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<BillOfMaterials>(ApiEndpoint.scm.getBillOfMaterialsById(id)),
  create: (input: BillOfMaterials) =>
    HttpClient.post<BillOfMaterials>(
      ApiEndpoint.scm.createBillOfMaterials,
      input
    ),
  update: (input: BillOfMaterials) =>
    HttpClient.put<BillOfMaterials>(
      ApiEndpoint.scm.updateBillOfMaterials,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteBillOfMaterials(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteBillOfMaterials, ids)
  },
}
