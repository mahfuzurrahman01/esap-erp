import { ApiEndpoint } from "@/server/client"
import {
  AuthResponse,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from "@/types/auth/auth.types"
import HttpClient from "@/utils/axios"

export const AuthService = {
  login: (input: LoginInput) =>
    HttpClient.post<AuthResponse>(ApiEndpoint.auth.login, input, false),
  loginWithGoogle: (
    input: LoginInput & { provider?: string; token?: string }
  ) =>
    HttpClient.post<AuthResponse>(
      ApiEndpoint.auth.loginWithGoogle,
      input,
      false
    ),
  register: (input: RegisterInput) =>
    HttpClient.post<AuthResponse>(ApiEndpoint.auth.register, input, false),
  forgotPassword: (input: ForgotPasswordInput) =>
    HttpClient.post<void>(ApiEndpoint.auth.forgotPassword, input, false),
  resetPassword: (input: ResetPasswordInput) =>
    HttpClient.post<void>(ApiEndpoint.auth.resetPassword, input, false),
  logout: () => HttpClient.post<void>(ApiEndpoint.auth.logout, {}, false),
}
