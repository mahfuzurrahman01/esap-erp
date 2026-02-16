"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateWorkCenter,
  useUpdateWorkCenter,
} from "@/modules/scm/hooks/production-control/work-order-tracking/use-work-center"
import { WorkCenter } from "@/modules/scm/types/production-control/work-order-tracking/work-center-types"

export const useWorkCenterForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: createWorkCenter,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateWorkCenter()
  const {
    mutateAsync: updateWorkCenter,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateWorkCenter()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<WorkCenter> = async (data) => {
    if (isEditForm && id) {
      const updateData = {
        ...data,
        id: Number(id),
        status: true,
      }
      updateWorkCenter({ data: updateData })
    } else {
      createWorkCenter({
        ...data,
      })
    }
  }

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      closeDrawer()
    }
  }, [createSuccess, updateSuccess])

  return {
    onSubmit,
    isLoading: isCreatePending || isUpdatePending,
    handleCloseDrawer,
  }
}
