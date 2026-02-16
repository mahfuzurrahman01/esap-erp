"use client"

import { useRouter } from "next/navigation"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"

import FormFooter from "@/components/base/form-footer"
import TabsNavigation from "@/components/base/tabs-navigation"
import Box from "@/components/ui/box"
import {
  useCompanyById,
  useCreateCompany,
  useUpdateCompany,
} from "@/modules/fms/hooks/use-company"
import { CompanyList, UpdateCompanyInput } from "@/modules/fms/types/company"
import {
  CompanyFormInput,
  companySchema,
} from "@/modules/fms/validators/company-schema"

import CompanyAccountForm from "./tabs/company-account-form"
import CompanyBuyingSellingForm from "./tabs/company-buying-selling-form"
import CompanyDetailsForm from "./tabs/company-details-form"
import CompanyStockManufacturingForm from "./tabs/company-stock-manufacturing-form"

export default function CompanyForm({
  id,
  mode = "create",
}: {
  id?: number
  mode?: "create" | "edit" | "view"
}) {
  const router = useRouter()
  const t = useTranslations("form")
  const { mutateAsync: createCompany, isPending: isCreating } =
    useCreateCompany()
  const { mutateAsync: updateCompany, isPending: isUpdating } =
    useUpdateCompany()
  const { data: companyById } = useCompanyById(id!)
  const isFieldDisabled = mode === "view"

  const onSubmit = async (formData: CompanyFormInput) => {
    const data = {
      ...formData,
      defaultDeferredRevenueAccountId:
        formData.defaultDeferredRevenueAccountId || undefined,
      defaultBankAccountId: formData.defaultBankAccountId || undefined,
      defaultPayableAccountId: formData.defaultPayableAccountId || undefined,
      defaultCashAccountId: formData.defaultCashAccountId || undefined,
      defaultCostOfGoodsSoldAccountId:
        formData.defaultCostOfGoodsSoldAccountId || undefined,
      defaultReceivableAccountId:
        formData.defaultReceivableAccountId || undefined,
      defaultIncomeAccountId: formData.defaultIncomeAccountId || undefined,
      defaultExpenseAccountId: formData.defaultExpenseAccountId || undefined,
      roundOffAccountId: formData.roundOffAccountId || undefined,
      roundOffCostCenterId: formData.roundOffCostCenterId || undefined,
      defaultDeferredExpenseAccountId:
        formData.defaultDeferredExpenseAccountId || undefined,
      writeOffAccount: formData.writeOffAccount || undefined,
      defaultPaymentDiscountAccountId:
        formData.defaultPaymentDiscountAccountId || undefined,
      exchangeGainLossAccountId:
        formData.exchangeGainLossAccountId || undefined,
      unrealizedGainLossAccountId:
        formData.unrealizedGainLossAccountId || undefined,
      defaultCostCenterId: formData.defaultCostCenterId || undefined,
      unrealizedProfitLossAccountId:
        formData.unrealizedProfitLossAccountId || undefined,
      accumulatedDepreciationAccount:
        formData.accumulatedDepreciationAccount || undefined,
      depreciationExpenseAccount:
        formData.depreciationExpenseAccount || undefined,
      gainLossAccountOnAssetsDisposal:
        formData.gainLossAccountOnAssetsDisposal || undefined,
      assetsDepreciationCostCenter:
        formData.assetsDepreciationCostCenter || undefined,
      capitalWorkInProgressAccount:
        formData.capitalWorkInProgressAccount || undefined,
      assetValuationAccount: formData.assetValuationAccount || undefined,
      assetsReceivedButNotBilledAccount:
        formData.assetsReceivedButNotBilledAccount || undefined,
      defaultFinanceBook: formData.defaultFinanceBook || undefined,
      totalMonthlySales: formData.totalMonthlySales || undefined,
      creditLimit: formData.creditLimit || undefined,
    }

    if (id) {
      // Cast the data to CompanyList type to avoid type errors
      // The form data structure doesn't exactly match the API's expected structure,
      // particularly for nested objects like country and currency
      await updateCompany({ ...data, id } as any)
    } else {
      await createCompany(data as any)
    }
  }

  // Default values for the form
  const defaultValues: Partial<CompanyFormInput> = {
    companyName: "",
    countryId: 0,
    dateOfEstablishment: "",
  }

  return (
    <Form<CompanyFormInput>
      validationSchema={companySchema}
      onSubmit={onSubmit}
      className="flex grow flex-col justify-between @container"
      useFormProps={{
        defaultValues: companyById as any || defaultValues,
        mode: "onChange",
        reValidateMode: "onChange",
        values: companyById as CompanyFormInput,
      }}>
      {({ register, control, formState, setValue }) => {
        const tabs = [
          {
            label: t("form-company-details"),
            content: (
              <CompanyDetailsForm
                companyById={companyById as any}
                formMethods={{ register, control, formState, setValue }}
                isFieldDisabled={isFieldDisabled}
              />
            ),
          },
          // {
          //   label: t("form-company-accounts"),
          //   content: (
          //     <CompanyAccountForm
          //       formMethods={{ register, control, formState }}
          //       isFieldDisabled={isFieldDisabled}
          //     />
          //   ),
          // },
          // {
          //   label: t("form-company-stock-manufacturing"),
          //   content: (
          //     <CompanyStockManufacturingForm
          //       formMethods={{ register, control, formState }}
          //       isFieldDisabled={isFieldDisabled}
          //     />
          //   ),
          // },
          // {
          //   label: t("form-company-buying-selling"),
          //   content: (
          //     <CompanyBuyingSellingForm
          //       formMethods={{ register, control, formState }}
          //       isFieldDisabled={isFieldDisabled}
          //     />
          //   ),
          // },
        ]

        return (
          <>
            <Box>
              <TabsNavigation tabs={tabs} className="flex-grow" />
              {mode !== "view" && (
                <FormFooter
                  isLoading={isCreating || isUpdating}
                  altBtnText={t("form-back")}
                  altBtnColor="black"
                  handleAltBtn={() => {
                    router.back()
                  }}
                  submitBtnText={
                    id ? t("form-update-company") : t("form-create-company")
                  }
                  className="border-gray-500/20 dark:bg-paper"
                />
              )}
            </Box>
          </>
        )
      }}
    </Form>
  )
}
