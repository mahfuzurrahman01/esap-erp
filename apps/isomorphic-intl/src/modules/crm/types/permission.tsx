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

export interface Permission {
  id: string
  name: string
  module: string
  createdAt?: string
  createdBy?: string
  group: string
  action: string
}

export interface PermissionList {
  id: any
  name: string
  module: string
  createdAt?: string
  shortOrder?: string
  createdBy?: string
  group: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface QueryOptions {
  language?: string
  page?: number
  limit?: number
}

export interface PermissionQueryOptions extends QueryOptions {
  name?: string
  module?: string
  group?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
}

export interface PasswordResetTypes {
  previousPassword: string
  newPassword: string
  confirmPassword: string
}

export interface PermissionDetailsComponentProps {
  id: string
}

export interface PermissionEditFormTypes {
  name?: string
  module?: string
  group?: string
}

export interface PermissionEditFormProps {
  permissionData: PermissionEditFormTypes
  id: string
}

export interface PermissionCreateFormTypes {
  name: string
  module: string
  group: string
}

export interface PermissionPaginator extends PaginatorInfo<PermissionList> {}
