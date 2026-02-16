"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { Input } from "@/components/ui"
import { messages } from "@/config/messages"
import { Carrier } from "@/modules/scm/types/logistics-and-transport/carriers/carriers-types"
import { CarrierSchema } from "@/modules/scm/validators/logistic-and-transport/carrier.schema"

import { useCarriersForm } from "./use-carrier-form"

type CarriersFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: Carrier
} & (
  | { isEditForm: true; initialData: Carrier }
  | { isEditForm?: false; initialData?: Carrier }
)

const CarriersFormDrawerView = ({
  isEditForm = false,
  initialData,
}: CarriersFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { isLoading, onSubmit, handleCloseDrawer } = useCarriersForm(
    isEditForm,
    initialData?.id
  )

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm ? t(messages.editCarriers) : t(messages.addNewCarriers)
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<Carrier>
        validationSchema={CarrierSchema}
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
              <CarriersForm register={register} errors={errors} />
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

export const CarriersForm = ({ register, errors }: any) => {
  const t = useTranslations("form")
  return (
    <div className="flex flex-col gap-4 px-5 py-6">
      <Input
        type="text"
        label={t("form-carrier-name")}
        placeholder={t("form-carrier-name")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("carrierName")}
        error={
          errors?.carrierName?.message ? t(errors?.carrierName?.message) : ""
        }
        isRequired
      />
      <Input
        type="number"
        label={t("form-phone")}
        placeholder={t("form-phone")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("phone")}
        error={errors?.phone?.message ? t(errors?.phone?.message) : ""}
        isRequired
      />
      <Input
        type="email"
        label={t("form-email")}
        placeholder={t("form-email")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("email")}
        error={errors?.email?.message ? t(errors?.email?.message) : ""}
        isRequired
      />
      <Input
        type="text"
        label={t("form-address")}
        placeholder={t("form-address")}
        labelClassName="text-sm font-medium text-gray-900"
        {...register("address")}
        error={errors?.address?.message ? t(errors?.address?.message) : ""}
        isRequired
      />
    </div>
  )
}

export default CarriersFormDrawerView
