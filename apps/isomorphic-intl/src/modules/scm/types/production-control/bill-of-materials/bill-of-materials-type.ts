import { PaginatedResponse, QueryOptions } from "@/modules/scm/types/common.types";



import { BillOfMaterialsVersion } from "./bill-of-materials-version-types";





export interface BillOfMaterialItems {
  id?: number
  billOfMaterialId?: number
  productId?: number
  productName?: string
  itemUnitId?: number
  itemUnitName?: string
  quantity?: number
  unitCost?: number
  totalCost?: number
}

export interface BillOfMaterials {
  createdDate?: string
  updatedDate?: string
  id?: number
  companyId?: number
  companyName?: string
  currencyId?: number
  currencyName?: string
  workCenterId?: number
  workCenterName?: string
  scheduledFrom?: string
  scheduledTo?: string
  materialCost?: number
  approvalStatus?: string
  billOfMaterialItems?: BillOfMaterialItems[]
  billOfMaterialVersions?: BillOfMaterialsVersion[]
}

export interface BillOfMaterialsQueryOptions extends QueryOptions {
  productName?: string
  workCenter?: string
  approvalStatus?: string
}

export type BillOfMaterialsPaginator = PaginatedResponse<BillOfMaterials>