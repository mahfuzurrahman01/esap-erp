"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { Input } from "@/components/ui"
import { messages } from "@/config/messages"
import { ProductCategory } from "@/modules/scm/types/inventory/products/product-category-types"
import { ProductCategorySchema } from "@/modules/scm/validators/inventory/product-category.schema"

import { useProductCategoryForm } from "./use-product-category-form"

type ProductCategoryFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: ProductCategory
} & (
  | { isEditForm: true; initialData: ProductCategory }
  | { isEditForm?: false; initialData?: ProductCategory }
)

const ProductCategoryFormDrawerView = ({
  isEditForm = false,
  initialData,
}: ProductCategoryFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { isLoading, onSubmit, handleCloseDrawer } = useProductCategoryForm(
    isEditForm,
    initialData?.id
  )

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t(messages.editProductCategory)
            : t(messages.addNewProductCategory)
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<ProductCategory>
        validationSchema={ProductCategorySchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          values: initialData,
          defaultValues: initialData,
        }}
        className="flex grow flex-col">
        {({ register, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <ProductCategoryForm register={register} errors={errors} />
            </SimpleBar>
            <DrawerFormActions
              handleCloseDrawer={handleCloseDrawer}
              isEditForm={isEditForm}
              isLoading={isLoading}
            />
          </>
        )}
      </Form>
    </div>
  )
}

export const ProductCategoryForm = ({ register, errors }: any) => {
  const t = useTranslations("form")
  return (
    <div className="flex flex-col gap-4 px-5 py-6">
      <Input
        type="text"
        label={t("form-name")}
        placeholder={t("form-name")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("name")}
        error={errors?.name?.message ? t(errors?.name?.message) : ""}
        isRequired
      />
      <Input
        type="text"
        label={t("form-description")}
        placeholder={t("form-description")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("description")}
        error={
          errors?.description?.message ? t(errors?.description?.message) : ""
        }
      />
      <Input
        type="text"
        label={t("form-remarks")}
        placeholder={t("form-remarks")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("remarks")}
        error={errors?.remarks?.message ? t(errors?.remarks?.message) : ""}
      />
    </div>
  )
}

export default ProductCategoryFormDrawerView
