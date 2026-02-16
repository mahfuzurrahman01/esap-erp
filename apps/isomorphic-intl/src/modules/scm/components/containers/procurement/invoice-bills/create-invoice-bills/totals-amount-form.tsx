"use client";

import { useEffect } from "react";



import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { Control, FormState, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";



import { Input } from "@/components/ui";
import { allocatedAmount, netTotalAmountAtom, writeOffAmountAtom } from "@/modules/scm/store/global-store-state";
import { InvoiceInput, InvoiceUpdate } from "@/modules/scm/types/procurement/invoice/invoice-types";
import { AdvancedAmountUtils } from "@/modules/scm/utils/advenced-amount";





interface TotalsAmountFormProps {
  isFieldDisabled?: boolean
  formMethods: {
    register?: UseFormRegister<InvoiceInput | InvoiceUpdate>
    control?: Control<InvoiceInput | InvoiceUpdate>
    formState: FormState<InvoiceInput>
    watch?: UseFormWatch<InvoiceInput | InvoiceUpdate>
    setValue?: UseFormSetValue<InvoiceInput | InvoiceUpdate>
  }
  handleDiscountChange?: (value: number) => void
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
    watch,
  } = formMethods
  const { calculateOutstandingAmount } = AdvancedAmountUtils()

  const [selectedAllocatedAmount] = useAtom(allocatedAmount)
  const [netTotalAmount] = useAtom(netTotalAmountAtom)
  const [writeOffAmount] = useAtom(writeOffAmountAtom)

  // Update form values when calculations change
  useEffect(() => {
    if (!isFieldDisabled) {
      setValue?.(
        "outstandingAmount",
        parseFloat(
          calculateOutstandingAmount(
            netTotalAmount,
            selectedAllocatedAmount,
            writeOffAmount
          ).toFixed(2)
        )
      )
      setValue?.("totalAdvance", selectedAllocatedAmount)
    }
  }, [setValue, isFieldDisabled])

  return (
    <div className="flex w-full flex-col items-end justify-end gap-2">
      {" "}
      <Input
        label={t("form-grand-total")}
        type="number"
        className="w-1/2"
        {...register?.("grandTotal", { valueAsNumber: true })}
        placeholder={t("form-enter-grand-total")}
        // value={calculatedGrandTotal}
        error={errors?.grandTotal?.message ? t(errors.grandTotal?.message) : ""}
        disabled={isFieldDisabled || true}
        isRequired
      />
      <Input
        label={t("form-net-total-amount")}
        type="number"
        className="w-1/2"
        {...register?.("netTotalAmount", { valueAsNumber: true })}
        placeholder={t("form-enter-net-total-amount")}
        // value={displayNetTotalAmount}
        disabled={isFieldDisabled || true}
        error={
          errors?.netTotalAmount?.message
            ? t(errors.netTotalAmount?.message)
            : ""
        }
        isRequired
      />
      <Input
        label={t("form-advanced-paid")}
        className="w-1/2"
        type="number"
        {...register?.("totalAdvance", { valueAsNumber: true })}
        // value={displayTotalAdvance}
        disabled={isFieldDisabled || true}
      />
      <Input
        label={t("form-outstanding-amount")}
        className="w-1/2"
        type="number"
        {...register?.("outstandingAmount", { valueAsNumber: true })}
        // value={displayOutstandingAmount}
        disabled={isFieldDisabled || true}
      />
    </div>
  )
}