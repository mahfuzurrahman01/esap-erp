"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useUpdatePurchasedOrderApproval } from "@/modules/scm/hooks/procurement/purchased-order/use-purchased-order-approval"
import { PurchasedOrderApproval } from "@/modules/scm/types/procurement/purchased-order/purchased-order-approval-types"

export const usePurchasedOrderApprovalForm = (
  isEditForm?: boolean,
  initialData?: PurchasedOrderApproval
) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: updatePurchasedOrderApproval,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdatePurchasedOrderApproval()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<PurchasedOrderApproval> = async (data) => {
    if (isEditForm && initialData) {
      const updateData = {
        ...data,
        id: Number(initialData.id),
        purchaseOrderId: Number(initialData.purchaseOrderId),
        approvalStatus: data.approvalStatus,
        approvedBy: initialData.approvedBy,
      }

      updatePurchasedOrderApproval({ data: updateData })
    }
  }

  useEffect(() => {
    if (updateSuccess) {
      closeDrawer()
    }
  }, [updateSuccess])

  return {
    onSubmit,
    isLoading: isUpdatePending,
    handleCloseDrawer,
  }
}
