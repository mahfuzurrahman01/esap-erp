import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateEmployeeType,
  useUpdateEmployeeType,
} from "@/hooks/hrms/employee/use-employee-type"
import { EmployeeType } from "@/types/hrms/employee/employee-types.types"

export const useEmployeeTypeForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: createEmployeeType,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateEmployeeType()
  const {
    mutateAsync: updateEmployeeType,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateEmployeeType()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<EmployeeType> = async (data) => {
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
    onSubmit,
    isLoading: isCreatePending || isUpdatePending,
    handleCloseDrawer,
  }
}
