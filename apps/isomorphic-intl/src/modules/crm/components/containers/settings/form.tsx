"use client"

import { useRouter } from "next/navigation"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import FormFooter from "@/components/base/form-footer"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select, Textarea } from "@/components/ui"
import Box from "@/components/ui/box"
import { useSelectOptions } from "@/hooks/use-select-options"
import FormGroup from "@/modules/crm/components/base/form-group"
import {
  useCreateSetting,
  useUpdateSetting,
} from "@/modules/crm/hooks/use-setting"
import { SettingData, SettingEditFormTypes } from "@/modules/crm/types/setting"
import { settingFormSchema } from "@/modules/crm/validators/setting-schema"
import { useCurrencyList } from "@/modules/fms/hooks/use-currency"
import { CurrencyList } from "@/modules/fms/types"

export default function SettingForm({
  id,
  settingData,
}: {
  id?: string
  settingData?: SettingData
}) {
  const t = useTranslations("form")
  const router = useRouter()
  const createSetting = useCreateSetting()
  const updateSetting = useUpdateSetting()
  const mutationFn = id ? updateSetting : createSetting

  const { data: currencyList, isLoading: isCurrencyLoading } = useCurrencyList()
  const currencyOptions = useSelectOptions<CurrencyList>(
    currencyList?.data,
    "currencyName"
  )

  const onSubmit: SubmitHandler<SettingEditFormTypes> = async (data) => {
    const updatedData = {
      ...data,
      currency: String(data.currency),
    }
    await mutationFn.mutateAsync(id ? { id, data: updatedData } : updatedData)
  }
  return (
    <Box>
      <Form<SettingEditFormTypes>
        onSubmit={onSubmit}
        validationSchema={settingFormSchema}
        className="flex grow flex-col justify-between @container"
        useFormProps={{
          mode: "onChange",
          defaultValues: settingData,
        }}>
        {({ register, control, formState: { errors } }) => {
          console.log("errors", errors)
          return (
            <>
              <FormGroupContainer className="pt-5" key="general-settings">
                <FormGroup title="General Setting">
                  <Input
                    type="text"
                    label={t("form-application-name")}
                    isRequired
                    placeholder={t("form-application-name")}
                    {...register("appCompanyName")}
                    error={
                      errors.appCompanyName?.message &&
                      t("form-application-name-is-required")
                    }
                  />

                  <Input
                    type="text"
                    label={t("form-default-email")}
                    isRequired
                    placeholder={t("form-default-email")}
                    {...register("defaultEmail")}
                    error={
                      errors.defaultEmail?.message &&
                      t("form-default-email-is-required")
                    }
                  />

                  <Input
                    type="number"
                    label={t("form-mobile-no")}
                    placeholder={t("form-enter-mobile-no")}
                    {...register("mobile")}
                  />

                  <Controller
                    name="currency"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <div className="w-full">
                        <Select
                          label={t("form-default-currency")}
                          placeholder={
                            isCurrencyLoading
                              ? "Loading currencies..."
                              : t("form-select-currency")
                          }
                          labelClassName="text-title"
                          options={currencyOptions}
                          value={
                            currencyOptions.find(
                              (option: any) => option.value == value
                            ) || null
                          }
                          onChange={(selectedOption: any) =>
                            onChange(selectedOption.value)
                          }
                        />
                      </div>
                    )}
                  />

                  <Textarea
                    label={t("form-default-invoice-terms")}
                    placeholder={t("form-default-invoice-terms")}
                    {...register("defaultInvoiceTerms")}
                  />
                </FormGroup>
              </FormGroupContainer>
              <div className="border-t border-dashed border-gray-500/20"></div>
              <FormGroupContainer className="pt-5" key="address">
                <FormGroup title="Address">
                  <Input
                    type="text"
                    label={t("form-street")}
                    placeholder={t("form-enter-street")}
                    {...register("street")}
                  />
                  <Input
                    type="text"
                    label={t("form-house")}
                    placeholder={t("form-enter-house")}
                    {...register("house")}
                  />
                  <Input
                    type="text"
                    label={t("form-zip")}
                    placeholder={t("form-enter-zip")}
                    {...register("zip")}
                  />
                  <Input
                    type="text"
                    label={t("form-city")}
                    placeholder={t("form-enter-city")}
                    {...register("city")}
                  />
                  <Input
                    type="text"
                    label={t("form-state")}
                    placeholder={t("form-enter-state")}
                    {...register("state")}
                  />
                </FormGroup>
              </FormGroupContainer>
              <FormFooter
                isLoading={false}
                altBtnText={t("form-back")}
                handleAltBtn={() => {
                  router.back()
                }}
              />
            </>
          )
        }}
      </Form>
    </Box>
  )
}
