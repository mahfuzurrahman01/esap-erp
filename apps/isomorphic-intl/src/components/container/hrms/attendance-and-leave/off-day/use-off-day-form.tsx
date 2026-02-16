import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateOffDay,
  useUpdateOffDay,
} from "@/hooks/hrms/attendance-and-leave/use-off-day"
import { OffDay } from "@/types/hrms/attendance-and-leave/off-day.types"

export const useOffDayForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()
  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const {
    mutate: createOffDay,
    isPending: isCreatingOffDay,
    isSuccess: isCreatedOffDay,
    isError: isCreateOffDayError,
  } = useCreateOffDay()

  const {
    mutate: updateOffDay,
    isPending: isUpdatingOffDay,
    isSuccess: isUpdatedOffDay,
    isError: isUpdateOffDayError,
  } = useUpdateOffDay()

  const onSubmit: SubmitHandler<OffDay> = async (data) => {
    if (isEditForm && id) {
      updateOffDay({ data })
    } else {
      createOffDay(data)
    }
  }

  useEffect(() => {
    if (isCreatedOffDay || isUpdatedOffDay) {
      handleCloseDrawer()
    }
  }, [
    isCreatedOffDay,
    isUpdatedOffDay,
    isCreateOffDayError,
    isUpdateOffDayError,
  ])

  return {
    onSubmit,
    isLoading: isCreatingOffDay || isUpdatingOffDay,
    handleCloseDrawer,
  }
}
