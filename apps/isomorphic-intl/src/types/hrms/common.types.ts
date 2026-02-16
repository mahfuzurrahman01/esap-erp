import { Dispatch } from "react"

import { SetStateAction } from "jotai"

export type PaginatedResponse<T> = {
  pageIndex: number
  pageSize: number
  count: number
  data: T[]
}

export type HRMSFetchQueryOptions = {
  language?: string
  search?: string
  pageIndex?: number
  pageSize?: number
  leaveTypeId?: number | string
  managerId?: number | string
  country?: string
  departmentId?: number | string
  jobPostingId?: number | string
  jobPositionId?: number | string
  salaryCategoryId?: number | string
  parentFolderId?: number | string | null
  enabled?: boolean
  employeeId?: number | string
  companyName?: string
  coordinatorId?: number | string
  programId?: number | string
  trainerId?: number | string
  sessionId?: number | string
  participantId?: number | string
  trainingProgramId?: number | string
  approvalStatus?: string
  startDate?: string
  endDate?: string
}

export type SelectOptionType = {
  label: string
  value: number | string
}

export type SelectOptionTypeForEmployee = {
  label: string
  value: number | string
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
export type ResumeFormDefaultProps<T> =
  | {
      isEditForm?: true
      initialData: T & { id?: number }
      setFormVisible: Dispatch<SetStateAction<boolean>>
    }
  | {
      isEditForm?: false
      initialData?: undefined
      setFormVisible: Dispatch<SetStateAction<boolean>>
    }

export type EmployeeShortInfo = {
  id?: number
  firstName: string
  lastName?: string
  avatarUrl?: null | string
}
