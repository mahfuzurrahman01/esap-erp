"use client"

import { useRouter } from "next/navigation"

import { Form } from "@core/ui/form"
import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import { Grid } from "rizzui"

import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Checkbox, Input, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import { partyTypeOptions, useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  useBankAccountById,
  useCreateBankAccount,
  useUpdateBankAccount,
} from "@/modules/fms/hooks/use-bank-account"
import {
  selectedPartyTypeAtom,
} from "@/modules/fms/store/party-type-atom"
import { BankAccountList } from "@/modules/fms/types"
import {
  BankAccountFormInput,
  bankAccountFormSchema,
} from "@/modules/fms/validators/bank-account-schema"

export default function CreateEditBankAccountForm({
  id,
  mode = "create",
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  const router = useRouter()
  const t = useTranslations("form")
  const {
    supplier,
    customer,
    employee,
    company,
    bank,
    coa,
    bankAccountType,
    currency,
  } = useSharedDataHooks([
    "supplier",
    "customer",
    "employee",
    "company",
    "bank",
    "coa",
    "bankAccountType",
    "currency",
  ])

  const {
    employeeOptions = [],
    isEmployeeLoading = false,
    error: employeeError,
  } = employee || {}

  const { supplierOptions = [], isSupplierLoading = false } = supplier || {}
  const { customerOptions = [], isCustomerLoading = false } = customer || {}
  const { companyOptions = [], isCompanyLoading = false } = company || {}
  const { bankOptions = [], isBankLoading = false } = bank || {}
  const { coaOptions = [], isCOALoading = false } = coa || {}
  const { bankAccountTypeOptions = [], isBankAccountTypeLoading = false } =
    bankAccountType || {}
  const { currencyOptions = [], isCurrencyLoading = false } = currency || {}

  const { data: bankAccountById } = id
    ? useBankAccountById(Number(id))
    : { data: undefined }

  const { companyList } = company

  const isFieldDisabled = mode === "view"

  const {
    mutateAsync: createBankAccount,
    isPending: isCreateBankAccountLoading,
  } = useCreateBankAccount()
  const {
    mutateAsync: updateBankAccount,
    isPending: isUpdateBankAccountLoading,
  } = useUpdateBankAccount()

  const [selectedPartyType, setSelectedPartyType] = useAtom(
    selectedPartyTypeAtom
  )

  const onSubmit: SubmitHandler<BankAccountFormInput> = async (data) => {
    const formattedData = {
      ...data,
      id: id || 0,
      accountName: data.accountName,
      bankId: data.bankId,
      bankAccountTypeId: data.bankAccountTypeId || 0,
      chartOfAccountId: data.chartOfAccountId || null,
      currencyId: data.currencyId || 0,
      isActive: data.isActive || false,
      isCompanyAccount: data.isCompanyAccount || false,
      partyType: selectedPartyType
    }

    if (id) {
      await updateBankAccount({
        id,
        data: formattedData as BankAccountList,
      })
    } else {
      await createBankAccount(formattedData as BankAccountList)
    }
  }

  const defaultValues: Partial<BankAccountFormInput> = {
    accountName: "",
    bankId: 0,
    bankName: "",
    bankAccountTypeId: 0,
    accountNumber: "",
    chartOfAccountId: null,
    isActive: false,
    isCompanyAccount: false,
    companyId: 0,
    iban: "",
    partyType: "",
    supplierId: 0,
    customerId: "",
    employeeId: 0,
    entityTypeId: 0,
    entityTypeName: "",
    currencyId: 0,
  }

  return (
    <Box>
      <Form<BankAccountFormInput>
        validationSchema={bankAccountFormSchema}
        onSubmit={onSubmit}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          defaultValues: defaultValues || bankAccountById,
          mode: "onChange",
          reValidateMode: "onChange",
          values: bankAccountById as BankAccountFormInput,
        }}>
        {({
          control,
          register,
          setValue,
          formState: { errors },
          trigger,
          watch,
        }) => {
          return (
            <>
              <FormGroupContainer>
                <FormGroup title={t("form-account-details")}>
                  <Input
                    {...register("accountName")}
                    label={t("form-accounting-name")}
                    placeholder={t("form-enter-accounting-name")}
                    isRequired
                    error={
                      errors.accountName?.message &&
                      t(errors.accountName.message)
                    }
                    disabled={isFieldDisabled}
                  />
                  <Controller
                    name="bankAccountTypeId"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-bank-account-type")}
                        labelClassName="text-title"
                        options={bankAccountTypeOptions}
                        value={
                          value && bankAccountTypeOptions
                            ? bankAccountTypeOptions.find(
                              (option: any) => option.value === value
                            ) || null
                            : null
                        }
                        onChange={(option: any) => onChange(option?.value)}
                        isLoading={isBankAccountTypeLoading}
                        isDisabled={isFieldDisabled || isBankAccountTypeLoading}
                        placeholder={
                          isBankAccountTypeLoading
                            ? "Loading bank account types..."
                            : t("form-select-bank-account-type")
                        }
                        error={
                          errors.bankAccountTypeId?.message &&
                          t(errors.bankAccountTypeId.message)
                        }
                      />
                    )}
                  />
                  <Controller
                    name="bankId"
                    control={control}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <Select
                        label={t("form-bank")}
                        labelClassName="text-title"
                        placeholder={
                          isBankLoading
                            ? "Loading banks..."
                            : t("form-select-bank")
                        }
                        isRequired
                        options={bankOptions}
                        value={
                          value && bankOptions
                            ? bankOptions.find(
                              (option: any) => option.value === value
                            ) || null
                            : null
                        }
                        onChange={(option: any) => {
                          onChange(option?.value)
                          if (option) {
                            setValue("bankName", option.label)
                          } else {
                            setValue("bankName", "")
                          }
                        }}
                        isLoading={isBankLoading}
                        isDisabled={isFieldDisabled}
                        error={
                          errors.bankId?.message && t(errors.bankId.message)
                        }
                      />
                    )}
                  />
                  <Input
                    {...register("bankName")}
                    label={t("form-bank-name")}
                    placeholder={t("form-enter-bank-name")}
                    error={
                      errors.bankName?.message && t(errors.bankName.message)
                    }
                    disabled={isFieldDisabled}
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
                        isRequired
                        error={
                          errors.currencyId?.message &&
                          t(errors.currencyId.message)
                        }
                        required={true}
                      />
                    )}
                  />
                  <Input
                    {...register("accountNumber")}
                    label={t("form-bank-account-number")}
                    placeholder={t("form-enter-bank-account-number")}
                    error={
                      errors.accountNumber?.message &&
                      t(errors.accountNumber.message)
                    }
                    disabled={isFieldDisabled}
                  />
                  <Input
                    {...register("iban")}
                    label={t("form-iban")}
                    placeholder={t("form-enter-iban")}
                    error={errors.iban?.message && t(errors.iban.message)}
                    disabled={isFieldDisabled}
                  />
                  <Grid columns="3" className="col-span-2">
                    <Controller
                      name="isActive"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          label={t("form-is-active")}
                          checked={value || false}
                          onChange={onChange}
                          disabled={isFieldDisabled}
                        />
                      )}
                    />
                    <Controller
                      name="isCompanyAccount"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          label={t("form-is-company-account")}
                          size="md"
                          checked={value || false}
                          onChange={(e: any) => {
                            onChange(e)
                            if (e.target.checked) {
                              trigger(["chartOfAccountId", "companyId"])
                            } else {
                              setValue("chartOfAccountId", 0)
                              setValue("companyId", 0)
                            }
                          }}
                          disabled={isFieldDisabled}
                        />
                      )}
                    />
                  </Grid>
                  {watch("isCompanyAccount") && (
                    <>
                      <Controller
                        name="chartOfAccountId"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Select
                            label={t("form-chart-of-account")}
                            labelClassName="text-title"
                            options={coaOptions}
                            value={
                              value && coaOptions
                                ? coaOptions.find(
                                  (option: any) => option.value === value
                                ) || null
                                : null
                            }
                            onChange={(option: any) => onChange(option?.value)}
                            isLoading={isCOALoading}
                            isDisabled={isFieldDisabled || isCOALoading}
                            placeholder={
                              isCOALoading
                                ? "Loading chart of accounts..."
                                : t("form-select-chart-of-account")
                            }
                            error={
                              errors.chartOfAccountId?.message &&
                              t(errors.chartOfAccountId.message)
                            }
                            isRequired
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
                            options={companyOptions}
                            value={
                              value && companyOptions
                                ? companyOptions.find(
                                  (option: any) => option.value === value
                                ) || null
                                : null
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
                            required={true}
                          />
                        )}
                      />
                    </>
                  )}
                </FormGroup>

                <FormGroup
                  title={t("form-type")}
                  className="pt-7 @2xl:pt-9 @3xl:pt-11">
                  <Controller
                    name="partyType"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        label={t("form-party-type")}
                        labelClassName="text-title"
                        options={partyTypeOptions}
                        value={
                          value && partyTypeOptions
                            ? partyTypeOptions.find(
                              (option: any) => option.value === value
                            ) || null
                            : null
                        }
                        onChange={(option: any) => {
                          onChange(option?.value)
                          setSelectedPartyType(option?.value)
                        }}
                        menuPlacement="top"
                        isDisabled={isFieldDisabled}
                        placeholder={t("form-select-party-type")}
                        // menuPortalTarget={document.body}
                        error={
                          errors.partyType?.message &&
                          t(errors.partyType.message)
                        }
                      />
                    )}
                  />

                  {selectedPartyType === "Supplier" && (
                    <Controller
                      name="supplierId"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          label={t("form-supplier")}
                          labelClassName="text-title"
                          options={supplierOptions}
                          value={
                            value && supplierOptions
                              ? supplierOptions.find(
                                (option: any) => option.value === value
                              ) || null
                              : null
                          }
                          onChange={(option: any) => {
                            onChange(option?.value)
                            if (option) {
                              setValue("supplierName", option.label)
                            } else {
                              setValue("supplierName", "")
                            }
                          }}
                          menuPlacement="top"
                          // menuPortalTarget={document.body}
                          isLoading={isSupplierLoading}
                          isDisabled={isSupplierLoading || isFieldDisabled}
                          placeholder={
                            isSupplierLoading
                              ? t("form-loading")
                              : t("form-select")
                          }
                          error={
                            errors.supplierId?.message &&
                            t(errors.supplierId.message)
                          }
                        />
                      )}
                    />
                  )}

                  {selectedPartyType === "Customer" && (
                    <Controller
                      name="customerId"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          label={t("form-customer")}
                          labelClassName="text-title"
                          options={customerOptions}
                          value={
                            value && customerOptions
                              ? customerOptions.find(
                                (option: any) => option.value === value
                              ) || null
                              : null
                          }
                          onChange={(option: any) => {
                            onChange(option?.value)
                            if (option) {
                              setValue("customerName", option.label)
                            } else {
                              setValue("customerName", "")
                            }
                          }}
                          menuPlacement="top"
                          // menuPortalTarget={document.body}
                          isLoading={isCustomerLoading}
                          isDisabled={isCustomerLoading || isFieldDisabled}
                          placeholder={
                            isCustomerLoading
                              ? t("form-loading")
                              : t("form-select")
                          }
                          error={
                            errors.customerId?.message &&
                            t(errors.customerId.message)
                          }
                        />
                      )}
                    />
                  )}

                  {selectedPartyType === "Employee" && (
                    <Controller
                      name="employeeId"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          label={t("form-employee")}
                          labelClassName="text-title"
                          options={employeeOptions}
                          value={
                            value && employeeOptions
                              ? employeeOptions.find(
                                (option: any) => option.value === value
                              ) || null
                              : null
                          }
                          onChange={(option: any) => {
                            onChange(option?.value)
                            if (option) {
                              setValue("employeeName", option.label)
                            } else {
                              setValue("employeeName", "")
                            }
                          }}
                          menuPlacement="top"
                          menuPortalTarget={document.body}
                          isLoading={isEmployeeLoading}
                          isDisabled={isEmployeeLoading || isFieldDisabled}
                          placeholder={
                            employeeError
                              ? t("form-unauthorized")
                              : isEmployeeLoading
                                ? t("form-loading")
                                : t("form-select")
                          }
                          error={
                            employeeError
                              ? t("form-no-access-employees")
                              : errors.employeeId?.message &&
                              t(errors.employeeId.message)
                          }
                        />
                      )}
                    />
                  )}
                </FormGroup>
              </FormGroupContainer>

              {mode !== "view" && (
                <FormFooter
                  isLoading={
                    isCreateBankAccountLoading || isUpdateBankAccountLoading
                  }
                  altBtnText={t("form-back")}
                  submitBtnText={
                    id ? t("form-update-account") : t("form-create-account")
                  }
                  handleAltBtn={() => router.back()}
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
