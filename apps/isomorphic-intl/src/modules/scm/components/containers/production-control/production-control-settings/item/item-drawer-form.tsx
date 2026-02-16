"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { Input } from "@/components/ui"
import { messages } from "@/config/messages"
import { Item } from "@/modules/scm/types/production-control/bill-of-materials/items-types"
import { ItemSchema } from "@/modules/scm/validators/production-control/bill-of-materials/item.schema"

import { useItemForm } from "./use-item-form"

type ItemFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: Item
} & (
  | { isEditForm: true; initialData: Item }
  | { isEditForm?: false; initialData?: Item }
)

const ItemFormDrawerView = ({
  isEditForm = false,
  initialData,
}: ItemFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { isLoading, onSubmit, handleCloseDrawer } = useItemForm(
    isEditForm,
    initialData?.id
  )

  const defaultValues = {
    itemCode: "",
    itemName: "",
    description: "",
    unitPrice: 0,
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={isEditForm ? t(messages.editItem) : t(messages.addNewItem)}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<Item>
        validationSchema={ItemSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          reValidateMode: "onChange",
          values: initialData,
          defaultValues: initialData ? initialData : defaultValues,
        }}
        className="flex grow flex-col">
        {({ register, formState: { errors } }) => (
          <>
            <SimpleBar className="h-0 grow">
              <ItemForm register={register} errors={errors} />
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

export const ItemForm = ({ register, errors }: any) => {
  const t = useTranslations("form")
  return (
    <div className="flex flex-col gap-4 px-5 py-6">
      <Input
        type="text"
        isRequired
        label={t("form-item-code")}
        placeholder={t("form-item-code")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("itemCode")}
        error={errors?.itemCode?.message ? t(errors?.itemCode?.message) : ""}
      />
      <Input
        type="text"
        isRequired
        label={t("form-item-name")}
        placeholder={t("form-item-name")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("itemName")}
        error={errors?.itemName?.message ? t(errors?.itemName?.message) : ""}
      />
      <Input
        type="text"
        isRequired
        label={t("form-description")}
        placeholder={t("form-description")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("description")}
        error={
          errors?.description?.message ? t(errors?.description?.message) : ""
        }
      />
      <Input
        type="number"
        isRequired
        label={t("form-unit-price")}
        placeholder={t("form-unit-price")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("unitPrice", { valueAsNumber: true })}
        error={errors?.unitPrice?.message ? t(errors?.unitPrice?.message) : ""}
      />
    </div>
  )
}

export default ItemFormDrawerView
