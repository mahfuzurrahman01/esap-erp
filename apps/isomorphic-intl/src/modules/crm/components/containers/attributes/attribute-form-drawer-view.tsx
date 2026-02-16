"use client"

import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import { PiPlusBold } from "react-icons/pi"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { Button, Input } from "@/components/ui"
import SkeletonLoader from "@/components/base/skeleton-loader"
import {
  useAttributeById,
  useCreateAttribute,
  useUpdateAttribute,
} from "@/modules/crm/hooks/use-attribute"
import {
  Attribute,
  AttributeEditFormTypes,
} from "@/modules/crm/types/attribute"
import { attributeFormSchema } from "@/modules/crm/validators/attribute-schema"

import AttributeDetailsView from "./details"
import TrashIcon from "@/components/icons/trash"

export default function AttributeFormDrawerView({
  id,
  view = false,
}: {
  id?: string
  view?: boolean
}) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("form")
  const { data: dataById, isLoading } = useAttributeById(id) as {
    data: Attribute | undefined
    isLoading: boolean
  }

  const createAttribute = useCreateAttribute()
  const updateAttribute = useUpdateAttribute()
  const mutationFn = id ? updateAttribute : createAttribute

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const [attributeValues, setAttributeValues] = useState<string[]>(
    dataById?.values || [""]
  )

  useEffect(() => {
    if (dataById?.attributeValues) {
      setAttributeValues(
        dataById.attributeValues.map((attr: any) => attr.value)
      )
    }
  }, [dataById])

  const handleAddValue = () => {
    setAttributeValues([...attributeValues, ""])
  }

  const handleRemoveValue = (index: number) => {
    const updatedValues = attributeValues.filter((_, i) => i !== index)
    setAttributeValues(updatedValues)
  }

  const handleChangeValue = (index: number, value: string) => {
    const updatedValues = [...attributeValues]
    updatedValues[index] = value
    setAttributeValues(updatedValues)
  }

  const onSubmit: SubmitHandler<AttributeEditFormTypes> = async (data: any) => {
    const transformedValues = attributeValues.map((value) => ({
      value,
    }))

    const payload = id
      ? {
          data: { ...data, attributeValue: transformedValues },
          id,
        }
      : { ...data, attributeValue: transformedValues }

    await mutationFn.mutateAsync(payload, {
      onSuccess: () => {
        handleCloseDrawer()
      },
    })
  }

  const defaultValues: AttributeEditFormTypes = {
    id: "",
    name: dataById?.name || "",
    ...dataById,
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl p-4">
        <SkeletonLoader />
      </div>
    )
  }

  if (view) {
    return (
      <AttributeDetailsView dataById={dataById} onClose={handleCloseDrawer} />
    )
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={id ? t("form-edit-attribute") : t("form-add-new-attribute")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<AttributeEditFormTypes>
        onSubmit={onSubmit}
        validationSchema={attributeFormSchema}
        useFormProps={{
          defaultValues,
          mode: "onChange",
          values: { ...dataById, values: attributeValues },
        }}
        className="flex grow flex-col">
        {({ register, formState: { errors } }) => {
          return (
            <>
              <SimpleBar className="h-full grow">
                <div className="flex flex-col gap-4 px-8 py-6">
                  <Input
                    type="text"
                    label={t("form-attribute-name")}
                    isRequired
                    placeholder={t("form-enter-attribute-name")}
                    autoComplete="off"
                    {...register("name", { required: true })}
                    error={errors.name?.message && t("form-attribute-name-is-required")}
                  />

                  <div>
                    <label className="block text-sm font-medium text-title">
                      {t("form-attribute-values")}
                    </label>
                    <div className="mt-2 space-y-2">
                      {attributeValues.map((value, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            type="text"
                            placeholder={`${t("form-enter-attribute-value")} ${index + 1}`}
                            value={value}
                            onChange={(e) =>
                              handleChangeValue(index, e.target.value)
                            }
                            className="flex-1"
                            error={errors.attributeValue?.message}
                          />
                          <Button
                            as="span"
                            className="flex cursor-pointer items-center justify-center border border-red bg-transparent text-center text-red hover:bg-red-dark hover:text-gray-0 @lg:w-auto"
                            onClick={() => handleRemoveValue(index)}>
                            <TrashIcon className="h-[17px] w-[17px]" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      as="span"
                      className="mt-5 cursor-pointer border border-body/20 bg-transparent text-gray-600 hover:bg-transparent"
                      onClick={handleAddValue}>
                      <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
                      {t("form-add-value")}
                    </Button>
                  </div>
                </div>
              </SimpleBar>
              <DrawerFormActions
                handleCloseDrawer={handleCloseDrawer}
                isLoading={mutationFn.isPending}
                isEditForm={!!id}
              />
            </>
          )
        }}
      </Form>
    </div>
  )
}
