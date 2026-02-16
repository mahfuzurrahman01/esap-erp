"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { Input } from "@/components/ui"
import { messages } from "@/config/messages"
import { ItemUnit } from "@/modules/scm/types/procurement/requisition/item-unit-types"
import { itemsSchema } from "@/modules/scm/validators/procurement/items.schem"

import { useItemsForm } from "./use-items-form"

type ItemsFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: ItemUnit
} & (
  | { isEditForm: true; initialData: ItemUnit }
  | { isEditForm?: false; initialData?: ItemUnit }
)

const ItemsFormDrawerView = ({
  isEditForm = false,
  initialData,
}: ItemsFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { isLoading, onSubmit, handleCloseDrawer } = useItemsForm(
    isEditForm,
    initialData?.id
  )

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={isEditForm ? t(messages.editItems) : t(messages.addNewItems)}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<ItemUnit>
        validationSchema={itemsSchema}
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
              <ItemsForm register={register} errors={errors} />
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

export const ItemsForm = ({ register, errors }: any) => {
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
        isRequired
        label={t("form-remarks")}
        placeholder={t("form-remarks")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("remarks")}
        error={errors?.remarks?.message ? t(errors?.remarks?.message) : ""}
      />
    </div>
  )
}

export default ItemsFormDrawerView
