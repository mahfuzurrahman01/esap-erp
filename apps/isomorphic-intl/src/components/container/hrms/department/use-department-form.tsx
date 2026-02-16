"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateDepartment,
  useUpdateDepartment,
} from "@/hooks/hrms/employee/use-department"
import { Department } from "@/types/hrms/employee/department.types"

export const useDepartmentForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()
  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const {
    mutateAsync: createDepartment,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateDepartment()
  const {
    mutateAsync: updateDepartment,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateDepartment()

  const onSubmit: SubmitHandler<Department> = async (data) => {
    if (isEditForm && id) {
      data = { ...data, id: Number(id) }
      updateDepartment({ data })
    } else {
      createDepartment(data)
    }
  }

  useEffect(() => {
    if (createSuccess || updateSuccess) {
      handleCloseDrawer()
    }
  }, [createSuccess, updateSuccess])

  return {
    onSubmit,
    isLoading: isCreatePending || isUpdatePending,
    handleCloseDrawer,
  }
}
