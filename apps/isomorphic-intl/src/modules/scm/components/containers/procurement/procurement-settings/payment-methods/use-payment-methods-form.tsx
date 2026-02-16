"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreatePaymentMethod,
  useUpdatePaymentMethod,
} from "@/modules/scm/hooks/procurement/supplier/use-payment-method"
import { PaymentMethod } from "@/modules/scm/types/procurement/supplier/payment-method-types"

export const usePaymentMethodsForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: createPaymentMethod,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreatePaymentMethod()
  const {
    mutateAsync: updatePaymentMethod,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdatePaymentMethod()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<PaymentMethod> = async (data) => {
    if (isEditForm && id) {
      const updateData = {
        ...data,
        id: Number(id),
        status: true,
      }
      updatePaymentMethod({ data: updateData })
    } else {
      createPaymentMethod({
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
