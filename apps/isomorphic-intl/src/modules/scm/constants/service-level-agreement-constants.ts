import { Contract, ContractInput, serviceLevelAgreements } from "../types/procurement/supplier/contract-types";





export const DEFAULT_CONTRACT_VALUES: ContractInput = {
  supplierId: 0,
  currencyId: 0,
  currencyName: "",
  contractName: "",
  contractValue: 0,
  startDate: "",
  endDate: "",
  paymentTermsId: 0,
  status: false,
  contractDocumentFile: "",
  serviceLevelAgreements: [],
}

export const DEFAULT_SERVICE_LEVEL_AGREEMENT_ITEM_VALUES: serviceLevelAgreements = {
  criteria: "",
  metric: 0,
}