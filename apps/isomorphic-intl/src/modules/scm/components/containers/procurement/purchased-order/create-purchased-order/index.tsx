"use client";

import { Form } from "@core/ui/form";
import { useTranslations } from "next-intl";



import FormStickyActions from "@/components/base/form-sticky-actions";
import TabsNavigation from "@/components/base/tabs-navigation";
import Box from "@/components/ui/box";
import { routes } from "@/config/routes";
import { PurchasedOrder, PurchasedOrderUpdate } from "@/modules/scm/types/procurement/purchased-order/purchased-order-types";
import { PurchasedOrderInput } from "@/modules/scm/types/procurement/purchased-order/purchased-order-types";
import { CreatePurchaseOrderSchema, UpdatePurchaseOrderSchema } from "@/modules/scm/validators/procurement/create-po-schema";



import AddressAndContactForm from "./form-tabs/address-and-contact-form";
import DetailsForm from "./form-tabs/details-form";
import OthersForm from "./form-tabs/others-form";
import TermsForm from "./form-tabs/terms-form";
import { usePurchasedOrderForm } from "./use-purchased-order-form";


type IndexProps =
  | {
      initialData?: PurchasedOrder
      isViewForm?: false
      isEditForm?: true
    }
  | {
      initialData?: any
      isEditForm?: false
      isViewForm?: false
    }
  | {
      initialData?: PurchasedOrder
      isEditForm?: false
      isViewForm?: true
    }

export default function CreateEditPurchasedOrder({
  initialData,
  isEditForm,
  isViewForm,
}: IndexProps) {
  const t = useTranslations("form")

  const { getFormValues, onSubmit, isLoading } = usePurchasedOrderForm({
    id: initialData?.id || 0,
    mode: isEditForm ? "edit" : "create",
  })

  

  return (
    <Form<PurchasedOrderInput | PurchasedOrderUpdate>
      onSubmit={onSubmit}
      validationSchema={isEditForm ? UpdatePurchaseOrderSchema : CreatePurchaseOrderSchema}
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
            label: t("form-address-and-contact"),
            content: (
              <AddressAndContactForm
                formMethods={{ register, control, setValue, formState, watch }}
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
                routes.scm.procurement.purchaseOrders.purchaseOrders
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