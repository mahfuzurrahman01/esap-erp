"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Form } from "@core/ui/form"
import { useAtom } from "jotai"
import { SubmitHandler } from "react-hook-form"
import { Button, Input, Loader, Password, PinCode } from "rizzui"
import * as z from "zod"

import { usePasswordReset } from "@/modules/crm/hooks/use-password-reset"
import { otpEmailAtom } from "@/utils/atoms/otp-email-atom"
import { useTranslations } from "next-intl"

const initialValues: ResetPasswordSchemaType = {
  newPassword: "",
  confirmPassword: "",
}

const ResetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
})

type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>

export default function OTPForm() {
  const t = useTranslations("form")
  const router = useRouter()
  const [otpEmail] = useAtom(otpEmailAtom)
  const [code, setCode] = useState<any>(undefined)
  const [loading, setLoading] = useState(false)
  const mutation = usePasswordReset(router)

  const onSubmit: SubmitHandler<ResetPasswordSchemaType> = async (data) => {
    setLoading(true)
    try {
      const payload = {
        email: otpEmail,
        resetCode: code,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }
      await mutation.mutateAsync(payload)
    } catch (error) {
      // Error handled by mutation
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Form<ResetPasswordSchemaType>
        validationSchema={ResetPasswordSchema}
        resetValues={initialValues}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          defaultValues: initialValues,
        }}>
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
            <Input
              type="email"
              readOnly
              size="lg"
              label={t("form-email")}
              labelClassName="text-title"
              value={otpEmail || ""}
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
            />

            <div className="flex w-full items-center justify-between">
              <label className="text-sm font-medium text-title">Code</label>
            </div>
            <PinCode
              variant="outline"
              setValue={setCode}
              size="md"
              length={6}
              className="lg:justify-start"
            />

            <Password
              size="lg"
              placeholder={t("form-enter-new-password")}
              label={t("form-new-password")}
              labelClassName="text-title"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("newPassword")}
              error={errors.newPassword?.message}
            />

            <Password
              size="lg"
              placeholder={t("form-confirm-new-password")}
              label={t("form-confirm-password")}
              labelClassName="text-title"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            <Button
              className="mt-2 w-full"
              type="submit"
              size="lg"
              style={{ background: "#1C252E" }}
              disabled={loading}>
              {loading ? (
                <Loader variant="spinner" className="mr-2" />
              ) : (
                t("form-send-request")
              )}
            </Button>
          </div>
        )}
      </Form>
    </>
  )
}
