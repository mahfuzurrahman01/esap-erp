"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import { BsArrowLeft } from "react-icons/bs"
import { Button, Input, Loader } from "rizzui"
import * as z from "zod"

import { routes } from "@/config/routes"
import { Link } from "@/i18n/routing"
import { useForgotPassword } from "@/modules/crm/hooks"
import { ForgotPasswordPayload } from "@/types/auth"

const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
})

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>

const initialValues = {
  email: "",
}

export default function ForgetPasswordForm() {
  const router = useRouter()
  const t = useTranslations("form")
  const [reset, setReset] = useState(initialValues)
  const mutation = useForgotPassword(router)
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<ForgotPasswordPayload> = async (data) => {
    setLoading(true)
    try {
      await mutation.mutateAsync(data)
    } catch (err) {
      //console.log("err", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Form<ForgotPasswordSchemaType>
        validationSchema={ForgotPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          defaultValues: initialValues,
        }}>
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
            <Input
              type="email"
              size="lg"
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              autoComplete="off"
              {...register("email")}
              error={errors.email?.message}
              value={reset.email}
              onChange={(e) => setReset({ ...reset, email: e.target.value })}
            />
            <Button
              className="mt-2 w-full"
              type="submit"
              style={{ background: "#1C252E" }}
              size="lg"
              disabled={loading}>
              {loading ? (
                <Loader variant="spinner" className="mr-2" />
              ) : (
                "Send request"
              )}
            </Button>
          </div>
        )}
      </Form>
      <Link
        href={routes.auth.signIn}
        className="mt-5 flex items-center justify-center font-bold transition-colors text-title">
        <BsArrowLeft className="mr-2 text-xl" />
        {t("form-return-to-sign-in")}
      </Link>
    </>
  )
}
