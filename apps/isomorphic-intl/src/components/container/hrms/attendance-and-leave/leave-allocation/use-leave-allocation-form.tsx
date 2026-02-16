import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateLeaveAllocation,
  useUpdateLeaveAllocation,
} from "@/hooks/hrms/attendance-and-leave/use-leave-allocation"
import { LeaveAllocation } from "@/types/hrms/attendance-and-leave/leave-allocation.types"

export const useLeaveAllocationForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()
  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const {
    mutate: createLeaveAllocation,
    isPending: isCreatingLeaveAllocation,
    isSuccess: isCreatedLeaveAllocation,
    isError: isCreateLeaveAllocationError,
  } = useCreateLeaveAllocation()

  const {
    mutate: updateLeaveAllocation,
    isPending: isUpdatingLeaveAllocation,
    isSuccess: isUpdatedLeaveAllocation,
    isError: isUpdateLeaveAllocationError,
  } = useUpdateLeaveAllocation()

  const onSubmit: SubmitHandler<LeaveAllocation> = async (data) => {
    if (isEditForm && id) {
      updateLeaveAllocation({ data })
    } else {
      createLeaveAllocation(data)
    }
  }

  useEffect(() => {
    if (isCreatedLeaveAllocation || isUpdatedLeaveAllocation) {
      handleCloseDrawer()
    }
  }, [
    isCreatedLeaveAllocation,
    isUpdatedLeaveAllocation,
    isCreateLeaveAllocationError,
    isUpdateLeaveAllocationError,
  ])

  return {
    onSubmit,
    isLoading: isCreatingLeaveAllocation || isUpdatingLeaveAllocation,
    handleCloseDrawer,
  }
}
