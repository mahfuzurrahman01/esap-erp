"use client"

import { Form } from "@core/ui/form"
import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"

import FormStickyActions from "@/components/base/form-sticky-actions"
import TabsNavigation from "@/components/base/tabs-navigation"
import Box from "@/components/ui/box"
import { useCreateSupplier } from "@/modules/scm/hooks/procurement/supplier/use-supplier"
import { SupplierCreateInput } from "@/modules/scm/types/procurement/supplier/supplier-types"
import { CreateSupplierSchema } from "@/modules/scm/validators/procurement/supplier.schema"

import { getDefaultSupplierInput } from "./form-utils"
import BasicInformationForm, {
  selectedCountryIdAtom,
  selectedCountryNameAtom,
} from "./step-form-one"
import FinancialInfoForm, {
  selectedBankCountryIdAtom,
  selectedBankCountryNameAtom,
  selectedBankCurrencyIdAtom,
  selectedBankCurrencyNameAtom,
} from "./step-form-three"
import ComplianceLegalInfoForm from "./step-form-two"

export default function CreateEditSupplier() {
  const t = useTranslations("form")

  const [selectedCountryName] = useAtom(selectedCountryNameAtom)
  const [selectedCountryId] = useAtom(selectedCountryIdAtom)
  const [selectedBankCountryName] = useAtom(selectedBankCountryNameAtom)
  const [selectedBankCountryId] = useAtom(selectedBankCountryIdAtom)
  const [selectedBankCurrencyName] = useAtom(selectedBankCurrencyNameAtom)
  const [selectedBankCurrencyId] = useAtom(selectedBankCurrencyIdAtom)

  const { mutateAsync: createSupplier, isPending: isSupplierLoading } =
    useCreateSupplier()

  const onSubmit: SubmitHandler<SupplierCreateInput> = async (data) => {
    const supplierCreateData: SupplierCreateInput = {
      ...data,
      countryName: selectedCountryName,
      countryId: selectedCountryId,

      SupplierLegalInformation: {
        ...data.SupplierLegalInformation,
      },
      SupplierBankAccountDetail: {
        ...data.SupplierBankAccountDetail,
        countryName: selectedBankCountryName,
        countryId: selectedBankCountryId,
        currencyName: selectedBankCurrencyName,
        currencyId: selectedBankCurrencyId,
      },
    }
    await createSupplier(supplierCreateData)
  }

  return (
    <Form<SupplierCreateInput>
      onSubmit={onSubmit}
      validationSchema={CreateSupplierSchema}
      useFormProps={{
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: getDefaultSupplierInput("create"),
      }}
      className="-mt-10 @container">
      {({ register, control, formState, setValue }) => {
        const tabs = [
          {
            label: t("form-basic-information"),
            content: (
              <BasicInformationForm
                formMethods={{ register, control, formState, setValue }}
              />
            ),
          },
          {
            label: t("form-compliance-legal-info"),
            content: (
              <ComplianceLegalInfoForm
                formMethods={{ register, control, formState, setValue }}
              />
            ),
          },
          {
            label: t("form-financial-info"),
            content: (
              <FinancialInfoForm
                formMethods={{ register, control, formState, setValue }}
              />
            ),
          },
        ]

        return (
          <>
            <Box>
              <TabsNavigation tabs={tabs} className="flex-grow" />
              <FormStickyActions
                className="mt-7"
                isLoading={isSupplierLoading}
              />
            </Box>
          </>
        )
      }}
    </Form>
  )
}
