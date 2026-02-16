"use client"

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
import { useModal } from "@/components/base/modal-views/use-modal"
import { Input, Select } from "@/components/ui"
import UploadZone from "@/components/ui/upload-zone"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useCountryList } from "@/modules/fms/hooks/use-country"
import { useCurrencyList } from "@/modules/fms/hooks/use-currency"
import { CountryList, CurrencyList } from "@/modules/fms/types"
import { usePaymentTermsList } from "@/modules/scm/hooks/procurement/supplier/use-payment-terms"
import { PaymentTerms } from "@/modules/scm/types/procurement/supplier/payment-terms-types"
import { SupplierCreateInput } from "@/modules/scm/types/procurement/supplier/supplier-types"
import {
  GetMenuListStyles,
  WithAddNewOption,
} from "@/modules/scm/utils/select-options"
import { FindSelectOption } from "@/modules/scm/utils/select-options"

import PaymentTermsForm from "../payment-terms"

export const selectedBankCountryNameAtom = atom<string>("")
export const selectedBankCountryIdAtom = atom<number>(0)
export const selectedBankCurrencyNameAtom = atom<string>("")
export const selectedBankCurrencyIdAtom = atom<number>(0)

interface FinancialInfoFormProps {
  className?: string
  isFieldDisabled?: boolean
  formMethods: {
    register: UseFormRegister<SupplierCreateInput>
    control: Control<SupplierCreateInput>
    formState: FormState<SupplierCreateInput>
    setValue: any
  }
}

