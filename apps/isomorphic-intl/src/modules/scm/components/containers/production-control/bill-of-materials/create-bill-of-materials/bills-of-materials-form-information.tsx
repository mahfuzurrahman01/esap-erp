"use client"

import { useEffect } from "react"

import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import { Input, Select } from "@/components/ui"
import { useSCMSharedDataHook } from "@/modules/scm/constants/shared-data-hooks"
import { companyNameTemplate } from "@/modules/scm/store/global-store-state"
import {
  BillOfMaterialItems,
  BillOfMaterials,
} from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-type"
import {
  FindSelectOption,
  GetMenuListStyles,
} from "@/modules/scm/utils/select-options"

import { currencyNameTemplate } from "../../../procurement/requisition/create-requisition"

interface BillsOfMaterialsFormInformationProps {
  isFieldDisabled?: boolean
  productItems: BillOfMaterialItems[]
  calculateMaterialCost: () => number
  formMethods: {
    register?: UseFormRegister<BillOfMaterials>
    control?: Control<BillOfMaterials>
    formState: FormState<BillOfMaterials>
    watch?: UseFormWatch<BillOfMaterials>
    setValue?: UseFormSetValue<BillOfMaterials>
  }
}

export default function BillsOfMaterialsFormInformation({
  isFieldDisabled,
  productItems,
  calculateMaterialCost,
  formMethods,
}: BillsOfMaterialsFormInformationProps) {
  const t = useTranslations("form")
  const [, setCurrencyName] = useAtom(currencyNameTemplate)
  const [, setCompanyName] = useAtom(companyNameTemplate)

  const { workCenter, currency, company } = useSCMSharedDataHook([
    "workCenter",
    "currency",
    "company",
  ])

  const { workCenterOptions, isWorkCenterLoading } = workCenter
  const { currencyOptions, isCurrencyLoading } = currency
  const { companyOptions, isCompanyLoading } = company

  const {
    control,
    formState: { errors },
    watch,
  } = formMethods

  // useEffect(() => {
  //   if (setValue) {
  //     setValue("materialCost", calculateMaterialCost())
  //   }
  // }, [productItems, setValue, calculateMaterialCost])

  return (
    <>
      <Controller
        control={control}
        name="workCenterId"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-work-center")}
            placeholder={t("form-work-center")}
            labelClassName="text-title"
            showAddNewOption={true}
            options={workCenterOptions}
            onChange={(option: any) => onChange(option?.value)}
            value={FindSelectOption(workCenterOptions, value)}
            isLoading={isWorkCenterLoading}
            isDisabled={isWorkCenterLoading || isFieldDisabled}
            error={
              errors.workCenterId?.message ? t(errors.workCenterId.message) : ""
            }
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(workCenterOptions.length)}
            isRequired
          />
        )}
      />
      <Controller
        control={control}
        name="companyId"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-company")}
            placeholder={t("form-company")}
            labelClassName="text-title"
            showAddNewOption={true}
            options={companyOptions}
            onChange={(option: any) => {
              onChange(option?.value)
              setCompanyName(option?.label)
            }}
            value={FindSelectOption(companyOptions, value)}
            isLoading={isCompanyLoading}
            isDisabled={isCompanyLoading || isFieldDisabled}
            error={errors.companyId?.message ? t(errors.companyId.message) : ""}
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(companyOptions.length)}
            isRequired
          />
        )}
      />
      <div>
        <Controller
          control={control}
          name="scheduledFrom"
          render={({ field: { value, onChange } }) => (
            <div className="relative">
              <label
                htmlFor="scheduledFrom"
                className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                {t("form-scheduled-from")}{" "}
                <span className="text-orange-500">*</span>
              </label>
              <DatePicker
                id="scheduledFrom"
                value={value ? new Date(value) : null}
                onChange={(date: any) =>
                  onChange(date ? date.toISOString() : "")
                }
                minDate={new Date()}
                placeholderText={t("form-select-date")}
                className="w-full"
                disabled={isFieldDisabled}
              />
            </div>
          )}
        />
        {errors.scheduledFrom && (
          <p className="text-sm text-red-500">
            {t(errors.scheduledFrom.message)}
          </p>
        )}
      </div>
      <div>
        <Controller
          control={control}
          name="scheduledTo"
          render={({ field: { value, onChange } }) => (
            <div className="relative">
              <label
                htmlFor="scheduledTo"
                className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                {t("form-scheduled-to")}{" "}
                <span className="text-orange-500">*</span>
              </label>
              <DatePicker
                id="scheduledTo"
                value={value ? new Date(value) : null}
                onChange={(date: any) =>
                  onChange(date ? date.toISOString() : "")
                }
                minDate={
                  watch?.("scheduledFrom")
                    ? new Date(watch("scheduledFrom") as string)
                    : new Date()
                }
                placeholderText={t("form-select-date")}
                className="w-full"
                disabled={isFieldDisabled}
              />
            </div>
          )}
        />
        {errors.scheduledTo && (
          <p className="text-sm text-red-500">
            {t(errors.scheduledTo.message)}
          </p>
        )}
      </div>
      <Controller
        control={control}
        name="currencyId"
        render={({ field: { onChange, value } }) => (
          <Select
            label={t("form-currency")}
            placeholder={t("form-currency")}
            labelClassName="text-title"
            options={currencyOptions}
            onChange={(option: any) => {
              onChange(option?.value)
              setCurrencyName(option?.label)
            }}
            value={FindSelectOption(currencyOptions, value)}
            isLoading={isCurrencyLoading}
            isDisabled={isCurrencyLoading || isFieldDisabled}
            error={
              errors.currencyId?.message ? t(errors.currencyId.message) : ""
            }
            menuPortalTarget={document.body}
            styles={GetMenuListStyles(currencyOptions.length)}
            isRequired
          />
        )}
      />
      {/* <Input
        type="number"
        placeholder="0.00"
        label={t("form-material-cost")}
        labelClassName="text-title"
        // {...register("materialCost", { valueAsNumber: true })}
        value={calculateMaterialCost()}
        readOnly
        disabled={isFieldDisabled}
        error={
          errors.materialCost?.message ? t(errors.materialCost.message) : ""
        }
      /> */}
    </>
  )
}
