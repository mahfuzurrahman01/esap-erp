import { useEffect, useState } from "react"

import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { Text } from "rizzui"

import { ResumeFormInputType } from "@/validators/hrms/resume.schema"

export const useResumeForm = (defaultData?: ResumeFormInputType) => {
  const [resetValues, setResetValues] = useState(defaultData || {})

  const t = useTranslations("hrms")

  const onSubmit: SubmitHandler<ResumeFormInputType> = () => {
    toast.success(<Text as="b">{t("text-resume-saved")}</Text>)
  }

  const onDelete = () => {
    const resumeId = defaultData?.id
    if (resumeId) {
      toast.success(<Text as="b">{t("text-resume-deleted")}</Text>)
    }
  }

  useEffect(() => {
    if (defaultData) {
      setResetValues(defaultData)
    }
  }, [defaultData])

  return {
    onSubmit,
    onDelete,
    resetValues,
  }
}
