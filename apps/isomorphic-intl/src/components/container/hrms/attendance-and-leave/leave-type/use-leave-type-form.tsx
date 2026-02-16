import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateLeaveType,
  useUpdateLeaveType,
} from "@/hooks/hrms/attendance-and-leave/use-leave-type"
import { LeaveType } from "@/types/hrms/attendance-and-leave/leave-type.types"

export const useLeaveTypeForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()
  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const {
    mutate: createLeaveType,
    isPending: isCreatingLeaveType,
    isSuccess: isCreatedLeaveType,
    isError: isCreateLeaveTypeError,
  } = useCreateLeaveType()

  const {
    mutate: updateLeaveType,
    isPending: isUpdatingLeaveType,
    isSuccess: isUpdatedLeaveType,
    isError: isUpdateLeaveTypeError,
  } = useUpdateLeaveType()

  const onSubmit: SubmitHandler<LeaveType> = async (data) => {
    if (isEditForm && id) {
      updateLeaveType({ data })
    } else {
      createLeaveType(data)
    }
  }

  useEffect(() => {
    if (isCreatedLeaveType || isUpdatedLeaveType) {
      handleCloseDrawer()
    }
  }, [
    isCreatedLeaveType,
    isUpdatedLeaveType,
    isCreateLeaveTypeError,
    isUpdateLeaveTypeError,
  ])

  return {
    onSubmit,
    isLoading: isCreatingLeaveType || isUpdatingLeaveType,
    handleCloseDrawer,
  }
}
