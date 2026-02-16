"use client"

import { useState } from "react"

import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import { Loader, Text } from "rizzui"

import { Button, Input, Password } from "@/components/ui"
import { useRegister } from "@/hooks/auth/use-auth"
import { SignUpSchema, signUpSchema } from "@/validators/signup.schema"

const initialValues: SignUpSchema = {
  fullName: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export default function SignUpForm() {
  const [reset] = useState({})
  const { mutate: register, isPending } = useRegister()
  const t = useTranslations("auth")

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    register({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      confirmPassword: data.confirmPassword,
    })
  }

  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: "onChange",
          defaultValues: initialValues,
        }}>
        {({ register, formState: { errors } }) => (
          <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
            <Input
              type="text"
              size="lg"
              label={t("auth-full-name")}
              autoComplete="off"
              placeholder={t("auth-enter-your-full-name")}
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("fullName", { required: "Full name is required" })}
              error={errors.fullName?.message}
            />
            <Input
              type="number"
              size="lg"
              label={t("auth-mobile-no")}
              autoComplete="off"
              placeholder={t("auth-enter-your-mobile-no")}
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("phoneNumber", {
                required: "Mobile number is required",
              })}
              error={errors.phoneNumber?.message}
            />
            <Input
              type="email"
              size="lg"
              label={t("auth-email")}
              autoComplete="off"
              className="col-span-2 [&>label>span]:font-medium"
              inputClassName="text-sm"
              placeholder={t("auth-enter-your-email")}
              {...register("email", { required: "Email is required" })}
              error={errors.email?.message}
            />
            <Password
              label={t("auth-password")}
              placeholder={t("auth-enter-your-password")}
              size="lg"
              autoComplete="off"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message}
            />
            <Password
              label={t("auth-confirm-password")}
              placeholder={t("auth-enter-confirm-password")}
              size="lg"
              autoComplete="off"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register("confirmPassword", {
                required: "Confirm your password",
              })}
              error={errors.confirmPassword?.message}
            />
            <Button
              size="lg"
              type="submit"
              className="col-span-2 mt-2"
              disabled={isPending}>
              {isPending ? (
                <Loader variant="spinner" className="mr-2" />
              ) : (
                <span>{t("auth-create-account")}</span>
              )}
            </Button>
            <Text style={{ fontSize: "12px", width: "max-content" }}>
              {t(
                "auth-by-signing-up-i-agree-to-terms-of-use-and-privacy-policy"
              )}
            </Text>
          </div>
        )}
      </Form>
    </>
  )
}
