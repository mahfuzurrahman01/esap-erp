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
}

export interface QueryOptions {
  language?: string
  page?: number
  limit?: number
}

export interface SettingQueryOptions extends QueryOptions {
  product?: string
  warehouse?: string
  quantity?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface SettingList {
  id: any
  productId: string
  productName?: string
  warehouseName: string
  SettingQuantity: number
  shortOrder?: number
  count: number
  pageIndex: number
  pageSize: number
  search?: string
  action: string
  data: []
}

export interface SettingUpdate {
  id: string
  data: []
}

export interface SettingCreateFormTypes {
  productId: string
  SettingQuantity: number
  warehouseId: string
}

export interface SettingEditFormTypes {
  id?: string
  appCompanyName?: string
  defaultEmail?: string
  mobile?: string
  currency?: number
  street?: string
  house?: string
  zip?: string
  city?: string
  state?: string
  defaultInvoiceTerms?: string
}

export interface EmailSettingEditFormTypes {
  id?: string;
  protocol?: number;
  encryption?: string;
  email?: string;
  charset?: string;
  smtpHost?: string;
  smtpPort?: number;
  smtpUsername?: string;
  smtpPassword?: string;
  signature?: string;
}

export interface SettingData {
  id?: string
  appCompanyName?: string
  defaultEmail?: string
  mobile?: string
  currency?: number
  street?: string
  house?: string
  zip?: string
  city?: string
  state?: string
  defaultInvoiceTerms?: string
}

export interface SettingEditFormProps {
  SettingData?: SettingEditFormTypes
  id?: string
  productId?: string
  SettingQuantity?: number
  warehouse?: string
}

export interface SettingEditComponentProps {
  id: string
}

export interface SettingDetailsComponentProps {
  id: string
  productId: string
  SettingQuantity: number
  warehouse: string
}

export interface SettingPaginator extends PaginatorInfo<SettingList> {}
