"use client"

import { useRouter } from "next/navigation"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { Controller, SubmitHandler } from "react-hook-form"

import FormFooter from "@/components/base/form-footer"
import FormGroupContainer from "@/components/base/form-group-container"
import { Input, Select } from "@/components/ui"
import Box from "@/components/ui/box"
import FormGroup from "@/modules/crm/components/base/form-group"
import {
  useCreateSetting,
  useUpdateSetting,
} from "@/modules/crm/hooks/use-email-setting"
import { EmailSettingEditFormTypes, SettingData, SettingEditFormTypes } from "@/modules/crm/types/setting"
import { emailSettingFormSchema } from "@/modules/crm/validators/email-setting-schema"
import { protocolOptions } from "@/data/crm/opportunities"

export default function EmailSettingForm({
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

  const onSubmit: SubmitHandler<SettingEditFormTypes> = async (data) => {
    const updatedData = {
      ...data,
    }
    await mutationFn.mutateAsync(id ? { id, data: updatedData } : updatedData)
  }
  return (
    <Box>
      <Form<EmailSettingEditFormTypes>
        onSubmit={onSubmit}
        validationSchema={emailSettingFormSchema}
        className="flex grow flex-col justify-between @container"
        useFormProps={{
          mode: "onChange",
          defaultValues: settingData,
        }}>
        {({ register, control, formState: { errors } }) => {
          // console.log("errors", errors)
          return (
            <>
              <FormGroupContainer className="pt-5" key="general-settings">
                <FormGroup title={t("form-information")}>
                  <Controller
                    name="protocol"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        label={t("form-protocol")}
                        isRequired
                        placeholder={t("form-protocol")}
                        isSearchable={true}
                        options={protocolOptions}
                        onChange={(selectedOption: any) =>
                          onChange(selectedOption?.value)
                        }
                        value={
                          protocolOptions?.find(
                            (option: any) => option.value === value
                          ) || null
                        }
                        error={
                          errors.protocol?.message && t("form-protocol-is-required")
                        }
                      />
                    )}
                  />

                  <Input
                    type="text"
                    label={t("form-encryption")}
                    isRequired
                    placeholder={t("form-encryption")}
                    {...register("encryption")}
                    error={
                      errors.encryption?.message &&
                      t("form-encryption-is-required")
                    }
                  />

                  <Input
                    type="email"
                    label={t("form-email")}
                    isRequired
                    placeholder={t("form-enter-email")}
                    {...register("email")}
                    error={
                      errors.email?.message &&
                      t("form-email-is-required")
                    }
                  />
                  
                  <Input
                    type="text"
                    label={t("form-charset")}
                    isRequired
                    placeholder={t("form-enter-charset")}
                    {...register("charset")}
                    error={
                      errors.charset?.message &&
                      t("form-charset-is-required")
                    }
                  />
                  
                  <Input
                    type="text"
                    label={t("form-host")}
                    isRequired
                    placeholder={t("form-enter-host")}
                    {...register("smtpHost")}
                    error={
                      errors.smtpHost?.message &&
                      t("form-host-is-required")
                    }
                  />
                  
                  <Input
                    type="text"
                    label={t("form-username")}
                    isRequired
                    placeholder={t("form-enter-username")}
                    {...register("smtpUsername")}
                    error={
                      errors.smtpUsername?.message &&
                      t("form-username-is-required")
                    }
                  />
                  
                  <Input
                    type="text"
                    label={t("form-password")}
                    isRequired
                    placeholder={t("form-enter-password")}
                    {...register("smtpPassword")}
                    error={
                      errors.smtpPassword?.message &&
                      t("form-password-is-required")
                    }
                  />
                  
                  <Input
                    type="text"
                    label={t("form-signature")}
                    placeholder={t("form-enter-signature")}
                    {...register("signature")}
                    error={
                      errors.signature?.message &&
                      t("form-signature-is-required")
                    }
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
