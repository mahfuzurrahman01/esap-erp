"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { messages } from "@/config/messages"
import { SupplierCategory } from "@/modules/scm/types/procurement/supplier/supplier-category-types"
import { supplierCategorySchema } from "@/modules/scm/validators/procurement/supplier-category.schema"

import { useSupplierCategoryForm } from "./use-supplier-contracts-form"
import { Input } from "@/components/ui"

type SupplierCategoriesFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: SupplierCategory
} & (
  | { isEditForm: true; initialData: SupplierCategory }
  | { isEditForm?: false; initialData?: SupplierCategory }
)

const SupplierCategoriesFormDrawerView = ({
  isEditForm = false,
  initialData,
}: SupplierCategoriesFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { isLoading, onSubmit, handleCloseDrawer } = useSupplierCategoryForm(
    isEditForm,
    initialData?.id
  )

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t(messages.editSupplierCategory)
            : t(messages.addNewSupplierCategory)
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<SupplierCategory>
        validationSchema={supplierCategorySchema}
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
              <SupplierCategoryForm register={register} errors={errors} />
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

export const SupplierCategoryForm = ({ register, errors }: any) => {
  const t = useTranslations("form")
  return (
    <div className="flex flex-col gap-4 px-5 py-6">
      <Input
        type="text"
        isRequired
        label={t("form-name")}
        placeholder={t("form-name")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("name")}
        error={errors?.name?.message ? t(errors?.name?.message) : ""}
      />
      <Input
        type="text"
        isRequired
        label={t("form-industry-category-description")}
        placeholder={t("form-industry-category-description")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("description")}
        error={
          errors?.description?.message ? t(errors?.description?.message) : ""
        }
      />
    </div>
  )
}

export default SupplierCategoriesFormDrawerView
