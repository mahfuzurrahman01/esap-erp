import { ContractRenewal } from "@/modules/scm/types/procurement/supplier/contract-renewal-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const ContractRenewalService = {
  get: (id: number) =>
    HttpClient.get<ContractRenewal>(
      ApiEndpoint.scm.getSupplierContractRenewalById(id)
    ),
  create: (input: ContractRenewal) =>
    HttpClient.post<ContractRenewal>(
      ApiEndpoint.scm.createSupplierContractRenewal,
      input
    ),
  update: (input: ContractRenewal) =>
    HttpClient.put<ContractRenewal>(
      ApiEndpoint.scm.updateSupplierContractRenewal,
      input
    ),
  delete: () =>
    HttpClient.delete(ApiEndpoint.scm.deleteSupplierContractRenewal),
}
