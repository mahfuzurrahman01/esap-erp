import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateResumeType,
  useUpdateResumeType,
} from "@/hooks/hrms/employee/use-resume-type"
import { ResumeType } from "@/types/hrms/employee/resume-types.types"

export const useResumeTypesForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()
  const {
    mutateAsync: createResumeType,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateResumeType()
  const {
    mutateAsync: updateResumeType,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateResumeType()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<ResumeType> = (data) => {
    if (isEditForm && id) {
      updateResumeType({ data })
    } else {
      createResumeType(data)
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
