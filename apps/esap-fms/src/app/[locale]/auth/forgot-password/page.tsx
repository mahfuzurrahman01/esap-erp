import Image from "next/image"

import icPassword from "@public/auth/ic-password.png"

import AuthWrapperFive from "@/components/base/auth-layout/auth-wrapper-five"
import ForgetPasswordForm from "@/components/container/auth/forget-password-form"
import { useTranslations } from "next-intl"

export default function ForgotPassword() {
  const t = useTranslations("auth")
  return (
    <AuthWrapperFive
      title={
        <div className="flex flex-col items-center">
          <Image
            src={icPassword}
            alt="Logo"
            width={96}
            height={96}
            priority
            className="items-center object-none text-center"
          />
          <p
            className="text-center text-lg text-title py-5">
            {t("auth-forgot-your-password")}
          </p>
          <p className="text-center font-normal text-sm text-title">
            {t("auth-forgot-password-instructions")}
          </p>
        </div>
      }>
      <ForgetPasswordForm />
    </AuthWrapperFive>
  )
}
