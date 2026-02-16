"use client"

import { Form } from "@core/ui/form"
import SimpleBar from "@core/ui/simplebar"
import { useTranslations } from "next-intl"

import DrawerFormActions from "@/components/base/drawer-form-actions"
import DrawerHeader from "@/components/base/drawer-header"
import { Input } from "@/components/ui"
import { messages } from "@/config/messages"
import { PaymentTerms } from "@/modules/scm/types/procurement/supplier/payment-terms-types"
import { paymentTermsSchema } from "@/modules/scm/validators/procurement/payment-terms.schema"

import { usePaymentTermsForm } from "./use-payment-terms-form"

type PaymentTermsFormDrawerViewProps = {
  isEditForm?: boolean
  initialData?: PaymentTerms
} & (
  | { isEditForm: true; initialData: PaymentTerms }
  | { isEditForm?: false; initialData?: PaymentTerms }
)

const PaymentTermsFormDrawerView = ({
  isEditForm = false,
  initialData,
}: PaymentTermsFormDrawerViewProps) => {
  const t = useTranslations("form")

  const { isLoading, onSubmit, handleCloseDrawer } = usePaymentTermsForm(
    isEditForm,
    initialData?.id
  )

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={
          isEditForm
            ? t(messages.editPaymentTerms)
            : t(messages.addNewPaymentTerms)
        }
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <Form<PaymentTerms>
        validationSchema={paymentTermsSchema}
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
              <PaymentTermsForm register={register} errors={errors} />
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

export const PaymentTermsForm = ({ register, errors }: any) => {
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

export default PaymentTermsFormDrawerView
