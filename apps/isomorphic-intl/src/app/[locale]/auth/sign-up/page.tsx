"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { FcGoogle } from "react-icons/fc"
import { Text } from "rizzui"

import AuthWrapperFive from "@/components/base/auth-layout/auth-wrapper-five"
import OrSeparation from "@/components/base/auth-layout/or-separation"
import SignUpForm from "@/components/container/auth/sign-up-form"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
// import { metaObject } from "@/config/site.config"

// export const metadata = {
//   ...metaObject("Sign Up"),
// }

export default function SignUpPage() {
  const t = useTranslations("auth")
  return (
    <AuthWrapperFive
      title={
        <>
          <span
            className="bg-gradient-to-r bg-clip-text"
            style={{ fontSize: "20px" }}>
            {t("auth-get-started-absolutely-free")}
          </span>
          <Text
            className="leading-loose lg:text-start"
            style={{ fontSize: "14px" }}>
            {t("auth-already-have-an-account")}{" "}
            <Link
              href={routes.auth.signIn}
              className="font-semibold text-gray-700 transition-colors hover:text-blue"
              style={{ fontSize: "14px", color: "#00A76F" }}>
              {t("auth-sign-in")}
            </Link>
          </Text>
        </>
      }>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 xl:gap-5">
        <Button variant="outline" className="h-11 w-full">
          <FcGoogle className="me-2 h-4 w-4 shrink-0" />
          <span className="truncate">{t("auth-sign-up-with-google")}</span>
        </Button>
      </div>
      <OrSeparation
        title="OR"
        className="border-gray-500/20 text-xs py-4"
        isCenter
      />
      <SignUpForm />
    </AuthWrapperFive>
  )
}
