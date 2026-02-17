import {
  ForgotPasswordPayload,
  ProfileResetPasswordTypes,
  ResetPasswordPayload,
} from "@/types/auth"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const reset = {
  reset: (input: ResetPasswordPayload) =>
    httpClient.post<ResetPasswordPayload>(
      ApiEndpoint.auth.resetPassword,
      input
    ),
  profileReset: (input: ProfileResetPasswordTypes) =>
    httpClient.post<ProfileResetPasswordTypes>(
      ApiEndpoint.auth.profileResetPassword,
      input
    ),
  forgot: (input: ForgotPasswordPayload) =>
    httpClient.get<ForgotPasswordPayload>(
      ApiEndpoint.auth.forgotPassword,
      input
    ),
}
