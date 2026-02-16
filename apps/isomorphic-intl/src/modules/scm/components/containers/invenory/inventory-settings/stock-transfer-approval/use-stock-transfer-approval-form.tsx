"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useUpdateStockTransferApproval } from "@/modules/scm/hooks/inventory/stock-transfer/use-stock-transfer-approval"
import { StockTransferApproval } from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-approval"

export const useStockTransferApprovalForm = (
  isEditForm?: boolean,
  initialData?: StockTransferApproval
) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: updateStockTransferApproval,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateStockTransferApproval()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<StockTransferApproval> = async (data) => {
    if (isEditForm && initialData) {
      const updateData = {
        ...data,
        id: Number(initialData.id),
        approvedBy: initialData.approvedBy,
        stockTransferId: Number(initialData.stockTransferId),
        approvalStatus: data.approvalStatus,
      }

      updateStockTransferApproval({ data: updateData })
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
