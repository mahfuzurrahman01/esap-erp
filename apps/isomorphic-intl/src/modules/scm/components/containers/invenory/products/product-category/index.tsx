"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import { PiXBold } from "react-icons/pi"
import { ActionIcon, Title } from "rizzui"

import { useModal } from "@/components/base/modal-views/use-modal"
import { Button, Input } from "@/components/ui"
import { useCreateProductCategory } from "@/modules/scm/hooks/inventory/product/use-product-category"
import { ProductCategory } from "@/modules/scm/types/inventory/products/product-category-types"

export default function ProductCategoryForm() {
  const { closeModal } = useModal()

  const { mutateAsync: createProductCategory, isPending: isCreating } =
    useCreateProductCategory()

  const onSubmit: SubmitHandler<ProductCategory> = (data) => {
    createProductCategory(data)
    closeModal()
  }
  const t = useTranslations("form")

  return (
    <Form<ProductCategory>
      onSubmit={onSubmit}
      className="flex flex-grow flex-col gap-6 rounded-lg p-6 @container dark:bg-gray-800">
      {({ register, formState: { errors } }) => {
        return (
          <>
            <div className="flex items-center justify-between">
              <Title as="h4" className="font-semibold">
                {t("form-add-product-category")}
              </Title>
              <ActionIcon size="sm" variant="text" onClick={closeModal}>
                <PiXBold className="h-auto w-5" />
              </ActionIcon>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Input
                isRequired
                labelClassName="bg-paper"
                label={t("form-product-category-name")}
                {...register("name")}
                error={errors.name?.message ? t(errors.name?.message) : ""}
              />
              <Input
                labelClassName="bg-paper"
                label={t("form-product-category-remarks")}
                {...register("remarks")}
                error={
                  errors.remarks?.message
                    ? t(errors.remarks?.message)
                    : ""
                }
              />
              <Input
                labelClassName="bg-paper"
                label={t("form-product-category-description")}
                {...register("description")}
                error={
                  errors.description?.message
                    ? t(errors.description?.message)
                    : ""
                }
                className="col-span-2"
              />
            </div>
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
