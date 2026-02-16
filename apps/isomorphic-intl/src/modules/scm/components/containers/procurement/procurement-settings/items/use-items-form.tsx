"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateUnit,
  useUpdateUnit,
} from "@/modules/scm/hooks/procurement/requisition/use-unit"
import { ItemUnit } from "@/modules/scm/types/procurement/requisition/item-unit-types"

export const useItemsForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: createUnit,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateUnit()
  const {
    mutateAsync: updateUnit,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateUnit()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<ItemUnit> = async (data) => {
    if (isEditForm && id) {
      const updateData = {
        ...data,
        id: Number(id),
        status: true,
      }
      updateUnit({ data: updateData })
    } else {
      createUnit({
        ...data,
        description: data.description || "",
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
