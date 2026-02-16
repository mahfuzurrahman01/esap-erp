"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import { DatePicker } from "@/components/base/date-picker"
import FormStickyActions from "@/components/base/form-sticky-actions"
import SectionGroup from "@/components/base/section-group"
import { routes } from "@/config/routes"
import {
  useCreateContractRenewal,
  useUpdateContractRenewal,
} from "@/modules/scm/hooks/procurement/supplier/use-contract-renewal"
import { ContractRenewal } from "@/modules/scm/types/procurement/supplier/contract-renewal-types"
import {
  contractRenewalSchema,
  updateContractRenewalSchema,
} from "@/modules/scm/validators/procurement/contract-renewal.schema"

type IndexProps =
  | {
    supplierId?: number
    initialData?: ContractRenewal
    isEditForm?: true
  }
  | {
    supplierId?: number
    initialData?: any
    isEditForm?: false
  }

export default function ContractRenewalsForm({
  initialData,
  isEditForm,
}: IndexProps) {
  const t = useTranslations("form")

  const {
    mutateAsync: createContractRenewal,
    isPending: isCreateContractRenewalPending,
  } = useCreateContractRenewal()

  const {
    mutateAsync: updateContractRenewal,
    isPending: isUpdateContractRenewalPending,
  } = useUpdateContractRenewal()

  const onSubmit: SubmitHandler<ContractRenewal> = async (data) => {
    const formData = {
      ...data,
      supplierContractInfoId: Number(initialData?.id) || 0,
      status: true,
    }

    if (isEditForm) {
      await updateContractRenewal({
        data: {
          ...formData,
          id: initialData?.id,
        },
      })
    } else {
      await createContractRenewal(formData)
    }
  }

  console.log(initialData)

  const defaultContractRenewalInfo: ContractRenewal = {
    supplierContractInfoId: 0,
    startDate: initialData?.endDate,
    endDate: "",
    status: true,
  }

  return (
    <Form<ContractRenewal>
      onSubmit={onSubmit}
      validationSchema={
        isEditForm ? updateContractRenewalSchema : contractRenewalSchema
      }
      className="card-shadow border-none bg-gray-0 @container dark:bg-gray-800"
      useFormProps={{
        mode: "onChange",
        defaultValues: defaultContractRenewalInfo,
        values: defaultContractRenewalInfo,
      }}>
      {({ control, formState: { errors }, watch }) => (
        <>
          <div className="grid gap-7 @2xl:pt-9 @3xl:pt-11">
            <SectionGroup title={t("form-contract-renewal-information")}>
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
            </SectionGroup>
          </div>
          <FormStickyActions
            isEditForm={isEditForm}
            isLoading={
              isCreateContractRenewalPending || isUpdateContractRenewalPending
            }
            className="mt-7"
            backToListPath={routes.scm.procurement.suppliers.suppliers}
          />
        </>
      )}
    </Form>
  )
}
