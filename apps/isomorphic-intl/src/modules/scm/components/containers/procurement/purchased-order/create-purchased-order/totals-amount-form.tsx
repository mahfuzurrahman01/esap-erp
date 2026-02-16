"use client"

import { useEffect } from "react"

import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import {
  Control,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"

import { Input } from "@/components/ui"
import {
  calculatedGrandTotalAtom,
  calculatedNetTotalAtom,
} from "@/modules/scm/store/purchase-order"
import {
  PurchasedOrderInput,
  PurchasedOrderUpdate,
} from "@/modules/scm/types/procurement/purchased-order/purchased-order-types"
import { totalTaxAmountAtom } from "@/modules/scm/store/global-store-state"

interface TotalsAmountFormProps {
  isFieldDisabled?: boolean
  formMethods: {
    register?: UseFormRegister<PurchasedOrderInput | PurchasedOrderUpdate>
    control?: Control<PurchasedOrderInput | PurchasedOrderUpdate>
    formState: FormState<PurchasedOrderInput>
    watch?: UseFormWatch<PurchasedOrderInput | PurchasedOrderUpdate>
    setValue?: UseFormSetValue<PurchasedOrderInput | PurchasedOrderUpdate>
  }
  handleDiscountChange?: (value: number) => void
  // calculations?: {
  //   grandTotal: number
  //   netTotal: number
  // }
}

export default function TotalsAmountForm({
  isFieldDisabled,
  formMethods,
}: TotalsAmountFormProps) {
  const t = useTranslations("form")

  const {
    register,
    formState: { errors },
    setValue,
  } = formMethods

  const [calculatedGrandTotal] = useAtom(calculatedGrandTotalAtom)
  const [calculatedNetTotal] = useAtom(calculatedNetTotalAtom)

  // Update form values only when the actual values change
  useEffect(() => {
    if (setValue && !isFieldDisabled) {
      setValue("grandTotal", calculatedGrandTotal, { shouldValidate: true })
      setValue("netTotalAmount", calculatedNetTotal, { shouldValidate: true })
    }
  }, [calculatedGrandTotal, calculatedNetTotal, setValue, isFieldDisabled])

  return (
    <div className="flex w-full flex-col items-end justify-end gap-2">
      {" "}
      <Input
        label={t("form-grand-total")}
        className="w-1/2"
        {...register?.("grandTotal")}
        placeholder={t("form-enter-grand-total")}
        error={errors.grandTotal?.message ? t(errors.grandTotal?.message) : ""}
        disabled={isFieldDisabled || true}
        isRequired
      />
      <Input
        label={t("form-net-total-amount")}
        className="w-1/2"
        {...register?.("netTotalAmount")}
        placeholder={t("form-enter-net-total-amount")}
        // value={netTotal}
        // defaultValue={calculations?.netTotal}
        disabled={isFieldDisabled || true}
        error={
          errors.netTotalAmount?.message
            ? t(errors.netTotalAmount?.message)
            : ""
        }
        isRequired
      />
    </div>
  )
}
