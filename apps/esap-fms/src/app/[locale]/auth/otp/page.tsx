"use client"

import Image from "next/image"
import Link from "next/link"

import icEmailSent from "@public/auth/ic-email-sent.png"
import { useTranslations } from "next-intl"
import { BsArrowLeft } from "react-icons/bs"
import useMedia from "react-use/lib/useMedia"

import AuthWrapperFive from "@/components/base/auth-layout/auth-wrapper-five"
import OTPForm from "@/components/container/auth/otp-form"
import { routes } from "@/config/routes"

export default function OtpPage() {
  const t = useTranslations("auth")
  return (
    <AuthWrapperFive
      title={
        <div className="flex flex-col items-center">
          <Image
            src={icEmailSent}
            alt="Logo"
            width={96}
            height={96}
            priority
            className="items-center object-none text-center"
          />
          <p className="text-center text-xl text-title py-4">
              {t("auth-request-sent-successfully")}
          </p>
          <p
            className="text-center text-xs font-normal text-title">
            {t("auth-forgot-password-instructions")}
          </p>
        </div>
      }>
      <OTPForm />
      <Link
        href={routes.auth.signIn}
        className="mt-5 flex items-center justify-center font-bold transition-colors text-title">
        <BsArrowLeft className="mr-2 text-xl" />
        {t("auth-return-to-sign-in")}
      </Link>
    </AuthWrapperFive>
  )
}
