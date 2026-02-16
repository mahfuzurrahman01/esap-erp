"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateProductCategory,
  useUpdateProductCategory,
} from "@/modules/scm/hooks/inventory/product/use-product-category"
import { ProductCategory } from "@/modules/scm/types/inventory/products/product-category-types"

export const useProductCategoryForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: createProductCategory,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateProductCategory()
  const {
    mutateAsync: updateProductCategory,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateProductCategory()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<ProductCategory> = async (data) => {
    if (isEditForm && id) {
      const updateData = {
        ...data,
        id: Number(id),
        status: true,
      }
      updateProductCategory({ data: updateData })
    } else {
      createProductCategory({
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
