"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { FcGoogle } from "react-icons/fc"
import { Text } from "rizzui"

import AuthWrapperFive from "@/components/base/auth-layout/auth-wrapper-five"
import OrSeparation from "@/components/base/auth-layout/or-separation"
import SignInForm from "@/components/container/auth/sign-in-form"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { useGoogleLogin } from "@/hooks/auth/use-auth"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

// export const metadata = {
//   ...metaObject("Sign In"),
// }

export default function SignIn() {
  const t = useTranslations("auth")
  const { mutate: googleLogin, isPending: isGoogleLoading } = useGoogleLogin()

  return (
    <AuthWrapperFive
      title={
        <>
          <span className="text-xl">{t("auth-sign-in-to-your-account")}</span>
          <Text className="mt-2 text-sm">
            {t("auth-dont-have-an-account")}
            <Link
              href={routes.auth.signUp}
              className="ml-2 text-sm font-semibold text-primary transition-colors">
              {t("auth-get-started")}
            </Link>
          </Text>
        </>
      }>
      <div className="grid grid-cols-1 gap-4 pb-5 md:grid-cols-1 xl:gap-5">
        <Button
          variant="outline"
          className="h-9 w-full"
          onClick={() => googleLogin()}
          disabled={isGoogleLoading}>
          <FcGoogle className="me-2 h-4 w-4 shrink-0" />
          <span className="truncate">
            {isGoogleLoading ? "Loading..." : t("auth-sign-in-with-google")}
          </span>
        </Button>
      </div>
      <OrSeparation
        title="OR"
        className="border-gray-500/20 text-xs"
        isCenter
      />
      <div className="my-4 flex flex-col items-start space-y-2">
        <span>Email: yasirarafat8856@gmail.com</span>
        <span>Password: Password@001</span>
      </div>
      <SignInForm />
    </AuthWrapperFive>
  )
}
