"use client";




import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { Control, Controller, FormState, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";



import { Input, Select } from "@/components/ui";
import { additionalDiscountOn } from "@/modules/scm/constants/shared-status-field-option";
import { discountAmountAtom, discountPercentageAtom } from "@/modules/scm/store/global-store-state";
import { calculatedNetTotalAtom } from "@/modules/scm/store/purchase-order";
import { PurchasedOrderInput, PurchasedOrderUpdate } from "@/modules/scm/types/procurement/purchased-order/purchased-order-types";
import { FindSelectOption, GetMenuListStyles } from "@/modules/scm/utils/select-options";





interface AdditionalDiscountFormProps {
  isFieldDisabled?: boolean
  formMethods: {
    register?: UseFormRegister<PurchasedOrderInput | PurchasedOrderUpdate>
    control?: Control<PurchasedOrderInput | PurchasedOrderUpdate>
    formState: FormState<PurchasedOrderInput>
    watch?: UseFormWatch<PurchasedOrderInput | PurchasedOrderUpdate>
    setValue?: UseFormSetValue<PurchasedOrderInput | PurchasedOrderUpdate>
  }
}

export default function AdditionalDiscountForm({
  isFieldDisabled,
  formMethods,
}: AdditionalDiscountFormProps) {
  const t = useTranslations("form")
  const [, setDiscountAmount] = useAtom(discountAmountAtom)
  const [, setDiscountPercentage] = useAtom(discountPercentageAtom)
  const [calculatedNetTotal] = useAtom(calculatedNetTotalAtom)

  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
  } = formMethods

  const applyOn = watch?.("addDiscountApplyOn")
  const applyAmount = watch?.("addDiscountAmount")
  const applyPercentage = watch?.("addDiscountPercent")

  const handlePercentageChange = (value: number) => {
    const numValue = Number(value) || 0
    setDiscountPercentage(numValue)
    if (numValue > 0) {
      setValue?.("addDiscountAmount", 0)
      setDiscountAmount(0)
    }
  }

  const handleAmountChange = (value: number) => {
    const numValue = Number(value) || 0
    setDiscountAmount(numValue)
    if (numValue > 0) {
      setValue?.("addDiscountPercent", 0)
      setDiscountPercentage(0)
    }
  }

  const handleApplyOnChange = (option: any) => {
    const newValue = option?.value
    if (newValue !== applyOn) {
      setValue?.("addDiscountPercent", 0)
      setValue?.("addDiscountAmount", 0)
      setValue?.("netTotalAmount", calculatedNetTotal)
    }
    return newValue
  }

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
            onChange={(option: any) => onChange(handleApplyOnChange(option))}
            value={FindSelectOption(additionalDiscountOn, value)}
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(additionalDiscountOn.length)}
            isDisabled={isFieldDisabled}
          />
        )}
      />
      <Input
        placeholder={t("form-additional-discount-percentage")}
        label={t("form-additional-discount-percentage")}
        labelClassName="text-title"
        type="number"
        {...(register &&
          register("addDiscountPercent", { valueAsNumber: true }))}
        error={
          errors.addDiscountPercent?.message
            ? t(errors.addDiscountPercent?.message)
            : ""
        }
        // value={displayDiscountPercent}
        onChange={(e) => handlePercentageChange(Number(e.target.value))}
        disabled={
          isFieldDisabled ||
          applyOn === "grandTotal" ||
          (applyAmount ?? 0) > 0
        }
      />

      <Input
        placeholder={t("form-additional-discount-amount")}
        label={t("form-additional-discount-amount")}
        labelClassName="text-title"
        type="number"
        {...(register &&
          register("addDiscountAmount", { valueAsNumber: true }))}
        // value={displayDiscountAmount}
        onChange={(e) => handleAmountChange(Number(e.target.value))}
        error={
          errors.addDiscountAmount?.message
            ? t(errors.addDiscountAmount?.message)
            : ""
        }
        disabled={
          isFieldDisabled ||
          applyOn === "grandTotal" ||
          (applyPercentage ?? 0) > 0
        }
      />
    </>
  )
}