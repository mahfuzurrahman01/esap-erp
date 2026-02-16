"use client";

import Link from "next/link";
import React from "react";



import { Form } from "@core/ui/form";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { Empty } from "rizzui/empty";



import { DatePicker } from "@/components/base/date-picker";
import FileUpload from "@/components/base/file-upload";
import FormGroup from "@/components/base/form-group";
import FormGroupContainer from "@/components/base/form-group-container";
import FormStickyActions from "@/components/base/form-sticky-actions";
import { useModal } from "@/components/base/modal-views/use-modal";
import PdfIcon from "@/components/icons/pdf-icon";
import { Button, Input, Select } from "@/components/ui";
import Box from "@/components/ui/box";
import { routes } from "@/config/routes";
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks";
import { Contract, ContractInput } from "@/modules/scm/types/procurement/supplier/contract-types";
import { FindSelectOption, GetMenuListStyles, WithAddNewOption } from "@/modules/scm/utils/select-options";
import { contractSchema } from "@/modules/scm/validators/procurement/contract-schema";



import { currencyNameTemplate, previewDataTemplate } from "../../requisition/create-requisition";
import PaymentTermsForm from "../payment-terms";
import { AgreementListTable } from "./agreement-list/agreement-list-table";
import { useContractForm } from "./use-contract-form";





type IndexProps =
  | {
      initialData?: Contract
      isViewForm?: false
      isEditForm?: true
    }
  | {
      initialData?: undefined
      isEditForm?: false
      isViewForm?: false
    }
  | {
      initialData?: Contract
      isEditForm?: false
      isViewForm?: true
    }

