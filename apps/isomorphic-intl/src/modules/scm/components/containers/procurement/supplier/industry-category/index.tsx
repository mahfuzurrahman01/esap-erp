"use client"

import React from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import { PiXBold } from "react-icons/pi"
import { ActionIcon, Title } from "rizzui"

import { useModal } from "@/components/base/modal-views/use-modal"
import { Button, Input } from "@/components/ui"
import { useCreateSupplierCategory } from "@/modules/scm/hooks/procurement/supplier/use-supplier-category"
import {
  SupplierCategorySchemaInput,
  supplierCategorySchema,
} from "@/modules/scm/validators/procurement/supplier-category.schema"

export default function IndustryCategoryForm() {
  const { closeModal } = useModal()
  const { mutateAsync: createSupplierCategory, isPending: isCreating } =
    useCreateSupplierCategory()

  const onSubmit: SubmitHandler<SupplierCategorySchemaInput> = (data) => {
    createSupplierCategory({
      ...data,
      description: data.description || "",
      status: true,
    })
    closeModal()
  }
  const t = useTranslations("form")
  return (
    <Form<SupplierCategorySchemaInput>
      onSubmit={onSubmit}
      validationSchema={supplierCategorySchema}
      className="flex flex-grow flex-col gap-6 rounded-lg p-6 @container dark:bg-gray-800">
      {({ register, formState: { errors } }) => {
        return (
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t("form-create-industry-category")}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <Input
              labelClassName="bg-paper"
              label={t("form-industry-category-name")}
              {...register("name")}
              error={
                errors.name?.message ? t(errors.name?.message) : ""
              }
            />
            <Input
              labelClassName="bg-paper"
              label={t("form-industry-category-description")}
              {...register("description")}
              error={
                errors.description?.message
                  ? t(errors.description?.message)
                  : ""
              }
            />

            <div className="flex items-center justify-end gap-4">
              <Button
                onClick={closeModal}
                variant="outline"
                color="danger"
                className="cursor-pointer"
                as="span">
                {t("form-cancel")}
              </Button>
              <Button type="submit" isLoading={isCreating}>
                {t("form-create")}
              </Button>
            </div>
          </>
        )
      }}
    </Form>
  )
}
