"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useUpdateBillOfMaterialsApproval } from "@/modules/scm/hooks/production-control/bill-of-materials/use-bill-of-materials-approval"
import { BillOfMaterialsApproval } from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-approval-types"

export const useBillOfMaterialsApprovalForm = (
  isEditForm?: boolean,
  initialData?: BillOfMaterialsApproval
) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: updateBillOfMaterialsApproval,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateBillOfMaterialsApproval()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<BillOfMaterialsApproval> = async (data) => {
    if (isEditForm && initialData?.id) {
      const updateData = {
        ...data,
        id: Number(initialData.id),
        billOfMaterialsId: Number(initialData.billOfMaterialId),
        approvalStatus: data.approvalStatus,
      }

      updateBillOfMaterialsApproval({ data: updateData })
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
