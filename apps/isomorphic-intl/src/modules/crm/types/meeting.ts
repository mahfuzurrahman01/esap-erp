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

export interface MeetingQueryOptions extends QueryOptions {
  title?: string
  meetingDate?: string
  relatedTo?: string
  location?: string
  service?: string
  source?: string
  type?: string
  status?: string
  orderBy?: string
  sortedBy?: string
  pageIndex?: number
  pageSize?: number
  search?: string
  searchTerm?: string | null
}

export interface MeetingList {
  id: any
  title?: string
  meetingDate?: string
  repeatDate?: string
  repeatTime?: string
  meetingTime?: string
  relatedTo?: string
  description?: string
  participant?: string
  createdBy?: string
  participateType?: string
  location?: string
  shortOrder?: string
  repeat?: boolean
  reminder?: boolean
  status: string
  count: number
  pageSize: string
  action: string
  data: []
}

export interface MeetingUpdate {
  id: string
  data: []
}

export interface MeetingCreateFormTypes {
  name: string
  parent_id: string
}

export interface MeetingEditFormTypes {
  id: string
  name?: string
  description?: string
  code?: string
  actualPrice?: number
  salePrice?: number
  category?: string
  unit?: string
  attributes?: any
  brand?: string
  thumbnail?: FileList
}

export interface MeetingEditFormProps {
  id: string
  MeetingData: MeetingEditFormTypes
}

export interface MeetingEditComponentProps {
  id: string
}

export interface MeetingDetailsComponentProps {
  id: string
  name: string
}

export interface MeetingCreationFormTypes {
  title?: string
  meetingDate?: string
  repeatDate?: string
  repeatTime?: string
  meetingTime?: string
  relatedTo?: string
  description?: string
  participantIds?: string[]
  participateType?: string
  location?: string
  repeat?: boolean
  reminder?: boolean
  campaignId?: string
  leadId?: string
  opportunityId?: string
  salesOrdersId?: string
  invoiceId?: string
  quotationId?: string
}

export interface MeetingFormProps {
  categoryOptions: any
  unitOptions: any
  attributeOptions: any
  brandOptions: any
}

export interface Meeting {
  id?: string
  title?: string
  meetingDate?: string
  repeatDate?: string
  repeatTime?: string
  meetingTime?: string
  relatedTo?: string
  description?: string
  participant?: string[]
  participateType?: string
  location?: string
  shortOrder?: number
  repeat?: boolean
  reminder?: boolean
  action: string
  status: string
  campaignId?: string
  participantIds?: any
  leadId?: string
  opportunityId?: string
  salesOrdersId?: string
  invoiceId?: string
  quotationId?: string
}

export interface CalendarEvent {
  id?: string
  start: Date
  end: Date
  allDay?: boolean
  title: string
  description?: string
  location?: string
}

export interface MeetingEditComponentProps {
  id: string
}

export interface MeetingPaginator extends PaginatorInfo<MeetingList> {}
