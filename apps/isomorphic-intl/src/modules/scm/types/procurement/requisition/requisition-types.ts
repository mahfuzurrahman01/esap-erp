import { PaginatedResponse, QueryOptions } from "@/modules/scm/types/common.types";



import { RequisitionApproval } from "./requisition-approval-types";





export interface RequisitionForm {
  supplierId?: number
  companyId?: number
  companyName?: string
  currencyId?: number
  currencyName?: string
  requestedBy?: string
  requestedDate?: string
  expectedDeliveryDate?: string
  projectName?: string
  billingStatus?: string
  priority?: string
  fiscalPosition?: string
  paymentTermsId?: number
  totalQuantity?: number
  reqAmount?: number
  documentFile?: string
}

export interface RequisitionItemRow {
  id: number
  productId: number
  productCode: string
  productName: string
  itemUnitId: number
  itemUnitName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface AdvancedPaymentsRow {
  id: number
  referenceName: string
  remarks: string
  advanceAmount: number
  allocatedAmount: number
}

export interface RequisitionItemDtos {
  requisitionId: number
  productId?: number
  productName?: string
  itemUnitId?: number
  itemUnitName?: string
  quantity?: number
  unitPrice?: number
  totalPrice?: number
}

export interface RequisitionInput extends RequisitionForm {
  saveRequisitionItemDtos: RequisitionItemDtos[]
}

// export interface RequisitionItemUpdateDto extends RequisitionItemDtos {
//   requisitionId: number
// }

export interface RequisitionUpdate extends RequisitionForm {
  id?: number
  updateRequisitionItemDtos?: RequisitionItemDtos[]
}

export interface Requisition {
  createdDate?: string
  updatedDate?: string
  id?: number
  supplierId?: number
  supplierName?: string
  companyId?: number
  companyName?: string
  currencyId?: number
  currencyName?: string
  requisitionNo?: string
  requestedBy?: string
  requestedDate?: string
  expectedDeliveryDate?: string
  projectName?: string
  billingStatus?: string
  priority?: string
  fiscalPosition?: string
  paymentTermsId?: number
  paymentTerms?: string
  totalQuantity?: number
  reqAmount?: number
  documentFile?: string
  documentUrl?: string
  approvalStatus?: string
  requisitionItemDtos: (RequisitionItemDtos & {
    id?: number
  })[]
  requisitionApproval: RequisitionApproval
}

export interface RequisitionQueryOptions extends QueryOptions {
  requestedBy?: string
  billingStatus?: string
  priority?: string
}

export type RequisitionPaginator = PaginatedResponse<Requisition>