import { PaginatedResponse, QueryOptions } from "@/modules/scm/types/common.types";





export enum StatusTypeOptions {
  MarkedAsRead = 1,
  Unread = 0,
}

export interface StatusType {
  MarkedAsRead: StatusTypeOptions.MarkedAsRead
  Unread: StatusTypeOptions.Unread
}

export interface Replay {
  supplierCollaborationId?: number
  to?: string
  messageBody?: string
  attachmentFile?: string | File
  imageFile?: string | File
  messageId?: number
  email?: string
  attachmentUrl?: string
  imageUrl?: string
  createdAt?: string
  updatedAt?: string
}

export interface SupplierCollaboration {
  id?: number
  supplierId?: number
  supplierName?: string
  email?: string
  company?: string
  supplierImageUrl?: string
  to?: string
  subject?: string
  messageBody?: string
  attachmentUrl?: string
  imageUrl?: string | File
  markedAsRead?: boolean
  starred?: boolean
  important?: boolean
  attachmentFile?: string | File
  imageFile?: string | File
  category?: string
  hasAttachment?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface SupplierCollaborationQueryOptions extends QueryOptions {
  markedAsRead?: boolean | string
  starred?: boolean | string
  important?: boolean | string
}

export type SupplierCollaborationPaginator =
  PaginatedResponse<SupplierCollaboration>