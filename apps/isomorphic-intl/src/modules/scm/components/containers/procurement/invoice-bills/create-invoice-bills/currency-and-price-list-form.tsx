"use client"

import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"

import { Select } from "@/components/ui"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import {
  InvoiceInput,
  InvoiceUpdate,
} from "@/modules/scm/types/procurement/invoice/invoice-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"
import { useAtom } from "jotai"
import { currencyNameTemplate } from "@/modules/scm/components/containers/procurement/requisition/create-requisition"

interface CurrencyAndPriceListFormProps {
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

export default function CurrencyAndPriceListForm({
  isFieldDisabled,
  formMethods,
}: CurrencyAndPriceListFormProps) {
  const t = useTranslations("form")
  const { currency } = useSCMSharedDataHook(["currency"])
  const [, setCurrencyName] = useAtom(currencyNameTemplate)

  const { currencyOptions, isCurrenciesLoading } = currency

  const {
    control,
    formState: { errors },
  } = formMethods

  return (
    <>
      <Controller
        control={control}
        name="currencyId"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-currency")}
            labelClassName="text-title"
            placeholder={t("form-select-currency")}
            options={currencyOptions}
            onChange={(option: any) => {
              onChange(option?.value)
              setCurrencyName(option?.label)
            }}
            value={FindSelectOption(currencyOptions, value)}
            isLoading={isCurrenciesLoading}
            isDisabled={isFieldDisabled || true}
             error={
              errors.currencyId?.message
                ? t(errors.currencyId?.message)
                : ""
            }
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(currencyOptions.length)}
            isRequired
          />
        )}
      />
    </>
  )
}
