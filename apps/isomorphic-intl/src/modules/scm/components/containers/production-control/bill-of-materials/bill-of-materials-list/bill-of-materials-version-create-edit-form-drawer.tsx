"use client"

import React from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"
import { Input } from "rizzui"
import SimpleBar from "simplebar-react"

import { DatePicker } from "@/components/base/date-picker"
import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import {
  useCreateBillOfMaterialsVersion,
  useUpdateBillOfMaterialsVersion,
} from "@/modules/scm/hooks/production-control/bill-of-materials/use-bill-of-materials-version"
import { BillOfMaterialsVersion } from "@/modules/scm/types/production-control/bill-of-materials/bill-of-materials-version-types"
import { BillOfMaterialsVersionSchema } from "@/modules/scm/validators/production-control/bill-of-materials/bill-of-materials-version.schema"

type IndexProps =
  | {
      initialData?: BillOfMaterialsVersion
      isEditForm?: true
    }
  | {
      initialData?: any
      isEditForm?: false
    }

export default function BillOfMaterialsVersionCreateEditFormDrawer({
  initialData,
  isEditForm,
}: IndexProps) {
  const { closeDrawer } = useDrawer()

  const {
    mutate: createBillOfMaterialsVersion,
    isPending: isCreateBillOfMaterialsVersionPending,
  } = useCreateBillOfMaterialsVersion()

  const {
    mutate: updateBillOfMaterialsVersion,
    isPending: isUpdateBillOfMaterialsVersionPending,
  } = useUpdateBillOfMaterialsVersion()

  const onSubmit: SubmitHandler<BillOfMaterialsVersion> = (data) => {
    if (isEditForm) {
      updateBillOfMaterialsVersion({
        data: {
          ...data,
          id: initialData?.id,
        },
      })
    } else {
      createBillOfMaterialsVersion({
        ...data,
        billOfMaterialId: initialData?.id,
      })
    }
  }
  const t = useTranslations("form")

  const defaultValues = {
    billOfMaterialId: initialData?.id,
    versionNumber: "",
    effectiveDate: "",
    versionDate: "",
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t("form-edit-bill-of-materials-version")
            : t("form-add-new-bill-of-materials-version")
        }
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <Form<BillOfMaterialsVersion>
        onSubmit={onSubmit}
        validationSchema={BillOfMaterialsVersionSchema}
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          values: initialData,
          defaultValues: defaultValues,
        }}
        className="flex grow flex-col">
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <SimpleBar className="h-full grow">
                <div className="flex flex-col gap-4 px-5 py-6">
                  <Input
                    labelClassName="bg-paper"
                    label={t("form-version-number")}
                    {...register("versionNumber")}
                    error={errors.versionNumber?.message}
                    className="col-span-2"
                  />
                  <div>
                    <Controller
                      control={control}
                      name="effectiveDate"
                      render={({ field: { value, onChange } }) => (
                        <div className="relative">
                          <label
                            htmlFor="effectiveDate"
                            className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                            {t("form-effective-date")}
                          </label>
                          <DatePicker
                            id="effectiveDate"
                            placeholderText={t("form-effective-date")}
                            value={value ? new Date(value) : null}
                            onChange={(date: any) =>
                              onChange(date ? date.toISOString() : "")
                            }
                            minDate={new Date()}
                            className="w-full"
                          />
                        </div>
                      )}
                    />
                    {errors.effectiveDate && (
                      <p className="text-sm text-red-500">
                        {errors.effectiveDate.message as string}
                      </p>
                    )}
                  </div>
                  <div>
                    <Controller
                      control={control}
                      name="versionDate"
                      render={({ field: { value, onChange } }) => (
                        <div className="relative">
                          <label
                            htmlFor="versionDate"
                            className="mb-2 block text-sm font-medium text-title transition-colors duration-200">
                            {t("form-version-date")}
                          </label>
                          <DatePicker
                            id="versionDate"
                            placeholderText={t("form-version-date")}
                            value={value ? new Date(value) : null}
                            onChange={(date: any) =>
                              onChange(date ? date.toISOString() : "")
                            }
                            minDate={new Date()}
                            className="w-full"
                          />
                        </div>
                      )}
                    />
                    {errors.versionDate && (
                      <p className="text-sm text-red-500">
                        {errors.versionDate.message as string}
                      </p>
                    )}
                  </div>
                </div>
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={closeDrawer}
                isEditForm={isEditForm}
                isLoading={
                  isCreateBillOfMaterialsVersionPending ||
                  isUpdateBillOfMaterialsVersionPending
                }
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}
