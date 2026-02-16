import { ApiEndpoint } from "@/server/client"
import {
  AuthResponse,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from "@/types/auth/auth.types"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

export const AuthService = {
  login: (input: LoginInput) =>
    HttpClient.post<AuthResponse>(
      ApiEndpoint.auth.login,
      input,
      false,
      EndpointType.DEFAULT
    ),
  loginWithGoogle: (
    input: LoginInput & { provider?: string; token?: string }
  ) =>
    HttpClient.post<AuthResponse>(
      ApiEndpoint.auth.loginWithGoogle,
      input,
      false,
      EndpointType.DEFAULT
    ),
  register: (input: RegisterInput) =>
    HttpClient.post<AuthResponse>(
      ApiEndpoint.auth.register,
      input,
      false,
      EndpointType.DEFAULT
    ),
  forgotPassword: (input: ForgotPasswordInput) =>
    HttpClient.post<void>(
      ApiEndpoint.auth.forgotPassword,
      input,
      false,
      EndpointType.DEFAULT
    ),
  resetPassword: (input: ResetPasswordInput) =>
    HttpClient.post<void>(
      ApiEndpoint.auth.resetPassword,
      input,
      false,
      EndpointType.DEFAULT
    ),
  logout: () =>
    HttpClient.post<void>(
      ApiEndpoint.auth.logout,
      {},
      false,
      EndpointType.DEFAULT
    ),
}
