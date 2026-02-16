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
  count?: number
}

export interface QueryOptions {
  language?: string
  page?: number
  limit?: number
}

export interface CustomerQueryOptions extends QueryOptions {
  name?: string
  email?: string
  phone?: string
  company?: string
  country?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  searchTerm?: string | null
}

export interface CustomerList {
  id?: any
  firstName?: string
  email?: string
  phone?: string
  company?: string
  country?: string
  shortOrder?: string
  type: string
  description: string
  lead: { title: string }
  primaryContact?: string
  photoPath?: string
  CustomerOwner?: string
  stage: string
  approvalStatus?: string
  status: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface CustomerUpdate {
  id: string
  data: []
}

export interface CustomerCreateFormTypes {
  leadId: string
  customerId: string
  closingDate: string
  amount: number
  probability: number
  type: string
  description: string
  primaryContact?: string
  stage: string
  action?: string
  status: string
}

export interface CustomerEditFormTypes {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  phone?: number
  city?: string
  country?: number
  description?: string
  accountNo?: string
  bankName?: string
  paymentTerms?: string
  company?: string
  photo?: any
  coverPhoto?: any
  action?: string
  status?: string
  currencyId?: number
  chartOfAccountId?: number
  residencePermitNo?: number
}

export interface CustomerEditFormProps {
  id: string
  CustomerData: CustomerEditFormTypes
}

export interface CustomerEditComponentProps {
  id: string
}

export interface CustomerDetailsComponentProps {
  id: string
  name?: string
}

// types.ts
export interface CustomerData {
  id: string
  firstName: string
  lastName: string
  email: string
  accountNo: string
  phone: string
  bankName: string
  photoPath?: string
  currency?: number
  chartOfAccountId?: number
  approvalStatus?: string
  paymentTerms?: string
  residencePermitNo?: number
  house?: string
  zip?: string
  city?: string
  state?: string
  street?: number
  country?: number
  company?: number
  coverPhotoPath?: string
}

export interface CountryData {
  id: number
  countryName: string
}

export interface CustomerCreationFormTypes {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  phone?: number
  street?: string
  house?: string
  zip?: string
  city?: string
  state?: string
  address?: string
  country?: number
  currencyId?: number
  chartOfAccountId?: number
  photo?: string
  accountNo?: string
  bankName?: string
  company?: string
  paymentTerms?: string
  action?: string
  status?: string
  nid?: number
  residencePermitNo?: number
  passport?: string
  drivingLicense?: string
}

export interface CustomerFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface Customer {
  id?: any
  leadId?: string
  firstName?: string
  lastName?: string
  lead: { title: string }
  customerId: string
  profilePicturePath: string
  amount?: number
  probability?: number
  country?: number
  type: string
  description: string
  email?: string
  company?: string
  street?: string
  house?: string
  zip?: string
  city?: string
  state?: string
  photoPath?: any
  coverPhotoPath?: any
  primaryContact?: string
  currencyId?: number
  paymentTerms?: number
  currency?: number
  chartOfAccountId?: number
  stage: string
  action?: string
  status: string
}

export interface CustomerEditComponentProps {
  id: string
}

export interface CustomerPaginator extends PaginatorInfo<CustomerList> {}
