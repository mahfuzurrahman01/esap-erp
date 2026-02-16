"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Form } from "@core/ui/form"
import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"

import SendIcon from "@/components/icons/send-icon"
import { Button, Input, Textarea } from "@/components/ui"
import { routes } from "@/config/routes"
import { useSendSaudizationEmail } from "@/hooks/hrms/saudization/use-saudization"
import {
  SaudizationConfigurationFormInputType,
  SaudizationConfigurationSchema,
} from "@/validators/hrms/saudization-configuration.schema"

const defaultValues = {
  to: "",
  subject: "",
  body: "",
}

type Props =
  | {
      isEditForm?: false
      initialData?: undefined
    }
  | {
      isEditForm?: true
      initialData: SaudizationConfigurationFormInputType
    }

const SaudizationConfigurationForm = ({ initialData }: Props) => {
  const router = useRouter()
  const t = useTranslations("common")
  const tForm = useTranslations("form")
  const [reset] = useState(initialData)
  const {
    mutateAsync: sendSaudizationEmail,
    isPending: isSendSaudizationEmailPending,
    isSuccess: sendSaudizationEmailSuccess,
  } = useSendSaudizationEmail()

  const onSubmit: SubmitHandler<SaudizationConfigurationFormInputType> = async (
    data
  ) => {
    await sendSaudizationEmail(data)
  }
  const getErrorMessage = (data: string | undefined) => {
    if (!data) return ""
    return tForm(data)
  }

  useEffect(() => {
    if (sendSaudizationEmailSuccess) {
      router.push(routes.hr.saudization)
    }
  }, [sendSaudizationEmailSuccess, reset])

  return (
    <Form<SaudizationConfigurationFormInputType>
      validationSchema={SaudizationConfigurationSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: "onChange",
        defaultValues: defaultValues || {},
      }}
      className="flex grow flex-col justify-between">
      {({ register, formState: { errors } }) => (
        <>
          <div className="grow">
            <div className={cn("mb-5 grid gap-5 @3xl:grid-cols-12 md:mb-6")}>
              <div className="col-span-full @4xl:col-span-4">
                <h4 className="text-base font-medium md:text-xl md:font-bold">
                  {t("text-email-notification")}
                </h4>
              </div>
              <div className="col-span-full @container @4xl:col-span-8">
                <div className="flex flex-col gap-5">
                  <Input
                    label={tForm("form-email")}
                    placeholder={tForm("form-enter-email")}
                    {...register("to")}
                    error={getErrorMessage(errors.to?.message)}
                  />
                  <Input
                    label={tForm("form-subject")}
                    placeholder={tForm("form-enter-subject")}
                    {...register("subject")}
                    error={getErrorMessage(errors.subject?.message)}
                  />
                  {/* <Textarea
                    label={tForm("form-message")}
                    placeholder={tForm("form-enter-message")}
                    {...register("body")}
                    error={getErrorMessage(errors.body?.message)}
                  /> */}
                  <Textarea
                    label={tForm("form-description")}
                    placeholder={tForm("form-enter-description")}
                    {...register("body")}
                    error={errors?.body?.message && t(errors?.body?.message)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <Button
              type="submit"
              isLoading={isSendSaudizationEmailPending}
              className="flex h-9 items-center gap-2 px-3">
              {tForm("form-send")}
              <SendIcon className="h-6 w-6" />
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}

export default SaudizationConfigurationForm
