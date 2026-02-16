"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateSupplierCategory,
  useUpdateSupplierCategory,
} from "@/modules/scm/hooks/procurement/supplier/use-supplier-category"
import { SupplierCategory } from "@/modules/scm/types/procurement/supplier/supplier-category-types"

export const useSupplierCategoryForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: createSupplierCategory,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateSupplierCategory()
  const {
    mutateAsync: updateSupplierCategory,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateSupplierCategory()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<SupplierCategory> = async (data) => {
    if (isEditForm && id) {
      const updateData = {
        ...data,
        id: Number(id),
        status: true,
      }
      updateSupplierCategory({ data: updateData })
    } else {
      createSupplierCategory({
        ...data,
        description: data.description || "",
        status: true,
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
