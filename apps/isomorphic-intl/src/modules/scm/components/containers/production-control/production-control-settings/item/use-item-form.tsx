"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateItem,
  useUpdateItem,
} from "@/modules/scm/hooks/production-control/bill-of-materials/use-items"
import { Item } from "@/modules/scm/types/production-control/bill-of-materials/items-types"

export const useItemForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: createItem,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateItem()
  const {
    mutateAsync: updateItem,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateItem()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<Item> = async (data) => {
    if (isEditForm && id) {
      const updateData = {
        ...data,
        id: Number(id),
        status: true,
      }
      updateItem({ data: updateData })
    } else {
      createItem({
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
