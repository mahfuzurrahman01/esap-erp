"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui";
import { useCurrencyById } from "@/modules/fms/hooks/use-currency";

interface TotalsAmountFormProps {
  isFieldDisabled?: boolean
  formMethods: any
  handleDiscountChange?: (value: number) => void
  summary:any
  currencyBag:any
}

export default function TotalsAmountForm({
  formMethods,
  summary,
  currencyBag
}: TotalsAmountFormProps) {
  const t = useTranslations("form")

  const {
    register,
    formState: { errors },
  } = formMethods

  const { data: customerCurrencyDataById } : any = useCurrencyById(currencyBag?.customerCurrencyId!)
  const { data: companyCurrencyDataById } : any = useCurrencyById(currencyBag?.companyCurrencyId!)

  return (
    <div className="flex w-full flex-col items-end justify-end gap-2">
      {summary?.exchangeRate > 0 ? (<>
        <Input
          label={`${t("form-grand-total")} (${customerCurrencyDataById?.symbol || ""})`}
          className="w-1/2"
          {...register?.("grandTotalOnCustomerCurrency")}
          placeholder={t("form-enter-grand-total")}
          error={errors?.grandTotalOnCustomerCurrency?.message ? t(errors.grandTotalOnCustomerCurrency?.message) : ""}
          disabled
        />
        <Input
          label={`${t("form-grand-total")} (${companyCurrencyDataById?.symbol || ""})`}
          className="w-1/2"
          {...register?.("grandTotalOnCompanyCurrency")}
          placeholder={t("form-enter-grand-total")}
          error={errors?.grandTotalOnCompanyCurrency?.message ? t(errors.grandTotalOnCompanyCurrency?.message) : ""}
          disabled
        />
      </>) : 
        <Input
          label={t("form-grand-total")}
          className="w-1/2"
          {...register?.("grandTotal")}
          placeholder={t("form-enter-grand-total")}
          error={errors?.grandTotal?.message ? t(errors.grandTotal?.message) : ""}
          disabled
        />
      }
      <Input
        type="number"
        {...register("netPayable", {
          valueAsNumber: true,
        })}
        label={t("form-net-payable")}
        className="w-1/2"
        disabled
      />
      <Input
        label={t("form-total-advance")}
        className="w-1/2"
        {...register?.("totalAdvance")}
        disabled
      />
      <Input
        label={t("form-outstanding-amount")}
        className="w-1/2"
        {...register?.("outstandingAmount")}
        disabled
      />
    </div>
  )
}