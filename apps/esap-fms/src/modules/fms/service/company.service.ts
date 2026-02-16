import {
  CompanyList,
  CompanyPaginator,
  CompanyQueryOptions,
} from "@/modules/fms/types"
import { ApiEndpoint as ApiRoutes } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const CompanyService = {
  all: (params: Partial<CompanyQueryOptions>) => {
    return HttpClient.get<CompanyPaginator>(
      ApiRoutes.fms.company,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<CompanyList>(
      ApiRoutes.fms.companyById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: CompanyList) => {
    return HttpClient.post<CompanyList>(
      ApiRoutes.fms.createCompany,
      input,
      true,
      ApiBase.FMS
    )
  },
  update: (input: CompanyList) => {
    return HttpClient.put<CompanyList>(
      ApiRoutes.fms.updateCompany,
      input,
      true,
      ApiBase.FMS
    )
  },
  delete: (id: number) =>
    HttpClient.delete<CompanyList>(
      ApiRoutes.fms.deleteCompany(id),
      ApiBase.FMS
    ),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<CompanyList>(
      ApiRoutes.fms.bulkCompany,
      ids,
      ApiBase.FMS
    ),
}
