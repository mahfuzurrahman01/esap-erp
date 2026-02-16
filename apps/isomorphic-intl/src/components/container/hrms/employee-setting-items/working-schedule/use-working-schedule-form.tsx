import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateWorkingSchedule,
  useUpdateWorkingSchedule,
} from "@/hooks/hrms/employee/use-work-schedule"
import { WorkingSchedule } from "@/types/hrms/employee/working-schedule.types"
import { WorkingSchedulePostDataType } from "@/validators/hrms/working-schedule.schema"

import { calculateAverageHoursPerDay } from "./working-schedule-form-drawer"

export const useWorkingScheduleForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: updateWorkingSchedule,
    isPending: isUpdatePending,
    isSuccess: createSuccess,
  } = useUpdateWorkingSchedule()
  const {
    mutateAsync: createWorkingSchedule,
    isPending: isCreatePending,
    isSuccess: updateSuccess,
  } = useCreateWorkingSchedule()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<WorkingSchedulePostDataType> = async (data) => {
    if (isEditForm && id) {
      const averageHour = calculateAverageHoursPerDay(data.workingHours)
      data.averageHourPerDay = averageHour
      ;(data as WorkingSchedule).workingHours = JSON.stringify(
        data.workingHours
      )

      await updateWorkingSchedule({ data })
    } else {
      // await createEmployee(data)
      const averageHour = calculateAverageHoursPerDay(data.workingHours)
      data.averageHourPerDay = averageHour
      ;(data as WorkingSchedule).workingHours = JSON.stringify(
        data.workingHours
      )

      await createWorkingSchedule(data)
    }
  }

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      closeDrawer()
    }
  }, [createSuccess, updateSuccess])

  return {
    handleCloseDrawer,
    onSubmit,
    isLoading: isCreatePending || isUpdatePending,
  }
}
