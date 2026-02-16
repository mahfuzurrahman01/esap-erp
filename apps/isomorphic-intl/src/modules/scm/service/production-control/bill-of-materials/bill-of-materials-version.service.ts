import {
  BillOfMaterialsVersion,
  BillOfMaterialsVersionPaginator,
  BillOfMaterialsVersionQueryOptions,
} from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-version-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const BillOfMaterialsVersionService = {
  all: (params?: Partial<BillOfMaterialsVersionQueryOptions>) => {
    return HttpClient.get<BillOfMaterialsVersionPaginator>(
      ApiEndpoint.scm.getAllBillOfMaterialsVersion,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<BillOfMaterialsVersion>(
      ApiEndpoint.scm.getBillOfMaterialsVersionById(id)
    ),
  create: (input: BillOfMaterialsVersion) =>
    HttpClient.post<BillOfMaterialsVersion>(
      ApiEndpoint.scm.createBillOfMaterialsVersion,
      input
    ),
  update: (input: BillOfMaterialsVersion) =>
    HttpClient.put<BillOfMaterialsVersion>(
      ApiEndpoint.scm.updateBillOfMaterialsVersion,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteBillOfMaterialsVersion(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(
      ApiEndpoint.scm.bulkDeleteBillOfMaterialsVersion,
      ids
    )
  },
}
