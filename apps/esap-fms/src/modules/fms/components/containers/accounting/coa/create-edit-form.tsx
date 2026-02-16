"use client"

import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  useCOAById,
  useCOAList,
  useCreateCOA,
  useUpdateCOA,
} from "@/modules/fms/hooks/use-coa"
import { COAList } from "@/modules/fms/types"
import { accountFormSchema } from "@/modules/fms/validators/account-schema"

export default function CreateEditForm({
  id,
  mode = "create",
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  const t = useTranslations("form")
  const { company, currency } =
    useSharedDataHooks([
      "company",
      "currency",
    ])
  const router = useRouter()
  const { companyOptions, companyList, isCompanyLoading } = company
  const { currencyOptions, isCurrencyLoading } = currency

  const { accountType } = useSharedDataHooks(["accountTypes"])

  const { accountTypeOptions, isAccountTypeLoading: isAccountTypeLoading } = accountType

  const { data: coaById } = useCOAById(id!)

  const isFieldDisabled = mode === "view"

  const { mutateAsync: createCOA, isPending: isCreateCOALoading } =
    useCreateCOA()
  const { mutateAsync: updateCOA, isPending: isUpdateCOALoading } =
    useUpdateCOA()

  const onSubmit = async (data: COAList) => {
    const formData = { ...data }

    if (id) {
      await updateCOA({ ...formData, id })
    } else {
      await createCOA(formData)
    }
  }

  const defaultValues: Partial<COAList> = {
    accountName: "",
    accountNumber: "",
    accountingTypeId: 0,
    companyId: 0,
    currencyId: 0,
  }

  return (
    <Box>
      <Form<COAList>
        validationSchema={accountFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          defaultValues: coaById || defaultValues,
          mode: "onChange",
          reValidateMode: "onChange",
          values: coaById as COAList,
        }}>
        {({ control, register, setValue, formState: { errors } }) => {
          useEffect(() => {
            if (companyList?.data && !id) {
              const defaultCompany = companyList.data.find((company: any) => company.isDefault)
              if (defaultCompany) {
                setValue?.("companyId", defaultCompany.id)
                setValue?.("currencyId", defaultCompany.currencyId || "")
              }
            }
          }, [companyList?.data, id, setValue])
          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-details")}>
                  <Input
                    {...register("accountName")}
                    isRequired
                    label={t("form-accounting-name")}
                    placeholder={t("form-enter-accounting-name")}
                    error={
                      errors.accountName?.message &&
                      t(errors.accountName.message)
                    }
                    disabled={isFieldDisabled}
                  />
                  <Controller
                    name="accountingTypeId"
                    control={control}
                    render={({
                      field: { value, onChange },
                    }) => (
                      <Select
                        label={t("form-accounting-types")}
                        labelClassName="text-title"
                        placeholder={
                          isAccountTypeLoading
                            ? "Loading accounting types..."
                            : t("form-select-accounting-types")
                        }
                        options={accountTypeOptions}
                        value={
                          value && accountTypeOptions
                            ? accountTypeOptions.find((option: any) => option.value === value) ||
                            null
                            : null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isLoading={isAccountTypeLoading}
                        isDisabled={isFieldDisabled}
                        error={
                          errors?.accountingTypeId?.message &&
                          t(errors?.accountingTypeId?.message)
                        }
                      />
                    )}
                  />

                  <Controller
                    name="companyId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-company-name")}
                        labelClassName="text-title"
                        isRequired
                        menuPortalTarget={document.body}
                        options={companyOptions}
                        value={
                          companyOptions?.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        onChange={(option: any) => {
                          if (option?.value) {
                            onChange(option.value)
                            const selectedAccount = companyList?.data?.find(
                              (acc: any) => acc.id === option.value
                            )
                            if (selectedAccount) {
                              setValue?.("currencyId", selectedAccount.currencyId || "")
                            }
                          }
                        }}
                        isLoading={isCompanyLoading}
                        isDisabled={isFieldDisabled || isCompanyLoading}
                        placeholder={
                          isCompanyLoading
                            ? "Loading companies..."
                            : t("form-select-company")
                        }
                        error={
                          errors.companyId?.message &&
                          t(errors.companyId.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="currencyId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-currency")}
                        labelClassName="text-title"
                        options={currencyOptions}
                        value={
                          value && currencyOptions
                            ? currencyOptions.find(
                              (option: any) => option.value === value
                            ) || null
                            : null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isLoading={isCurrencyLoading}
                        isDisabled={isFieldDisabled || isCurrencyLoading}
                        placeholder={
                          isCurrencyLoading
                            ? "Loading currencies..."
                            : t("form-select-currency")
                        }
                        error={
                          errors.currencyId?.message &&
                          t(errors.currencyId.message)
                        }
                      />
                    )}
                  />
                  <Input
                    {...register("accountNumber")}
                    label={t("form-account-number")}
                    placeholder={t("form-enter-account-number")}
                    disabled={isFieldDisabled}
                  />
                  {/* <Input
                    {...register("taxRate")}
                    label={t("form-rate")}
                    placeholder={t("form-enter-rate")}
                    disabled={isFieldDisabled}
                  /> */}
                  {/* <Input
                    {...register("balanceMustBe")}
                    label={t("form-balance-must-be")}
                    placeholder={t("form-enter-balance-must-be")}
                    disabled={isFieldDisabled}
                  /> */}
                  {/* <Controller
                    name="isParent"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        label={t("form-is-parent")}
                        checked={value as boolean}
                        onChange={onChange}
                      />
                    )}
                  /> */}
                </FormGroup>
              </FormGroupContainer>

              {mode !== "view" && (
                <FormFooter
                  isLoading={isCreateCOALoading || isUpdateCOALoading}
                  handleAltBtn={() => router.back()}
                  altBtnText={t("form-back")}
                  submitBtnText={
                    id ? t("form-update-account") : t("form-create-account")
                  }
                  className="border-gray-500/20 dark:bg-paper"
                />
              )}
            </>
          )
        }}
      </Form>
    </Box>
  )
}
