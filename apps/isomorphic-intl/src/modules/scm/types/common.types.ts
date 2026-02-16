export interface PaginatedResponse<T> {
  pageIndex: number
  pageSize: number
  count: number
  data: T[]
}

export interface QueryOptions {
  orderBy?: string
  sortedBy?: string
  language?: string
  search?: string
  pageIndex?: number
  pageSize?: number
}

export type FormDefaultProps<T> =
  | {
      isEditForm?: true
      initialData: T & { id?: number }
    }
  | {
      isEditForm?: false
      initialData?: undefined
    }

export interface SelectOptionType {
  label: string
  value: number | string
}
