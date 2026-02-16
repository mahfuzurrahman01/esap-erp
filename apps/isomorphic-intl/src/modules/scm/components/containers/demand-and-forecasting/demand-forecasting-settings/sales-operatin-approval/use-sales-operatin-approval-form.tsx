"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useUpdateSalesOperationApproval } from "@/modules/scm/hooks/demand-and-forecasting/sales-operation-plan/use-sales-operation-approval"
import { SalesOperationApproval } from "@/modules/scm/types/demand-and-forecasting/sales-operation-plan/sales-operation-approval-types"

export const useSalesOperationApprovalForm = (
  isEditForm?: boolean,
  initialData?: SalesOperationApproval
) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: updateSalesOperationApproval,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateSalesOperationApproval()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<SalesOperationApproval> = async (data) => {
    if (isEditForm && initialData?.id) {
      const updateData = {
        ...data,
        id: Number(initialData?.id),
        approvedBy: initialData.approvedBy,
        forecastReviewId: Number(initialData?.forecastReviewId),
        approvalStatus: data.approvalStatus,
      }

      updateSalesOperationApproval({ data: updateData })
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
