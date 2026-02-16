"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useUpdateReturnProcessApproval } from "@/modules/scm/hooks/logistic-and-transport/return-process/use-return-procss-approval"
import { ReturnProcessApproval } from "@/modules/scm/types/logistics-and-transport/return-process/return-process-approval-types"

export const useReturnProcessApprovalForm = (
  isEditForm?: boolean,
  initialData?: ReturnProcessApproval
) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: updateReturnProcessApproval,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateReturnProcessApproval()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<ReturnProcessApproval> = async (data) => {
    if (isEditForm && initialData?.id) {
      const updateData = {
        ...data,
        id: Number(initialData.id),
        returnRequestId: Number(initialData.returnRequestId),
        approvalStatus: data.approvalStatus,
      }

      updateReturnProcessApproval({ data: updateData })
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
