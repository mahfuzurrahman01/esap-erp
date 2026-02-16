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
  total: number
}

export interface Role {
  id: number
  roleName: string
  createdAt: string
  createdBy: string
  permissions: string
  permissionIds?: string
  action?: string
}

export interface RoleList {
  id: any
  roleName: string
  permissions: string
  shortOrder?: string
  createdBy: string
  count: number
  pageSize: string
  action: string
  data: any
}

export interface RoleListEdit {
  id: string
  name: string
  module: string
  group: string
  count: number
  pageSize: string
  action: string
}

export interface QueryOptions {
  page?: number
  limit?: number
}

export interface RoleQueryOptions extends QueryOptions {
  name?: string
  permission?: string
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

export interface RoleDetailsComponentProps {
  id: string
}

export interface RoleEditFormTypes {
  roleName: string
  module?: string
  group?: string
  permissionIds?: any
}

export interface RoleEditFormProps {
  roleName: string
  permissionIds: any[]
}

// types/crm/users/role.ts

export interface RolePaginator extends PaginatorInfo<RoleList> {
  data: RoleList[] // Array of roles
  current_page: number
  last_page: number
  pageSize: number
  count: number
}
