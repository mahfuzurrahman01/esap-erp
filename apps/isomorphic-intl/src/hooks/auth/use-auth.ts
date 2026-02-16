import { useRouter } from "next/navigation"

import { useMutation } from "@tanstack/react-query"
import { signIn, signOut, useSession } from "next-auth/react"
import { useTranslations, useLocale } from "next-intl"
import { toast } from "react-hot-toast"

import { useUserById } from "@/hooks/auth/use-user"
import { AuthService } from "@/server/service/auth/auth.service"
import {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from "@/types/auth/auth.types"

export function useCurrentUser() {
  const { data: session, status } = useSession()
  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  }
}

export function useLogin() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      // MVP Fix: Call backend API first - if it succeeds, we're good
      const apiResponse = await AuthService.login(data)
      
      // Try to establish NextAuth session in background (non-blocking)
      // Don't throw error if NextAuth fails - backend already authenticated
      signIn("credentials", {
        ...data,
        redirect: false,
      }).catch((error) => {
        // Silently handle NextAuth errors - backend auth already succeeded
        console.warn("NextAuth session establishment failed (non-critical):", error)
      })
      
      return apiResponse
    },
    onSuccess: async () => {
      toast.success(t("form-user-successfully-logged-in"))
      
      // MVP Fix: Give NextAuth time to establish session, then force redirect
      // Use longer delay to ensure session cookie is set
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      // Get callbackUrl from query params or default to dashboard
      const searchParams = new URLSearchParams(window.location.search)
      let callbackUrl = searchParams.get("callbackUrl") || `/${locale}`
      
      // Ensure callbackUrl has locale prefix if it doesn't start with /
      if (!callbackUrl.startsWith("/")) {
        callbackUrl = `/${locale}/${callbackUrl}`
      } else if (!callbackUrl.startsWith(`/${locale}`)) {
        // If it starts with / but doesn't have locale, add it
        callbackUrl = `/${locale}${callbackUrl === "/" ? "" : callbackUrl}`
      }
      
      // MVP Fix: Use replace instead of href to avoid back button issues
      // Force full page reload to ensure middleware recognizes session
      window.location.replace(callbackUrl)
    },
    onError: (error: any) => {
      // //console.log('error?.response?.data', error?.response?.data)
      const outputMsg =
        error?.response?.data?.details || "Authentication failed"
      throw new Error(outputMsg)
    },
  })
}

export function useRegister() {
  const router = useRouter()
  const t = useTranslations("form")
  return useMutation({
    mutationFn: (data: RegisterInput) => AuthService.register(data),
    onSuccess: () => {
      toast.success(t("form-user-successfully-registered"))
      router.push("/auth/sign-in")
    },
    onError: () => {
      toast.error(t("form-user-already-exists"))
    },
  })
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordInput) => AuthService.forgotPassword(data),
    onSuccess: () => {
      toast.success("Password reset instructions sent to your email!")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useResetPassword() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: ResetPasswordInput) => AuthService.resetPassword(data),
    onSuccess: () => {
      toast.success("Password successfully reset!")
      router.push("/auth/sign-in")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useLogout() {
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      await AuthService.logout()
      await signOut({ redirect: false })
    },
    onSuccess: () => {
      toast.success("Successfully logged out!")
      router.push("/auth/sign-in")
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

export function useGoogleLogin() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: async () => {
      const result = await signIn("google", { redirect: false })
      if (result?.error) {
        throw new Error(result.error)
      }
      return result
    },
    onSuccess: async (data) => {
      if (data?.ok) {
        toast.success(t("form-user-successfully-logged-in"))
        // Wait for session to be established
        await new Promise((resolve) => setTimeout(resolve, 500))
        // Get callbackUrl from query params or default to dashboard
        const searchParams = new URLSearchParams(window.location.search)
        let callbackUrl = searchParams.get("callbackUrl") || `/${locale}`
        
        // Ensure callbackUrl has locale prefix
        if (!callbackUrl.startsWith("/")) {
          callbackUrl = `/${locale}/${callbackUrl}`
        } else if (!callbackUrl.startsWith(`/${locale}`)) {
          callbackUrl = `/${locale}${callbackUrl === "/" ? "" : callbackUrl}`
        }
        
        // MVP Fix: Use replace instead of href to avoid back button issues
        window.location.replace(callbackUrl)
      }
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
