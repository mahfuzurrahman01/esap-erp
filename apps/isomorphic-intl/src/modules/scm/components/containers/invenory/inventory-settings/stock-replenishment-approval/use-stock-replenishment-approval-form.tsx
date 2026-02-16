"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useUpdateStockReplanishmentApproval } from "@/modules/scm/hooks/inventory/stock-replanishment/use-stock-replanishment-approval"
import { StockReplanishmentApproval } from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-approval-types"

export const useStockReplenishmentApprovalForm = (
  isEditForm?: boolean,
  initialData?: StockReplanishmentApproval
) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: updateStockReplenishmentApproval,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateStockReplanishmentApproval()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<StockReplanishmentApproval> = async (data) => {
    if (isEditForm && initialData) {
      const updateData = {
        ...data,
        id: Number(initialData.id),
        approvedBy: initialData.approvedBy,
        stockReplenishmentId: Number(initialData.stockReplenishmentId),
      }

      updateStockReplenishmentApproval({ data: updateData })
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
