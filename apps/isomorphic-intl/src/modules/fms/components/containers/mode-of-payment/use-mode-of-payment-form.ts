import { useState } from "react"

import { SubmitHandler } from "react-hook-form"

import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  useCreateModeOfPayment,
  useModeOfPaymentById,
  useUpdateModeOfPayment,
} from "@/modules/fms/hooks/use-mode-of-payment"
import { ModeOfPaymentDetails } from "@/modules/fms/types"
import { ModeOfPaymentFormInput } from "@/modules/fms/validators/mode-of-payment-schema"

interface UseModeOfPaymentFormProps {
  id?: number
  mode?: "create" | "edit" | "view"
}

export function useModeOfPaymentForm({ id, mode }: UseModeOfPaymentFormProps) {
  const isFieldDisabled = mode === "view"
  const [modeOfPaymentDetails, setModeOfPaymentDetails] = useState<
    ModeOfPaymentDetails[]
  >([])

  const { company, coa } = useSharedDataHooks(["company", "coa"])

  const modeOfPaymentTypeOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Bank", label: "Bank" },
    { value: "General", label: "General" },
    { value: "Phone", label: "Phone" },
  ]

  const { companyOptions, isCompanyLoading } = company
  const { coaOptions, searchCOA, isCOALoading } = coa

  const { data: modeOfPaymentById } = useModeOfPaymentById(Number(id))

  const {
    mutate: createModeOfPayment,
    isPending: isCreateModeOfPaymentPending,
  } = useCreateModeOfPayment()
  const {
    mutate: updateModeOfPayment,
    isPending: isUpdateModeOfPaymentPending,
  } = useUpdateModeOfPayment()

  const handleRowChange = (index: number, field: string, value: any) => {
    const newModeOfPaymentDetails = [...modeOfPaymentDetails]
    newModeOfPaymentDetails[index] = {
      ...newModeOfPaymentDetails[index],
      [field]: value,
    }
    setModeOfPaymentDetails(newModeOfPaymentDetails)
  }

  const handleRowDelete = (index: number) => {
    const newModeOfPaymentDetails = modeOfPaymentDetails.filter(
      (_, i) => i !== index
    )
    const updatedModeOfPaymentDetails = newModeOfPaymentDetails.map(
      (entry, i) => ({
        ...entry,
        sn: i + 1,
      })
    )
    setModeOfPaymentDetails(updatedModeOfPaymentDetails)
  }

  const addNewRow = () => {
    setModeOfPaymentDetails([
      ...modeOfPaymentDetails,
      {
        id: 0,
        modeOfPaymentId: 0,
        companyId: 0,
        chartOfAccountId: 0,
      },
    ])
  }

  const onSubmit: SubmitHandler<ModeOfPaymentFormInput> = (data) => {
    const modeOfPaymentData = {
      modeOfPaymentType: data.modeOfPaymentType,
      modeOfPaymentName: data.modeOfPaymentName,
      isActive: data.isActive ?? true,
      comment: data.comment || "",
      companyId: data.companyId || null,
      chartOfAccountId: data.chartOfAccountId || null,
      company: null,
      chartOfAccount: null,
      id: id ?? undefined,
    }

    if (id) {
      updateModeOfPayment({
        id: Number(id),
        data: modeOfPaymentData,
      })
    } else {
      createModeOfPayment(modeOfPaymentData)
    }
  }

  console.log("modeOfPaymentById", modeOfPaymentById)

  const defaultValues: ModeOfPaymentFormInput = {
    modeOfPaymentName: modeOfPaymentById?.modeOfPaymentName || "",
    isActive: modeOfPaymentById?.isActive ?? true,
    modeOfPaymentType: modeOfPaymentById?.modeOfPaymentType || "",
    comment: modeOfPaymentById?.comment || "",
  }

  return {
    defaultValues,
    modeOfPaymentById,
    isFieldDisabled,
    modeOfPaymentDetails,
    handleRowChange,
    handleRowDelete,
    addNewRow,
    onSubmit,
    isLoading: isCreateModeOfPaymentPending || isUpdateModeOfPaymentPending,
    modeOfPaymentTypeOptions,
    companyOptions,
    isCompanyLoading,
    chartOfAccountOptions: coaOptions,
    isCOALoading,
    searchCOA,
  }
}