export default function FinancialInfoForm({
  formMethods,
  isFieldDisabled,
}: FinancialInfoFormProps) {
  const [, setSelectedBankCountryName] = useAtom(selectedBankCountryNameAtom)
  const [, setSelectedBankCountryId] = useAtom(selectedBankCountryIdAtom)
  const [, setSelectedBankCurrencyName] = useAtom(selectedBankCurrencyNameAtom)
  const [, setSelectedBankCurrencyId] = useAtom(selectedBankCurrencyIdAtom)
  const {
    register,
    control,
    formState: { errors },
  } = formMethods
  const t = useTranslations("form")

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

  const { openModal } = useModal()

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
              {...register("SupplierBankAccountDetail.bankName", {
                required: true,
              })}
              isRequired
              error={
                errors.SupplierBankAccountDetail?.bankName?.message
                  ? t(errors.SupplierBankAccountDetail?.bankName?.message)
                  : ""
              }
              labelClassName="bg-paper"
              label={t("form-bank-name")}
              disabled={isFieldDisabled}
            />
            {/* Bank Branch Name*/}
            <Input
              {...register("SupplierBankAccountDetail.branchName", {
                required: true,
              })}
              isRequired
              error={
                errors.SupplierBankAccountDetail?.branchName?.message
                  ? t(errors.SupplierBankAccountDetail?.branchName?.message)
                  : ""
              }
              labelClassName="bg-paper"
              label={t("form-bank-branch-name")}
              disabled={isFieldDisabled}
            />
            {/* Bank Account Holder Name */}
            <Input
              {...register("SupplierBankAccountDetail.accountHolderName", {
                required: true,
              })}
              error={
                errors.SupplierBankAccountDetail?.accountHolderName
                  ?.message
                  ? t(errors.SupplierBankAccountDetail?.accountHolderName?.message)
                  : ""
              }
              labelClassName="bg-paper"
              label={t("form-bank-account-holder-name")}
              isRequired
              disabled={isFieldDisabled}
            />
            {/* Bank Account Number */}
            <Input
              {...register("SupplierBankAccountDetail.accountNumber", {
                required: true,
              })}
              isRequired
              error={
                errors.SupplierBankAccountDetail?.accountNumber
                  ?.message
                  ? t(errors.SupplierBankAccountDetail?.accountNumber?.message)
                  : ""
              }
              labelClassName="bg-paper"
              label={t("form-bank-account-number")}
              disabled={isFieldDisabled}
            />
            <Controller
              control={control}
              name="SupplierBankAccountDetail.countryId"
              render={({ field: { onChange, value } }) => (
                <Select
                  label={t("form-country")}
                  placeholder={t("form-country")}
                  labelClassName="text-title"
                  options={countryOptions}
                  value={FindSelectOption(countryOptions, value)}
                  onChange={(selectedValue: any) => {
                    setSelectedBankCountryName(selectedValue?.label)
                    setSelectedBankCountryId(selectedValue?.value)
                    onChange(selectedValue?.value)
                  }}
                  isLoading={isCountriesLoading}
                  isDisabled={isCountriesLoading}
                  getOptionValue={(option: any) => option.value}
                  error={
                    errors.SupplierBankAccountDetail?.countryId
                      ?.message
                      ? t(errors.SupplierBankAccountDetail?.countryId?.message)
                      : ""
                  }
                  isRequired
                  menuPortalTarget={document.body}
                  styles={GetMenuListStyles(countryOptions.length)}
                />
              )}
            />
            <Controller
              control={control}
              name="SupplierBankAccountDetail.currencyId"
              render={({ field: { onChange, value } }) => (
                <Select
                  label={t("form-currency")}
                  placeholder={t("form-currency")}
                  isRequired
                  labelClassName="text-title"
                  options={currencyOptions}
                  value={FindSelectOption(currencyOptions, value)}
                  onChange={(selectedValue: any) => {
                    setSelectedBankCurrencyName(selectedValue?.label)
                    setSelectedBankCurrencyId(selectedValue?.value)
                    onChange(selectedValue?.value)
                  }}
                  isLoading={isCurrenciesLoading}
                  isDisabled={isCurrenciesLoading}
                  getOptionValue={(option: any) => option.value}
                  error={
                    errors.SupplierBankAccountDetail?.currencyId
                      ?.message
                      ? t(errors.SupplierBankAccountDetail?.currencyId?.message)
                      : ""
                  }
                  menuPortalTarget={document.body}
                  styles={GetMenuListStyles(currencyOptions.length)}
                />
              )}
            />
            <Input
              label={t("form-bank-address")}
              {...register("SupplierBankAccountDetail.address", {
                required: true,
              })}
              error={
                errors.SupplierBankAccountDetail?.address?.message
                  ? t(errors.SupplierBankAccountDetail?.address?.message)
                  : ""
              }
              labelClassName="bg-paper"
              disabled={isFieldDisabled}
            />
            <Input
              label={t("form-routing-number")}
              {...register("SupplierBankAccountDetail.routingNumber", {
                required: true,
              })}
              error={
                errors.SupplierBankAccountDetail?.routingNumber
                  ?.message
                  ? t(errors.SupplierBankAccountDetail?.routingNumber?.message)
                  : ""
              }
              isRequired
              labelClassName="bg-paper"
              disabled={isFieldDisabled}
            />
            <Controller
              control={control}
              name="SupplierBankAccountDetail.paymentTermsId"
              render={({ field: { onChange, value } }) => (
                <Select
                  label={t("form-payment-terms")}
                  labelClassName="text-title"
                  showAddNewOption={true}
                  placeholder={t("form-select-payment-terms")}
                  options={WithAddNewOption(paymentTermsOptions)}
                  value={FindSelectOption(paymentTermsOptions, value)}
                  onChange={(selectedValue: any) => {
                    onChange(selectedValue?.value)
                  }}
                  isLoading={isPaymentTermsLoading}
                  isDisabled={isPaymentTermsLoading}
                  error={
                    errors.SupplierBankAccountDetail?.paymentTermsId
                      ?.message
                      ? t(errors.SupplierBankAccountDetail?.paymentTermsId?.message)
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
              name="SupplierBankAccountDetail.accountVerificationFile"
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
