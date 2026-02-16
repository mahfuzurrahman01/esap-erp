"use client"

import { useEffect } from "react"

import { atom, useAtom } from "jotai"
import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
} from "react-hook-form"

import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select } from "@/components/ui"
import UploadZone from "@/components/ui/upload-zone"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useCountryList } from "@/modules/fms/hooks/use-country"
import { useCurrencyList } from "@/modules/fms/hooks/use-currency"
import { CountryList, CurrencyList } from "@/modules/fms/types"
import { usePaymentTermsList } from "@/modules/scm/hooks/procurement/supplier/use-payment-terms"
import { PaymentTerms } from "@/modules/scm/types/procurement/supplier/payment-terms-types"
import {
  Supplier,
  SupplierUpdateInput,
} from "@/modules/scm/types/procurement/supplier/supplier-types"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"

export const selectedBankCountryNameAtom = atom<string>("")
export const selectedBankCountryIdAtom = atom<number>(0)
export const selectedBankCurrencyNameAtom = atom<string>("")
export const selectedBankCurrencyIdAtom = atom<number>(0)

interface FinancialInfoFormProps {
  supplier: Supplier
  className?: string
  isFieldDisabled?: boolean
  formMethods: {
    register: UseFormRegister<SupplierUpdateInput>
    control: Control<SupplierUpdateInput>
    formState: FormState<SupplierUpdateInput>
  }
}