export default function ContractForm({
  initialData,
  isEditForm,
  isViewForm,
}: IndexProps) {
  const {
    onSubmit,
    serviceLevelAgreement,
    handleServiceLevelAgreementChange,
    handleServiceLevelAgreementDelete,
    handleServiceLevelAgreementAdd,
    getFormValues,
    isLoading: isCreateContractLoading,
  } = useContractForm({
    id: initialData?.id ?? 0,
    mode: isEditForm ? "edit" : "create",
  })

  const [, setPreviewData] = useAtom(previewDataTemplate)
  const [, setCurrencyName] = useAtom(currencyNameTemplate)
  const t = useTranslations("form")

  const { currency, paymentTerms } = useSCMSharedDataHook([
    "currency",

    "paymentTerms",
  ])

  const { currencyOptions, isCurrenciesLoading } = currency
  const { paymentTermsOptions, isPaymentTermsLoading } = paymentTerms

  const handleFileUpload = (files: File[]) => {
    if (files) {
      setPreviewData(files)
    }
  }

  const { openModal } = useModal()
  const handleAddPaymentTerms = () => {
    openModal({
      view: <PaymentTermsForm />,
    })
  }

  return (
    <Box>
      <Form<ContractInput>
        onSubmit={onSubmit}
        validationSchema={contractSchema as any}
        className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:pt-11"
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          defaultValues: getFormValues(),
          values: getFormValues(),
        }}>
        {({ register, control, formState: { errors }, setValue, watch }) => (
          <>
            <FormGroupContainer>
              <FormGroup title={t("form-contract-information")}>
                <Input
                  labelClassName="bg-paper"
                  label={t("form-contract-name")}
                  {...register("contractName")}
                  error={
                    errors.contractName?.message
                      ? t(errors.contractName?.message)
                      : ""
                  }
                  className="flex-grow"
                  disabled={isViewForm}
                  isRequired
                />
                <Input
                  labelClassName="bg-paper"
                  label={t("form-contract-value")}
                  type="number"
                  min={0}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") {
                      e.preventDefault()
                    }
                  }}
                  {...register("contractValue", {
                    valueAsNumber: true,
                    min: 0,
                  })}
                  error={
                    errors.contractValue?.message
                      ? t(errors.contractValue?.message)
                      : ""
                  }
                  className="flex-grow"
                  disabled={isViewForm}
                  isRequired
                />
                <div>
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="startDate"
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                          {t("form-start-date")}{" "}
                          <span className="text-orange-500">*</span>
                        </label>
                        <DatePicker
                          id="startDate"
                          value={value ? new Date(value) : null}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          minDate={new Date()}
                          placeholderText={t("form-select-date")}
                          className="w-full"
                          disabled={isViewForm}
                        />
                      </div>
                    )}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-red-500">
                      {errors.startDate.message
                        ? t(errors.startDate.message)
                        : ""}
                    </p>
                  )}
                </div>
                <div>
                  <Controller
                    control={control}
                    name="endDate"
                    render={({ field: { value, onChange } }) => (
                      <div className="relative">
                        <label
                          htmlFor="endDate"
                          className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                          {t("form-end-date")}{" "}
                          <span className="text-orange-500">*</span>
                        </label>
                        <DatePicker
                          id="endDate"
                          value={value ? new Date(value) : null}
                          onChange={(date: any) =>
                            onChange(date ? date.toISOString() : "")
                          }
                          minDate={
                            watch("startDate")
                              ? new Date(watch("startDate") as string)
                              : new Date()
                          }
                          placeholderText={t("form-select-date")}
                          className="w-full"
                          disabled={isViewForm}
                        />
                      </div>
                    )}
                  />
                  {errors.endDate && (
                    <p className="text-sm text-red-500">
                      {errors.endDate.message ? t(errors.endDate.message) : ""}
                    </p>
                  )}
                </div>
                <Controller
                  control={control}
                  name="paymentTermsId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-payment-terms")}
                      labelClassName="text-title"
                      placeholder={t("form-select-payment-terms")}
                      options={paymentTermsOptions}
                      value={FindSelectOption(paymentTermsOptions, value)}
                      onChange={(selectedValue: any) => {
                        onChange(selectedValue.value)
                      }}
                      isLoading={isPaymentTermsLoading}
                      isDisabled={isPaymentTermsLoading || isViewForm}
                      error={
                        errors?.paymentTermsId?.message
                          ? t(errors.paymentTermsId?.message)
                          : ""
                      }
                      isRequired
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="currencyId"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      label={t("form-currency")}
                      placeholder={t("form-select-currency")}
                      labelClassName="text-title"
                      showAddNewOption={true}
                      options={currencyOptions}
                      onChange={(option: any) => {
                        onChange(option?.value)
                        setCurrencyName(option?.label)
                      }}
                      value={FindSelectOption(currencyOptions, value)}
                      isLoading={isCurrenciesLoading}
                      isDisabled={isCurrenciesLoading || isViewForm}
                      styles={GetMenuListStyles(currencyOptions.length)}
                      error={
                        errors?.currencyId?.message
                          ? t(errors.currencyId?.message)
                          : ""
                      }
                      isRequired
                    />
                  )}
                />
              </FormGroup>
              {isViewForm && (
                <FormGroup
                  title={t("form-document")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  {initialData?.contractDocumentUrl === "" ? (
                    <Empty text="No Data" textClassName="mt-2" />
                  ) : (
                    <div className="col-span-full flex items-center justify-between rounded-lg">
                      <div className="flex items-center">
                        <PdfIcon className="mr-2 h-8 w-8" />
                        <span className="font-base text-gray-900 dark:text-gray-0">
                          {t("form-document")}
                        </span>
                      </div>
                      <Button variant="outline">
                        <Link
                          href={initialData?.contractDocumentUrl || ""}
                          download>
                          {t("form-download")}
                        </Link>
                      </Button>
                    </div>
                  )}
                </FormGroup>
              )}
              {!isViewForm && (
                <FormGroup
                  title={t("form-document")}
                  className="pt-7 @2xl:pt-10 @3xl:pt-11">
                  <FileUpload
                    accept="pdf"
                    multiple={false}
                    onUpload={handleFileUpload}
                    btnLabel="upload"
                    className="col-span-full w-full @2xl:p-0"
                  />
                </FormGroup>
              )}
              <FormGroup
                title={t("form-service-level-agreements")}
                className="pt-7 @2xl:pt-10 @3xl:pt-11"
                childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12">
                <AgreementListTable
                  data={serviceLevelAgreement}
                  onRowChange={handleServiceLevelAgreementChange}
                  onRowDelete={handleServiceLevelAgreementDelete}
                  onAddRow={handleServiceLevelAgreementAdd}
                  setValue={setValue}
                  isFieldDisabled={isViewForm}
                />
              </FormGroup>
            </FormGroupContainer>
            {!isViewForm && (
              <FormStickyActions
                isEditForm={isEditForm}
                isLoading={isCreateContractLoading}
                className="mt-7"
                backToListPath={routes.scm.procurement.suppliers.suppliers}
              />
            )}
          </>
        )}
      </Form>
    </Box>
  )
}