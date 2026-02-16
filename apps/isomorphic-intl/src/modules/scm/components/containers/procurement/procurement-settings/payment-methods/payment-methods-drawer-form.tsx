"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { Input } from "@/components/ui"
import { messages } from "@/config/messages"
import { PaymentMethod } from "@/modules/scm/types/procurement/supplier/payment-method-types"
import { paymentMethodsSchema } from "@/modules/scm/validators/procurement/payment-methods.schema"

import { usePaymentMethodsForm } from "./use-payment-methods-form"

type PaymentMethodsFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: PaymentMethod
} & (
  | { isEditForm: true; initialData: PaymentMethod }
  | { isEditForm?: false; initialData?: PaymentMethod }
)

const PaymentMethodsFormDrawerView = ({
  isEditForm = false,
  initialData,
}: PaymentMethodsFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { isLoading, onSubmit, handleCloseDrawer } = usePaymentMethodsForm(
    isEditForm,
    initialData?.id
  )

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t(messages.editPaymentMethod)
            : t(messages.addNewPaymentMethod)
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<PaymentMethod>
        validationSchema={paymentMethodsSchema}
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
              <PaymentMethodsForm register={register} errors={errors} />
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

export const PaymentMethodsForm = ({ register, errors }: any) => {
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
    </div>
  )
}

export default PaymentMethodsFormDrawerView
