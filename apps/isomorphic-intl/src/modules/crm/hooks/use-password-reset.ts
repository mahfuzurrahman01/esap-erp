import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useAtom } from "jotai"
import toast from "react-hot-toast"

import { reset } from "@/modules/crm/service/password-reset.service"
import {
  ForgotPasswordPayload,
  ProfileResetPasswordTypes,
  ResetPasswordPayload,
} from "@/types/auth"
import { otpEmailAtom } from "@/utils/atoms/otp-email-atom"

export function useProfileResetPassword() {
  const queryClient = useQueryClient()
  return useMutation<
    ProfileResetPasswordTypes,
    AxiosError,
    ProfileResetPasswordTypes
  >({
    mutationFn: (data) => reset.profileReset(data),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["password-reset"] })
      toast.success(data.message)
    },
    onError: (error: AxiosError | any) => {
      const errorMessage =
        error?.response?.data?.message || "Error resetting password"
      toast.error(errorMessage)
    },
  })
}

export function useForgotPassword(router: any) {
  const queryClient = useQueryClient()
  const [, setOtpEmail] = useAtom(otpEmailAtom)

  return useMutation<any, AxiosError, ForgotPasswordPayload>({
    mutationFn: (data) => {
      setOtpEmail(data.email)
      return reset.forgot(data)
    },
    onSuccess: (output: any) => {
      console.log("output", output)
      queryClient.invalidateQueries({ queryKey: ["forgot-password"] })
      if(output == "Reset code has been sent to your email."){
        toast.success(output)
        setTimeout(() => {
          router.push("/auth/otp")
        }, 500)
      }else{
        toast.error("Email not exists")
      }
    },
    onError: (error: AxiosError | any) => {
      const errorMessage =
        error?.response?.data?.message || "Error resetting password"
      toast.error(errorMessage)
    },
  })
}

export function usePasswordReset(router: any) {
  const [, setOtpEmail] = useAtom(otpEmailAtom)

  return useMutation<any, AxiosError, ResetPasswordPayload>({
    mutationFn: (data) => reset.reset(data),
    onSuccess: (output: any) => {
      toast.success(output)
      setOtpEmail(null)
      setTimeout(() => {
        router.push("/login")
      }, 500)
    },
    onError: (error: AxiosError | any) => {
      const errorMessage =
        error?.response?.data?.message || "Error resetting password"
      toast.error(errorMessage)
    },
  })
}
