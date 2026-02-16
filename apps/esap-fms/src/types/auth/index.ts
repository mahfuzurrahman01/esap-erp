//user.type.ts

export interface UserEditFormTypes {
  firstName: string
  roles?: any
  phoneNumber: string
  email: string
  country: string
  address: string
  password: string
  twoFactorEnabled?: boolean
}

export interface UserUpdate {
  id?: string
  FirstName: string
  Email: string
  PhoneNumber: string | undefined
  Address: string
  Country: string
  Roles: string[] // Specify that Roles is an array of strings
  File?: string // Make File optional, as it may not always be present
  Password?: string // Include Password as it's part of the payload
  TwoFactorEnabled?: boolean // Include TwoFactorEnabled if it's part of the form data
  data?: any
}

export interface UserList {
  id: string
  userId?: string
  rowNumber?: string
  firstName: string
  lastName?: string
  password: string
  thumbnail: string
  email: string
  shortOrder?: string
  applicationUser: {
    email: string
    twoFactorEnabled: boolean
  }
  phoneNumber: string
  address: string
  roles?: any
  arrOfRoleIds?: string[]
  country: number
  createdAt: any
  profilePicturePath?: string
  user_id: string
  status: string
  count: number
  pageSize: string
  action: string
}

export interface SingleUser {
  data: UserList
}

export interface PaginatorInfo<T> {
  pageIndex: number
  pageSize: number
  count: number
  data: T[]
  total: number
}

export interface UserQueryOptions {
  language?: string
  page?: number
  pageIndex?: number
  limit?: number
  pageSize?: number
  name?: string
  email?: string
  status?: string
  role?: string
  country?: string
  phoneNumber?: string
  search?: string
}

export interface UserEditComponentProps {
  id: string
}

export interface UserCreationFormTypes {
  firstName: string
  phoneNumber?: string
  email: string
  password: string
  country: string
  address: string
  twoFactorEnabled?: boolean
  roles?: any
}

export interface ProfileResetPasswordTypes {
  previousPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ResetPasswordPayload {
  email: string | null
  resetCode: string | number | undefined
  newPassword: string
  confirmPassword: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface Person {
  id: string
  firstName?: string
  phoneNumber: string
  email: string
  role: string
  roles?: any
  profilePicturePath?: string
  country?: string
  avatar?: string
  status: string
  action: string
  applicationUser?: {
    email: string
  }
}

export interface UserPaginator extends PaginatorInfo<UserList> {}
