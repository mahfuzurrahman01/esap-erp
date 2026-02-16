"use client"

import { useEffect } from "react"

import { SubmitHandler } from "react-hook-form"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateCarrier,
  useUpdateCarrier,
} from "@/modules/scm/hooks/logistic-and-transport/carrier/use-carrier"
import { Carrier } from "@/modules/scm/types/logistics-and-transport/carriers/carriers-types"

export const useCarriersForm = (isEditForm?: boolean, id?: number) => {
  const { closeDrawer } = useDrawer()

  const {
    mutateAsync: createCarrier,
    isPending: isCreatePending,
    isSuccess: createSuccess,
  } = useCreateCarrier()
  const {
    mutateAsync: updateCarrier,
    isPending: isUpdatePending,
    isSuccess: updateSuccess,
  } = useUpdateCarrier()

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const onSubmit: SubmitHandler<Carrier> = async (data) => {
    if (isEditForm && id) {
      const updateData = {
        ...data,
        id: Number(id),
        status: true,
      }
      updateCarrier({ data: updateData })
    } else {
      createCarrier({
        ...data,
      })
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
