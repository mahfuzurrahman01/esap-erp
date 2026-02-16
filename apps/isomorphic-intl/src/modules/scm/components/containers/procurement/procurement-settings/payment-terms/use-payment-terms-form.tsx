"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreatePaymentTerms,
  useUpdatePaymentTerms,
} from "@/modules/scm/hooks/procurement/supplier/use-payment-terms"
import { PaymentTerms } from "@/modules/scm/types/procurement/supplier/payment-terms-types"

export const usePaymentTermsForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: createPaymentTerm,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreatePaymentTerms()
  const {
    mutateAsync: updatePaymentTerm,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdatePaymentTerms()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<PaymentTerms> = async (data) => {
    if (isEditForm && id) {
      const updateData = {
        ...data,
        id: Number(id),
        status: true,
      }
      updatePaymentTerm({ data: updateData })
    } else {
      createPaymentTerm({
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
