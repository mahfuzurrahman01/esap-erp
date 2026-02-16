"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"

import FormStickyActions from "@/components/base/form-sticky-actions"
import TabsNavigation from "@/components/base/tabs-navigation"
import Box from "@/components/ui/box"
import { routes } from "@/config/routes"
import {
  Invoice,
  InvoiceInput,
  InvoiceUpdate,
} from "@/modules/scm/types/procurement/invoice/invoice-types"
import {
  CreateInvoiceSchema,
  UpdateInvoiceSchema,
} from "@/modules/scm/validators/procurement/create-invoice-schema"

import AddressAndContactForm from "./form-tabs/address-and-contact-form"
import DetailsForm from "./form-tabs/details-form"
import OthersForm from "./form-tabs/others-form"
import PaymentsForm from "./form-tabs/payments-form"
import TermsForm from "./form-tabs/terms-form"
import { useInvoiceBillsForm } from "./use-invoice-bills-form"



type IndexProps =
  | {
      initialData?: Invoice
      isViewForm?: false
      isEditForm?: true
    }
  | {
      initialData?: any
      isEditForm?: false
      isViewForm?: false
    }
  | {
      initialData?: Invoice
      isEditForm?: false
      isViewForm?: true
    }

export default function CreateEditInvoiceBills({
  initialData,
  isEditForm,
  isViewForm,
}: IndexProps) {
  const t = useTranslations("form")

  const { getFormValues, onSubmit, isLoading } = useInvoiceBillsForm({
    id: initialData?.id || 0,
    mode: isEditForm ? "edit" : "create",
  })


  return (
    <Form<InvoiceInput | InvoiceUpdate>
      onSubmit={onSubmit}
      validationSchema={isEditForm ? UpdateInvoiceSchema : CreateInvoiceSchema}
      useFormProps={{
        defaultValues: getFormValues(),
        mode: "onChange",
        reValidateMode: "onChange",
        values: getFormValues(),
      }}
      className="-mt-10 @container">
      {({ register, control, formState, setValue, watch, getValues }) => {
        const tabs = [
          {
            label: t("form-details"),
            content: (
              <DetailsForm
                formMethods={{ register, control, setValue, formState, watch, getValues }}
                isEditForm={isEditForm}
                initialData={initialData}
                isFieldDisabled={isViewForm}
              />
            ),
          },
          {
            label: t("form-payments"),
            content: (
              <PaymentsForm
                formMethods={{ register, control, setValue, formState }}
                isEditForm={isEditForm}
                initialData={initialData}
                isFieldDisabled={isViewForm}
              />
            ),
          },
          {
            label: t("form-address-and-contact"),
            content: (
              <AddressAndContactForm
                formMethods={{ register, control, setValue, formState }}
                isEditForm={isEditForm}
                initialData={initialData}
                isFieldDisabled={isViewForm}
              />
            ),
          },
          {
            label: t("form-terms"),
            content: (
              <TermsForm
                formMethods={{ register, control, setValue, formState }}
                isEditForm={isEditForm}
                initialData={initialData}
                isFieldDisabled={isViewForm}
              />
            ),
          },
          {
            label: t("form-others"),
            content: (
              <OthersForm
                formMethods={{ register, control, setValue, formState }}
                isEditForm={isEditForm}
                initialData={initialData}
                isFieldDisabled={isViewForm}
              />
            ),
          },
        ]
        return (
          <Box>
            <TabsNavigation tabs={tabs} className="flex-grow" />
            {!isViewForm && (
              <FormStickyActions
                className="mt-7"
                backToListPath={
                  routes.scm.procurement.invoiceBills.invoiceBills
                }
                isLoading={isLoading}
              />
            )}
          </Box>
        )
      }}
    </Form>
  )
}
