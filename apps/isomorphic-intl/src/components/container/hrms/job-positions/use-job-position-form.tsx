"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateJobPosition,
  useUpdateJobPosition,
} from "@/hooks/hrms/employee/use-job-positions"
import { JobPosition } from "@/types/hrms/employee/job-positions.types"

export const useJobPositionForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()
  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const {
    mutateAsync: createJobPosition,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateJobPosition()
  const {
    mutateAsync: updateJobPosition,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateJobPosition()

  const onSubmit: SubmitHandler<JobPosition> = async (data) => {
    if (isEditForm && id) {
      data = { ...data, id: Number(id) }
      updateJobPosition({ data })
    } else {
      createJobPosition(data)
    }
  }

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      handleCloseDrawer()
    }
  }, [createSuccess, updateSuccess])

  return {
    onSubmit,
    isLoading: isCreatePending || isUpdatePending,
    handleCloseDrawer,
  }
}
