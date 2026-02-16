"use client";

import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { Control, Controller, FormState, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";



import { Input, Select } from "@/components/ui";
import { additionalDiscountOn } from "@/modules/scm/constants/shared-status-field-option";
import { discountAmountAtom, discountPercentageAtom } from "@/modules/scm/store/global-store-state";
import { calculatedGrandTotalAtom } from "@/modules/scm/store/purchase-order";
import { InvoiceInput, InvoiceUpdate } from "@/modules/scm/types/procurement/invoice/invoice-types";
import { FindSelectOption, GetMenuListStyles } from "@/modules/scm/utils/select-options";
import { useEffect } from "react";





interface AdditionalDiscountFormProps {
  isFieldDisabled?: boolean
  formMethods: {
    register?: UseFormRegister<InvoiceInput | InvoiceUpdate>
    control?: Control<InvoiceInput | InvoiceUpdate>
    formState: FormState<InvoiceInput>
    watch?: UseFormWatch<InvoiceInput | InvoiceUpdate>
    setValue?: UseFormSetValue<InvoiceInput | InvoiceUpdate>
  }
}

interface SelectOption {
  value: string
  label: string
}

export default function AdditionalDiscountForm({
  isFieldDisabled,
  formMethods,
}: AdditionalDiscountFormProps) {
  const t = useTranslations("form")
  const [, setDiscountAmount] = useAtom(discountAmountAtom)
  const [, setDiscountPercentage] = useAtom(discountPercentageAtom)
 const [calculatedGrandTotal] = useAtom(calculatedGrandTotalAtom)

  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
  } = formMethods

  const applyOn = watch?.("addDiscountApplyOn")
   const discountPercent = watch?.("addDiscountPercent") || 0
   const discountAmount = watch?.("addDiscountAmount") || 0

   // Handle percentage-based discount
  const handlePercentageChange = (value: number) => {
    const numValue = Math.max(0, Math.min(100, Number(value) || 0))
    setDiscountPercentage(numValue)

    if (numValue > 0 && calculatedGrandTotal > 0) {
      const calculatedAmount = Number(
        ((calculatedGrandTotal * numValue) / 100).toFixed(2)
      )
      setValue?.("addDiscountAmount", calculatedAmount, { shouldDirty: false })
      setDiscountAmount(calculatedAmount)
    }
  }

  // Handle amount-based discount
  const handleAmountChange = (value: number) => {
    const numValue = Math.max(0, Math.min(calculatedGrandTotal, Number(value) || 0))
    setDiscountAmount(numValue)

    if (numValue > 0 && calculatedGrandTotal > 0) {
      const calculatedPercentage = Number(
        ((numValue / calculatedGrandTotal) * 100).toFixed(2)
      )
      setValue?.("addDiscountPercent", calculatedPercentage, { shouldDirty: false })
      setDiscountPercentage(calculatedPercentage)
    }
  }

   // Handle apply-on change
  const handleApplyOnChange = (option: any) => {
    const newValue = option?.value as string
    if (newValue !== applyOn) {
      // Only reset discount fields
      setValue?.("addDiscountPercent", 0, { shouldDirty: false })
      setValue?.("addDiscountAmount", 0, { shouldDirty: false })
      setDiscountPercentage(0)
      setDiscountAmount(0)
    }
    return newValue
  }

  // Prevent negative values and ensure proper constraints
  useEffect(() => {
    if (discountPercent < 0) {
      setValue?.("addDiscountPercent", 0, { shouldDirty: false })
    }
    if (discountPercent > 100) {
      setValue?.("addDiscountPercent", 100, { shouldDirty: false })
    }
    if (discountAmount < 0) {
      setValue?.("addDiscountAmount", 0, { shouldDirty: false })
    }
    if (discountAmount > calculatedGrandTotal) {
      setValue?.("addDiscountAmount", calculatedGrandTotal, { shouldDirty: false })
    }
  }, [discountPercent, discountAmount, calculatedGrandTotal, setValue])

  return (
    <>
      <Controller
        control={control}
        name="addDiscountApplyOn"
        render={({ field: { value, onChange } }) => (
          <Select
            placeholder={t("form-apply-additional-discount-on")}
            options={additionalDiscountOn}
            label={t("form-apply-additional-discount-on")}
            error={
              errors.addDiscountApplyOn?.message
                ? t(errors.addDiscountApplyOn?.message)
                : ""
            }
            onChange={(option: any) => {
              onChange(handleApplyOnChange(option))
              onChange(option.value)
            }}
            value={FindSelectOption(additionalDiscountOn, value)}
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(additionalDiscountOn.length)}
            isDisabled={isFieldDisabled || true}
          />
        )}
      />
      <Input
        placeholder={t("form-additional-discount-percentage")}
        label={t("form-additional-discount-percentage")}
        labelClassName="text-title"
        type="number"
         min={0}
        max={100}
        {...(register &&
          register("addDiscountPercent", { 
            valueAsNumber: true,
            min: 0,
            max: 100
          }))}
        error={
          errors.addDiscountPercent?.message
            ? t(errors.addDiscountPercent?.message)
            : ""
        }
        onChange={(e) => handlePercentageChange(Number(e.target.value))}
        disabled={isFieldDisabled || true}
      />
      <Input
        placeholder={t("form-additional-discount-amount")}
        label={t("form-additional-discount-amount")}
        labelClassName="text-title"
        type="number"
        min={0}
        {...(register &&
          register("addDiscountAmount", { 
            valueAsNumber: true,
            min: 0,
            max: calculatedGrandTotal
          }))}
        onChange={(e) => handleAmountChange(Number(e.target.value))}
        error={
          errors.addDiscountAmount?.message
            ? t(errors.addDiscountAmount?.message)
            : ""
        }
        disabled={isFieldDisabled || true}
      />
    </>
  )
}