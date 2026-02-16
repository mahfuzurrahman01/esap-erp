import { useEffect } from "react"

import { useTranslations } from "next-intl"
import { Controller } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormGroup from "@/components/base/form-group"
import { Input, Select, Textarea } from "@/components/ui"
import UploadZone from "@/components/ui/crm/upload-zone"
import { typeOptions } from "@/data/crm/campaign"
import { useSelectOptions } from "@/hooks/use-select-options"
import { useCompanyList } from "@/modules/fms/hooks/use-company"
import { CompanyList } from "@/modules/fms/types"

export function InformationFields({
  register,
  control,
  errors,
  setFile,
  setValue,
  file,
  watch,
}: any) {
  const t = useTranslations("form")
  const { data: companies } = useCompanyList({pageSize:100})
  const companyOptions = useSelectOptions<CompanyList>(
    companies?.data,
    "companyName"
  )

  const startDate = watch("startDate")
  const endDate = watch("endDate")

  useEffect(() => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setValue("endDate", "")
    }
  }, [startDate, endDate, setValue])

  return (
    <>
      <FormGroup
        title={t("form-information")}
        className="grid-cols-12 pt-7 @2xl:pt-10 @3xl:pt-11">
        <Input
          type="text"
          label={t("form-subject")}
          isRequired
          placeholder="Subject"
          {...register("subject", { required: true })}
          error={errors.subject?.message && t("form-subject-is-required")}
        />

        <Controller
          name="company"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              isSearchable={true}
              label={t("form-company")}
              isRequired
              options={companyOptions}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.label)
              }
              value={
                companyOptions.find((option: any) => option.label === value) ||
                null
              }
              error={errors.company?.message && t("form-company-is-required")}
            />
          )}
        />

        <Controller
          name="startDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="relative">
              <label
                htmlFor="startDate"
                className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                {t("form-start-date")}
              </label>
              <DatePicker
                id="startDate"
                autoComplete="off"
                value={value ? new Date(value) : null}
                onChange={(date: any) =>
                  onChange(date ? date.toISOString() : "")
                }
                placeholderText={t("form-select-date")}
                className="w-full"
              />
            </div>
          )}
        />

        <Controller
          name="endDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="relative">
              <label
                htmlFor="endDate"
                className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                {t("form-end-date")}
              </label>
              <DatePicker
                id="endDate"
                autoComplete="off"
                value={value ? new Date(value) : null}
                onChange={(date: any) =>
                  onChange(date ? date.toISOString() : "")
                }
                placeholderText={t("form-select-date")}
                className="w-full"
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          )}
        />

        <Input
          type="text"
          isRequired
          label="Service"
          placeholder="Service"
          inputClassName="border-gray-500/20 ring-0"
          {...register("service", { required: true })}
          error={errors.service?.message && t("form-service-is-required")}
        />

        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              isSearchable={true}
              label={t("form-type")}
              isRequired
              options={typeOptions}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                typeOptions.find((option: any) => option.value === value) ||
                null
              }
              error={errors.type?.message && t("form-type-is-required")}
            />
          )}
        />

        <Input
          type="text"
          isRequired
          autoComplete="off"
          label="Source"
          placeholder="Source"
          inputClassName="border-gray-500/20 ring-0"
          {...register("source", { required: true })}
          error={errors.source?.message && t("form-source-is-required")}
        />

        <Input
          type="text"
          label="Budget Cost"
          placeholder="Budget Cost"
          {...register("budgetedCost")}
          error={
            errors.budgetedCost?.message && t("form-budget-cost-is-required")
          }
        />

        <Input
          type="text"
          autoComplete="off"
          label={t("form-primary-contact")}
          isRequired
          placeholder={t("form-primary-contact")}
          inputClassName="border-gray-500/20 ring-0"
          {...register("primaryContact")}
          error={
            errors.primaryContact?.message &&
            t("form-primary-contact-is-required")
          }
        />

        <Controller
          name="status"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              isSearchable={true}
              label={t("form-status")}
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
              onChange={(selectedOption: any) =>
                onChange(selectedOption?.value)
              }
              value={
                [
                  { label: "Active", value: "Active" },
                  { label: "Inactive", value: "Inactive" },
                ].find((option: any) => option.value === value) || null
              }
              error={errors?.status?.message}
            />
          )}
        />

        <Textarea
          label={t("form-description")}
          labelClassName="text-title"
          placeholder={t("form-enter-description")}
          {...register("description")}
        />

        <Controller
          name="attachment"
          control={control}
          render={() => (
            <div className="grid gap-5 @3xl:grid-cols-1 lg:col-span-2">
              <label
                htmlFor="attachment"
                className="block text-sm font-medium text-gray-700 dark:text-white">
                {t("form-attachment")}
              </label>
              <UploadZone
                multiple={false}
                btnLabel="upload"
                className="col-span-full w-full @2xl:p-0"
                file={file}
                setFile={setFile}
              />
            </div>
          )}
        />
      </FormGroup>
    </>
  )
}
