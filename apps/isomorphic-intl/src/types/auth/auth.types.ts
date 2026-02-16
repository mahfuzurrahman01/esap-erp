export interface LoginInput {
  email: string
  password?: string
  provider?: string
  accessToken?: string
  twoFactorCode?: string
}

export interface RegisterInput {
  firstName?: string
  lastName?: string
  fullName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
  isAgreed?: boolean
}

export interface ForgotPasswordInput {
  email: string
}

export interface ResetPasswordInput {
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  token: string
  data: {
    userId: string
    email: string | null
    firstName: string | null
    lastName: string | null
    profilePicturePath: string | null
    roles: string[] | null
    applicationUser: {
      username: string
      email: string
      twoFactorEnabled: boolean
    }
  }
  status: string | null
  message: string | null
  details: string | null
  error: string | null
}
