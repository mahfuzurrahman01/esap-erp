import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface SupplierContractForm {
  supplierId?: number
  currencyId?: number
  currencyName?: string
  contractName?: string
  contractValue?: number
  startDate?: string
  endDate?: string
  paymentTermsId?: number
  status?: boolean
  contractDocumentFile?: string
}

export interface ContractInput extends SupplierContractForm {
  serviceLevelAgreements: serviceLevelAgreements[]
}

export interface serviceLevelAgreements {
  criteria?: string
  metric?: number
}

export interface Contract {
  id?: number
  supplierId?: number
  supplierName?: string
  currencyId?: number
  currencyName?: string
  contractName?: string
  contractValue?: number
  startDate?: string
  endDate?: string
  paymentTermsId?: number
  paymentTerms?: string
  status?: boolean
  contractDocumentUrl?: string
  serviceLevelAgreements: serviceLevelAgreements[]
}

export interface ContractQueryOptions extends QueryOptions {}

export type ContractPaginator = PaginatedResponse<Contract>
