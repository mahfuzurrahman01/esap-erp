import { useEffect, useState } from "react"

import { SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"

import { PrivateInformationFormInputType } from "@/validators/hrms/private-information.schema"

export const usePrivateInformationForm = (
  initialData?: PrivateInformationFormInputType
) => {
  const [reset, setReset] = useState(initialData)

  const onSubmit: SubmitHandler<PrivateInformationFormInputType> = (data) => {
    toast.success("Private information successfully updated!")
  }

  useEffect(() => {
    if (initialData) {
      setReset(initialData)
    }
  }, [initialData])

  return { reset, onSubmit }
}