export default function FinancialInfoForm({
  supplier,
  formMethods,
  isFieldDisabled,
}: FinancialInfoFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = formMethods
  const t = useTranslations("form")
  const [, setSelectedBankCountryName] = useAtom(selectedBankCountryNameAtom)
  const [, setSelectedBankCurrencyName] = useAtom(selectedBankCurrencyNameAtom)

  const { data: countries, isLoading: isCountriesLoading } = useCountryList()

  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencyList()

  const { data: paymentTermsData, isLoading: isPaymentTermsLoading } =
    usePaymentTermsList()

  const countryOptions = useSelectOptions<CountryList>(
    countries?.data,
    "countryName"
  )

  const currencyOptions = useSelectOptions<CurrencyList>(
    currencies?.data,
    "currencyName"
  )

  const paymentTermsOptions = useSelectOptions<PaymentTerms>(
    paymentTermsData?.data,
    "name"
  )

  return (
    <>
      {/* Banking Information Section */}
      <FormGroupContainer>
        <>
          <FormGroup
            title={t("form-details")}
            className="pt-7 @2xl:pt-10 @3xl:pt-11">
            {/* Bank Name */}
            <Input
              {...register("updateSupplierBankAccountDetailDto.bankName")}
              error={
                errors.updateSupplierBankAccountDetailDto?.bankName
                  ?.message
                  ? t(errors.updateSupplierBankAccountDetailDto?.bankName?.message)
                  : ""
              }
              labelClassName="bg-paper"
              label={t("form-bank-name")}
              disabled={isFieldDisabled}
            />
            {/* Bank Branch Name*/}
            <Input
              {...register("updateSupplierBankAccountDetailDto.branchName")}
              error={
                errors.updateSupplierBankAccountDetailDto?.branchName
                  ?.message
                  ? t(
                      errors.updateSupplierBankAccountDetailDto?.branchName
                        ?.message
                    )
                  : ""
              }
              labelClassName="bg-paper"
              label={t("form-bank-branch-name")}
              disabled={isFieldDisabled}
            />
            {/* Bank Account Holder Name */}
            <Input
              {...register(
                "updateSupplierBankAccountDetailDto.accountHolderName"
              )}
              error={
                errors.updateSupplierBankAccountDetailDto?.accountHolderName
                  ?.message
                  ? t(
                      errors.updateSupplierBankAccountDetailDto?.accountHolderName
                        ?.message
                    )
                  : ""
              }
              labelClassName="bg-paper"
              label={t("form-bank-account-holder-name")}
              disabled={isFieldDisabled}
            />
            {/* Bank Account Number */}
            <Input
              {...register("updateSupplierBankAccountDetailDto.accountNumber")}
              error={
                errors.updateSupplierBankAccountDetailDto?.accountNumber
                  ?.message
                  ? t(
                      errors.updateSupplierBankAccountDetailDto?.accountNumber
                        ?.message
                    )
                  : ""
              }
              labelClassName="bg-paper"
              label={t("form-bank-account-number")}
              disabled={isFieldDisabled}
            />
            <Controller
              control={control}
              name="updateSupplierBankAccountDetailDto.countryId"
              render={({ field: { onChange, value } }) => (
                <Select
                  label={t("form-country")}
                  placeholder={t("form-country")}
                  labelClassName="text-title"
                  options={countryOptions}
                  value={FindSelectOption(countryOptions, value)}
                  onChange={(selectedValue: any) => {
                    onChange(selectedValue?.value)
                    setSelectedBankCountryName(selectedValue?.label)
                    // setSelectedBankCountryId(selectedValue?.value)
                  }}
                  isLoading={isCountriesLoading}
                  isDisabled={isCountriesLoading}
                  error={
                    errors.updateSupplierBankAccountDetailDto?.countryId
                      ?.message
                      ? t(
                          errors.updateSupplierBankAccountDetailDto?.countryId
                            ?.message
                        )
                      : ""
                  }
                  menuPortalTarget={document.body}
                />
              )}
            />
            <Controller
              control={control}
              name="updateSupplierBankAccountDetailDto.currencyId"
              render={({ field: { onChange, value } }) => (
                <Select
                  label={t("form-currency")}
                  placeholder={t("form-currency")}
                  labelClassName="text-title"
                  options={currencyOptions}
                  value={FindSelectOption(currencyOptions, value)}
                  onChange={(selectedValue: any) => {
                    onChange(selectedValue?.value)
                    setSelectedBankCurrencyName(selectedValue?.label)
                    // setSelectedBankCurrencyId(selectedValue?.value)
                  }}
                  isLoading={isCurrenciesLoading}
                  isDisabled={isCurrenciesLoading}
                  error={
                    errors.updateSupplierBankAccountDetailDto?.currencyId
                      ?.message
                      ? t(
                          errors.updateSupplierBankAccountDetailDto?.currencyId
                            ?.message
                        )
                      : ""
                  }
                  menuPortalTarget={document.body}
                />
              )}
            />
            <Input
              label={t("form-bank-address")}
              {...register("updateSupplierBankAccountDetailDto.address")}
              error={
                errors.updateSupplierBankAccountDetailDto?.address
                  ?.message
                  ? t(
                      errors.updateSupplierBankAccountDetailDto?.address?.message
                    )
                  : ""
              }
              labelClassName="bg-paper"
              disabled={isFieldDisabled}
            />
            <Input
              label={t("form-routing-number")}
              {...register("updateSupplierBankAccountDetailDto.routingNumber")}
              error={
                errors.updateSupplierBankAccountDetailDto?.routingNumber
                  ?.message
                  ? t(
                      errors.updateSupplierBankAccountDetailDto?.routingNumber
                        ?.message
                    )
                  : ""
              }
              labelClassName="bg-paper"
              disabled={isFieldDisabled}
            />
            <Controller
              control={control}
              name="updateSupplierBankAccountDetailDto.paymentTermsId"
              render={({ field: { onChange, value } }) => (
                <Select
                  label={t("form-payment-terms")}
                  labelClassName="text-title"
                  placeholder={t("form-select-payment-terms")}
                  options={paymentTermsOptions}
                  value={FindSelectOption(paymentTermsOptions, value)}
                  onChange={(selectedValue: any) => {
                    onChange(selectedValue?.value)
                  }}
                  isLoading={isPaymentTermsLoading}
                  isDisabled={isPaymentTermsLoading}
                  error={
                    errors.updateSupplierBankAccountDetailDto?.paymentTermsId
                      ?.message
                      ? t(
                          errors.updateSupplierBankAccountDetailDto?.paymentTermsId
                            ?.message
                        )
                      : ""
                  }
                  menuPortalTarget={document.body}
                  styles={GetMenuListStyles(paymentTermsOptions.length)}
                />
              )}
            />
          </FormGroup>

          <FormGroup
            title={t("form-account-verification-document")}
            className="pt-7 @2xl:pt-10 @3xl:pt-11">
            <Controller
              name="updateSupplierBankAccountDetailDto.accountVerificationFile"
              control={control}
              render={({ field: { onChange, value } }) => (
                <UploadZone
                  className="col-span-full"
                  onChange={(file) => onChange(file)}
                  value={value}
                />
              )}
            />
          </FormGroup>
        </>
      </FormGroupContainer>
    </>
  )
}
