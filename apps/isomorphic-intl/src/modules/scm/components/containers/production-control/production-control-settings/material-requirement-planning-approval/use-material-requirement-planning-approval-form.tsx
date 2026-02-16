"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useCurrentUser } from "@/hooks/auth/use-auth"
import { useUpdateMaterialRequirementsPlanApproval } from "@/modules/scm/hooks/production-control/material-availibility/use-material-requirements-plan-approval"
import { MaterialRequirementsPlanApproval } from "@/modules/scm/types/production-control/materials-requirements-planning/material-requirements-plan-approval-types"

export const useMaterialRequirementPlanningApprovalForm = (
  isEditForm?: boolean,
  initialData?: MaterialRequirementsPlanApproval
) => {
  const { closeDrawer } = useDrawer()
  const { user } = useCurrentUser()

  const {
    mutateAsync: updateMaterialRequirementPlanningApproval,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateMaterialRequirementsPlanApproval()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<MaterialRequirementsPlanApproval> = async (
    data
  ) => {
    if (isEditForm && initialData?.id) {
      const updateData = {
        ...data,
        id: Number(initialData.id),
        materialRequirementPlanId: Number(
          initialData.materialRequirementPlanId
        ),
        approvalStatus: data.approvalStatus,
        approvedBy: user?.name || "",
      }

      updateMaterialRequirementPlanningApproval({ data: updateData })
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
