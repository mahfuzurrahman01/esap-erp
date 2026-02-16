"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateWarehouseManager,
  useUpdateWarehouseManager,
} from "@/modules/scm/hooks/inventory/warehouse/use-warehouse-manager"
import { WarehouseManager } from "@/modules/scm/types/inventory/warehouse/warehouse-manager-types"

export const useWarehouseManagerForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: createWarehouseManager,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateWarehouseManager()
  const {
    mutateAsync: updateWarehouseManager,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateWarehouseManager()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<WarehouseManager> = async (data) => {
    if (isEditForm && id) {
      const updateData = {
        ...data,
        id: Number(id),
        status: true,
      }
      updateWarehouseManager({ data: updateData })
    } else {
      createWarehouseManager({
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
