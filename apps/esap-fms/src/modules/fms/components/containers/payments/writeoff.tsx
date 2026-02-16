"use client"

import { useEffect } from "react"

import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import {
  Control,
  FormState,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"

import { Input } from "@/components/ui"
import {
  formSyncAtom,
  paymentAllocationAtom,
  totalTaxAtom,
} from "@/modules/fms/store/payment-allocation"
import { PaymentFormInput } from "@/modules/fms/validators/payment-schema"

interface PaymentWriteOffProps {
  isFieldDisabled?: boolean
  formMethods: {
    register: UseFormRegister<PaymentFormInput>
    control?: Control<PaymentFormInput>
    formState: FormState<PaymentFormInput>
    setValue: UseFormSetValue<PaymentFormInput>
    watch?: any
  }
}

export default function PaymentWriteOff({ formMethods }: PaymentWriteOffProps) {
  const t = useTranslations("form")
  const [paymentAllocation] = useAtom(paymentAllocationAtom)
  const [totalTax] = useAtom(totalTaxAtom)
  const [, syncForm] = useAtom(formSyncAtom)

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = formMethods

  const totalAllocationAmount = watch?.("totalAllocationAmount")
  const unallocatedAmount = watch?.("unallocatedAmount")
  const differentAmount = watch?.("differentAmount")

  const displayTotalAllocation =
    totalAllocationAmount || paymentAllocation.allocatedAmount
  const displayUnallocated =
    unallocatedAmount || paymentAllocation.unallocatedAmount
  const displayDifferent = differentAmount || totalTax?.toFixed(2) || "0.00"

  useEffect(() => {
    syncForm(setValue)
  }, [paymentAllocation, totalTax, setValue, syncForm])

  return (
    <>
      <Input
        label={t("form-total-allocation-amount")}
        placeholder={t("form-enter-total-allocation-amount")}
        value={displayTotalAllocation}
        {...register("totalAllocationAmount")}
        disabled={true}
        error={errors.totalAllocationAmount?.message}
        readOnly
      />
      <Input
        label={t("form-unallocated-amount")}
        placeholder={t("form-enter-unallocated-amount")}
        value={displayUnallocated}
        {...register("unallocatedAmount")}
        disabled={true}
        error={errors.unallocatedAmount?.message}
        readOnly
      />
      <Input
        label={t("form-different-amount")}
        placeholder={t("form-enter-different-amount")}
        value={displayDifferent}
        {...register("differentAmount")}
        disabled={true}
        error={errors.differentAmount?.message}
        readOnly
      />
    </>
  )
}
