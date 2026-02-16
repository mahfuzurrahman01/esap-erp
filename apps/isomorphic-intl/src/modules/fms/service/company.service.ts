import {
  CompanyList,
  CompanyPaginator,
  CompanyQueryOptions,
} from "@/modules/fms/types"
import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

export const CompanyService = {
  all: (params: Partial<CompanyQueryOptions>) => {
    return HttpClient.get<CompanyPaginator>(
      ApiEndpoint.fms.company,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<CompanyList>(ApiEndpoint.fms.companyById(id)),
  create: (input: CompanyList) => {
    return HttpClient.post<CompanyList>(
      ApiEndpoint.fms.createCompany,
      input,
      true
    )
  },
  update: (input: CompanyList) => {
    return HttpClient.put<CompanyList>(
      ApiEndpoint.fms.updateCompany,
      input,
      true
    )
  },
  delete: (id: number) =>
    HttpClient.delete<CompanyList>(ApiEndpoint.fms.deleteCompany(id)),

  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<CompanyList>(ApiEndpoint.fms.bulkCompany, ids),
}
