"use client"

import { useEffect, useState } from "react"

import EyeIcon from "@core/components/icons/eye"
import { Form } from "@core/ui/form"
import { useTranslations } from "next-intl"
import { SubmitHandler } from "react-hook-form"
import toast from "react-hot-toast"
import { AiFillEyeInvisible } from "react-icons/ai"
import { Loader, PinCode } from "rizzui"

import { Button, Input, Password } from "@/components/ui"
import { routes } from "@/config/routes"
import { useLogin } from "@/hooks/auth/use-auth"
import { Link } from "@/i18n/routing"
import { LoginSchema, loginSchema } from "@/validators/login.schema"
import { useSearchParams } from "next/navigation"

const initialValues: LoginSchema = {
  email: "",
  password: "",
  rememberMe: false,
}

export default function SignInForm() {
  const [reset] = useState({})
  const [code, setCode] = useState<string | number | undefined>(undefined)
  const [twoFaEnabled, setTwoFaEnabled] = useState(false)
  const { mutateAsync: login, isPending } = useLogin()
  const t = useTranslations("auth")

  const searchParams = useSearchParams();

  useEffect(() => {
    const callbackUrl = searchParams.get('callbackUrl');
    if (callbackUrl === '/auth/error?error=AccessDenied') {
      setTimeout(() => {
        toast.error(t("auth-not-a-member-please-register"))
      }, 1000);
    }
  }, [searchParams]);

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      })
    } catch (error: any) {
      if (error?.message == "2FA code is required.") {
        setTwoFaEnabled(true)
        toast.error(t("auth-please-enter-the-two-factor-code"))
        return
      } else {
        toast.error(
          error?.message || t("auth-failed-to-login-please-try-again")
        )
        return
      }
    }
  }

  // Handle form submission when 2FA is enabled
  const handleTwoFactorSubmit: SubmitHandler<LoginSchema> = async (data) => {
    if (!code) {
      toast.error(t("auth-please-enter-the-two-factor-code"))
      return
    }

    try {
      await login({
        email: data.email,
        password: data.password,
        twoFactorCode: code.toString(),
      })
    } catch (error: any) {
      if (error?.message == "Invalid 2FA code.") {
        toast.error(t("auth-two-factor-code-is-incorrect"))
        return
      } else {
        toast.error(
          error?.message || t("auth-failed-to-login-please-try-again")
        )
        return
      }
    }
  }

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={twoFaEnabled ? handleTwoFactorSubmit : onSubmit}
        useFormProps={{
          mode: "onChange",
          defaultValues: initialValues,
        }}>
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              autoComplete="off"
              label={t("auth-email")}
              placeholder={t("auth-enter-your-email")}
              size="lg"
              {...register("email")}
              error={errors.email?.message}
            />
            <div className="space-y-2">
              <div className="flex w-full items-center justify-between">
                <label className="text-sm font-medium text-title">
                  {t("auth-text-password")}
                </label>
                <Link
                  href={routes.auth.forgotPassword}
                  className="text-sm font-semibold transition-colors">
                  {t("auth-forgot-password")}
                </Link>
              </div>
              <Password
                size="lg"
                placeholder={t("auth-enter-your-password")}
                autoComplete="off"
                visibilityToggleIcon={(visible) =>
                  visible ? (
                    <AiFillEyeInvisible className="size-4 text-gray-500" />
                  ) : (
                    <EyeIcon className="size-5 text-gray-500" />
                  )
                }
                {...register("password")}
                error={errors.password?.message}
              />
            </div>
            {twoFaEnabled && (
              <>
                <div className="flex w-full items-center justify-between">
                  <label className="bg-white text-sm font-medium">
                    {t("auth-two-factor-code")}
                  </label>
                </div>
                <PinCode
                  variant="outline"
                  setValue={setCode}
                  size="md"
                  length={6}
                  className="lg:justify-start"
                />
              </>
            )}
            <Button
              className="relative w-full"
              type="submit"
              size="lg"
              disabled={isPending}>
              {isPending ? (
                <Loader variant="spinner" className="mr-2" />
              ) : (
                <>{twoFaEnabled ? t("auth-verify-code") : t("auth-sign-in")}</>
              )}
            </Button>
          </div>
        )}
      </Form>
    </>
  )
}
