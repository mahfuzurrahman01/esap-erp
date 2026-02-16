"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { Input } from "@/components/ui"
import { messages } from "@/config/messages"
import { WarehouseManager } from "@/modules/scm/types/inventory/warehouse/warehouse-manager-types"
import { WarehouseManagerSchema } from "@/modules/scm/validators/inventory/warehouse-manager.schema"

import { useWarehouseManagerForm } from "./use-warehouse-manager-form"

type WarehouseManagerFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: WarehouseManager
} & (
  | { isEditForm: true; initialData: WarehouseManager }
  | { isEditForm?: false; initialData?: WarehouseManager }
)

const WarehouseManagerFormDrawerView = ({
  isEditForm = false,
  initialData,
}: WarehouseManagerFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { isLoading, onSubmit, handleCloseDrawer } = useWarehouseManagerForm(
    isEditForm,
    initialData?.id
  )

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t(messages.editWarehouseManager)
            : t(messages.addNewWarehouseManager)
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<WarehouseManager>
        validationSchema={WarehouseManagerSchema}
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
              <WarehouseManagerForm register={register} errors={errors} />
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

export const WarehouseManagerForm = ({ register, errors }: any) => {
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
        type="number"
        label={t("form-contact")}
        placeholder={t("form-contact")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("contact")}
        error={errors?.contact?.message ? t(errors?.contact?.message) : ""}
      />
    </div>
  )
}

export default WarehouseManagerFormDrawerView
