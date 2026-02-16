import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateEmploymentType,
  useUpdateEmploymentType,
} from "@/hooks/hrms/employee/use-employment-type"
import { EmploymentType } from "@/types/hrms/employee/employment-types.types"

export const useEmploymentTypesForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()
  const {
    mutateAsync: createEmployeeType,
    isPending: isCreatePending,
    isSuccess: createSuccess,
    error: createError,
  } = useCreateEmploymentType()
  const {
    mutateAsync: updateEmployeeType,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
    error: updateError,
  } = useUpdateEmploymentType()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<EmploymentType> = async (data) => {
    if (isEditForm && id) {
      updateEmployeeType({ data })
    } else {
      createEmployeeType(data)
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
    createError,
    updateError,
  }
}
