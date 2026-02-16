import {
  RequisitionInput,
  RequisitionItemDtos,
} from "@/modules/scm/types/procurement/requisition/requisition-types"

export const defaultRequisitionValues: RequisitionInput & {
  saveRequisitionItemDtos: RequisitionItemDtos[]
} = {
  supplierId: 0,
  currencyId: 0,
  currencyName: "",
  requestedBy: "",
  requestedDate: new Date().toISOString(),
  expectedDeliveryDate: new Date().toISOString(),
  billingStatus: "pending",
  priority: "",
  fiscalPosition: "",
  saveRequisitionItemDtos: [],
}
