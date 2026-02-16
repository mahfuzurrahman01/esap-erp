export interface PaginatorInfo<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: any[]
  next_page_url: string | null
  path: string
  pageSize: number
  prev_page_url: string | null
  to: number
  count: number
  total: number
}

export interface QueryOptions {
  language?: string
  page?: number
  limit?: number
}

export interface ApprovalQueryOptions extends QueryOptions {
  type?: string
  status?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface ApprovalList {
  id?: any
  referenceId?: string
  approvalStatus?: string
  type?: number
  referenceName?: string
  createdBy?: string
  level?: string
  shortOrder?: number
  count: number
  pageIndex: number
  pageSize: number
  search?: string
  action: string
  data: []
}

export interface ApprovalUpdate {
  id: string
  data: []
}

export interface ApprovalCreateFormTypes {
  productId: string
  ApprovalQuantity: number
  warehouseId: string
}

export interface ApprovalEditFormTypes {
  id?: string
  productId?: string
  ApprovalQuantity: number
  warehouseId?: string
}

export interface Approval {
  id: string
  productId: string
  productName?: string
  warehouseName: string
  ApprovalQuantity: number
  action: string
}

export interface ApprovalEditFormProps {
  ApprovalData?: ApprovalEditFormTypes
  id?: string
  productId?: string
  ApprovalQuantity?: number
  warehouse?: string
}

export interface ApprovalEditComponentProps {
  id: string
}

export interface ApprovalDetailsComponentProps {
  id: string
  productId: string
  warehouse: string
}

export interface ApprovalPaginator extends PaginatorInfo<ApprovalList> {}
