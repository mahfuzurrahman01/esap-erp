"use client"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"

import FormStickyActions from "@/components/base/form-sticky-actions"
import TabsNavigation from "@/components/base/tabs-navigation"
import Box from "@/components/ui/box"
import {
  Supplier,
  SupplierUpdateInput,
} from "@/modules/scm/types/procurement/supplier/supplier-types"
import { UpdateSupplierSchema } from "@/modules/scm/validators/procurement/supplier.schema"

import BasicInformationForm from "./step-form-one"
import FinancialInfoForm from "./step-form-three"
import ComplianceLegalInfoForm from "./step-form-two"
import { useSupplierEditForm } from "./use-supplier-edit-form"

interface IndexProps {
  id?: number
  className?: string
  initialData?: Supplier
}

export default function EditSupplier({ initialData }: IndexProps) {
  const t = useTranslations("form")

  const { onSubmit, isLoading, getFormValues } = useSupplierEditForm({
    id: initialData?.id || 0,
    initialData: initialData,
    mode: "edit",
  })

  return (
    <Form<SupplierUpdateInput>
      onSubmit={onSubmit}
      validationSchema={UpdateSupplierSchema}
      useFormProps={{
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: getFormValues(),
        values: getFormValues(),
      }}
      className="-mt-10 @container">
      {({ register, control, formState, setValue, watch }) => {
        const tabs = [
          {
            label: t("form-basic-information"),
            content: (
              <BasicInformationForm
                supplier={initialData!}
                formMethods={{ register, control, formState, setValue }}
              />
            ),
          },
          {
            label: t("form-compliance-legal-info"),
            content: (
              <ComplianceLegalInfoForm
                supplier={initialData!}
                formMethods={{ register, control, formState, setValue, watch }}
              />
            ),
          },
          {
            label: t("form-financial-info"),
            content: (
              <FinancialInfoForm
                supplier={initialData!}
                formMethods={{ register, control, formState }}
              />
            ),
          },
        ]

        return (
          <Box>
            <TabsNavigation tabs={tabs} className="flex-grow" />
            <FormStickyActions className="mt-7" isLoading={isLoading} />
          </Box>
        )
      }}
    </Form>
  )
}
