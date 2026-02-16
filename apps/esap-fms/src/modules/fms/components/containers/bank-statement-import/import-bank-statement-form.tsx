"use client"

import { useRouter } from "next/navigation"

import { Form } from "@core/ui/form"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { useAtom, useAtomValue } from "jotai"
import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import FileUpload from "@/components/base/file-upload"
import FormFooter from "@/components/base/form-footer"
import FormGroup from "@/components/base/form-group"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import { useSharedDataHooks } from "@/modules/fms/constants/shared-data-hook"
import {
  useBankTransactionImportById,
  useCreateBankTransactionImport,
} from "@/modules/fms/hooks/use-bank-transaction-import"
import {
  columnMappingAtom,
  previewDataAtom,
} from "@/modules/fms/store/bank-statement-store"
import { BankStatementImport } from "@/modules/fms/types/bank-statement-import"
import {
  BankStatementImportFormInput,
  bankStatementImportSchema,
} from "@/modules/fms/validators/bank-statement-import-schema"

import StatementDetails from "./statement-details"
import TablePreview from "./table-preview"
import TableView from "./table-view"

dayjs.extend(customParseFormat)

export default function ImportBankStatementForm({
  id,
  mode,
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  const t = useTranslations("form")
  const router = useRouter()
  const { company, bankAccount, currency, bank } = useSharedDataHooks([
    "company",
    "bankAccount",
    "currency",
    "bank",
  ])
  const { companyOptions, companyList, isCompanyLoading } = company
  const { bankAccountOptions, bankAccountList, isBankAccountLoading } = bankAccount
  const { currencyOptions, isCurrencyLoading } = currency
  const { bankOptions, isBankLoading } = bank

  const { data: bankTransactionImportById } = useBankTransactionImportById(id!)
  const {
    mutate: createBankTransactionImport,
    isPending: isCreateBankTransactionImportPending,
  } = useCreateBankTransactionImport()

  const isFieldDisabled = mode === "view"

  const [previewData, setPreviewData] = useAtom(previewDataAtom)
  const columnMapping = useAtomValue(columnMappingAtom)

  const availableColumns =
    previewData.length > 0 ? Object.keys(previewData[0]) : []

  const handleFileUpload = (files: File[], parsedData?: any) => {
    if (parsedData) {
      setPreviewData(parsedData)
    }
  }

  const onSubmit = (data: BankStatementImportFormInput) => {
    const bankStatementDetails = previewData.map((row) => {
      const rawDate = row[columnMapping.date || ""]

      let parsedDate
      const dateFormats = [
        "DD-MM-YYYY",
        "DD/MM/YYYY",
        "YYYY-MM-DD",
        "MM/DD/YYYY",
      ]

      for (const format of dateFormats) {
        const parsed = dayjs(rawDate, format)
        if (parsed.isValid()) {
          parsedDate = parsed.startOf("day").toISOString()
          break
        }
      }

      if (!parsedDate) {
        // eslint-disable-next-line no-console
        console.error(`Invalid date format for: ${rawDate}`)
        parsedDate = dayjs().startOf("day").toISOString()
      }

      return {
        transactionDate: parsedDate,
        amount: parseFloat(row[columnMapping.amount || ""]) || 0,
        transactionType: row[columnMapping.transactionType || ""],
        referenceNumber: row[columnMapping.referenceNumber || ""],
        description: row[columnMapping.description || ""],
      }
    })

    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement
    const file = fileInput?.files?.[0]

    const formData = new FormData()
    if (file) {
      formData.append("bsFile", file)
    }

    const submitData: BankStatementImport = {
      ...data,
      bankStatementDetails,
    }

    createBankTransactionImport(submitData)
  }

  const defaultValues = {
    ...bankTransactionImportById,
    bankStatementDetails: bankTransactionImportById?.bankStatementDetails || [],
  }

  return (
    <div>
      <Box>
        <Form<BankStatementImportFormInput>
          validationSchema={bankStatementImportSchema}
          onSubmit={onSubmit}
          className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
          useFormProps={{
            defaultValues: defaultValues || bankTransactionImportById,
            mode: "onChange",
            values: bankTransactionImportById as BankStatementImport,
          }}>
          {({ control, setValue, formState: { errors }, register }) => {
            return (
              <>
                <FormGroupContainer>
                  <FormGroup title={t("form-account-details")}>
                    <Controller
                      name="companyId"
                      control={control}
                      defaultValue={
                        companyList?.data?.find(
                          (company: any) => company.isDefault
                        )?.id || 0
                      }
                      render={({ field: { value, onChange } }) => (
                        <Select
                          label={t("form-company-name")}
                          labelClassName="text-title"
                          isRequired
                          menuPortalTarget={document.body}
                          options={companyOptions}
                          value={
                            value && companyOptions
                              ? companyOptions.find(
                                (option: any) => option.value === value
                              )
                              : companyOptions?.find(
                                (option: any) =>
                                  option.value ===
                                  companyList?.data?.find(
                                    (company: any) => company.isDefault
                                  )?.id
                              ) || null
                          }
                          onChange={(option: any) => onChange(option.value)}
                          isLoading={isCompanyLoading}
                          isDisabled={isCompanyLoading || isFieldDisabled}
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
                      name="bankAccountId"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          label={t("form-bank-account-name")}
                          labelClassName="text-title"
                          options={bankAccountOptions}
                          value={
                            value && bankAccountOptions
                              ? bankAccountOptions.find(
                                (option: any) => option.value === value
                              ) || null
                              : null
                          }
                          onChange={(option: any) => {
                            onChange(option.value)
                            if (option?.value) {
                              const selectedProduct = bankAccountList?.data?.find(
                                (bank: any) => bank.id === option.value
                              )
                              console.log(selectedProduct)
                              if (selectedProduct) {
                                setValue("bankId", selectedProduct.bankId || "")
                                setValue("bankName", selectedProduct.bankName || "")
                                setValue("currencyId", selectedProduct.currencyId || 0)
                              }
                            }
                          }}
                          isRequired
                          isLoading={isBankAccountLoading}
                          isDisabled={isBankAccountLoading || isFieldDisabled}
                          placeholder={
                            isBankAccountLoading
                              ? "Loading bank accounts..."
                              : t("form-select-bank-account")
                          }
                          error={
                            errors.bankAccountId?.message &&
                            t(errors.bankAccountId.message)
                          }
                        />
                      )}
                    />
                    <Controller
                      name="currencyId"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          label={t("form-currency-name")}
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
                            errors?.currencyId?.message
                              ? t(errors?.currencyId?.message)
                              : ""
                          }
                        />
                      )}
                    />
                    {!bankTransactionImportById && (
                      <FileUpload
                        accept="csv"
                        multiple={false}
                        onUpload={handleFileUpload}
                        btnLabel="upload"
                        className="col-span-full w-full @2xl:p-0"
                      />
                    )}
                  </FormGroup>
                  {!bankTransactionImportById && (
                    <>
                      <FormGroup
                        title={t("form-statement-details")}
                        className="pt-7 @2xl:pt-9 @3xl:pt-11">
                        <StatementDetails
                          control={control}
                          availableColumns={availableColumns}
                        />
                      </FormGroup>

                      <FormGroup
                        title={t("form-preview")}
                        className="pt-7 @2xl:pt-9 @3xl:pt-11"
                        childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                        <TablePreview data={previewData} />
                      </FormGroup>
                    </>
                  )}

                  {bankTransactionImportById && (
                    <FormGroup
                      title={t("form-import-log")}
                      className="pt-7 @2xl:pt-9 @3xl:pt-11"
                      childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                      <TableView
                        data={bankTransactionImportById.bankTransactions!}
                      />
                    </FormGroup>
                  )}
                </FormGroupContainer>

                {mode !== "view" && (
                  <FormFooter
                    isLoading={isCreateBankTransactionImportPending}
                    altBtnText={t("form-back")}
                    handleAltBtn={() => router.back()}
                    submitBtnText={id ? t("form-save") : t("form-import")}
                    className="border-gray-500/20 dark:bg-paper"
                  />
                )}
              </>
            )
          }}
        </Form>
      </Box>
    </div>
  )
}
