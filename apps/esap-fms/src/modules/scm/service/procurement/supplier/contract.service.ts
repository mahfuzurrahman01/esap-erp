import {
  Contract,
  ContractInput,
  ContractPaginator,
  ContractQueryOptions,
} from "@/modules/scm/types/procurement/supplier/contract-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const ContractService = {
  all: (params: Partial<ContractQueryOptions>) =>
    HttpClient.get<ContractPaginator>(
      ApiEndpoint.scm.getAllSupplierContact,
      params
    ),
  allSupplierContract: (params: Partial<ContractQueryOptions>) =>
    HttpClient.get<ContractPaginator>(
      ApiEndpoint.scm.getAllSupplierContact,
      params
    ),
  get: (id: number) =>
    HttpClient.get<Contract>(ApiEndpoint.scm.getSupplierContactById(id)),
  create: (input: ContractInput) =>
    HttpClient.post<ContractInput>(
      ApiEndpoint.scm.createSupplierContact,
      input,
      true
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteSupplierContact(id)),
}
