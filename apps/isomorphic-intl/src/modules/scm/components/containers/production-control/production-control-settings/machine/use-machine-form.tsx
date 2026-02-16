"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateMachine,
  useUpdateMachine,
} from "@/modules/scm/hooks/production-control/work-order-tracking/use-machine"
import { Machine } from "@/modules/scm/types/production-control/work-order-tracking/machine-types"

export const useMachineForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: createMachine,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateMachine()
  const {
    mutateAsync: updateMachine,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateMachine()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<Machine> = async (data) => {
    if (isEditForm && id) {
      const updateData = {
        ...data,
        id: Number(id),
      }
      updateMachine({ data: updateData })
    } else {
      createMachine({
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
