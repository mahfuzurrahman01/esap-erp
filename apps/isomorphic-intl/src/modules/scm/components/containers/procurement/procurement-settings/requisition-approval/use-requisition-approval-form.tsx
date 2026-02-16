"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useUpdateRequisitionApproval } from "@/modules/scm/hooks/procurement/requisition/use-requisition-approval"
import { RequisitionApproval } from "@/modules/scm/types/procurement/requisition/requisition-approval-types"

export const useRequisitionApprovalForm = (
  isEditForm?: boolean,
  initialData?: RequisitionApproval
) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: updateRequisitionApproval,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateRequisitionApproval()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<RequisitionApproval> = async (data) => {
    if (isEditForm && initialData) {
      const updateData = {
        ...data,
        id: Number(initialData.id),
        approvedBy: initialData.approvedBy,
        requisitionId: Number(initialData.requisitionId),
        approvalStatus: data.approvalStatus,
      }

      updateRequisitionApproval({ data: updateData })
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
