export interface ApplicationUser {
  email: string
  twoFactorEnabled: boolean
}

export interface UserView {
  id: string
  firstName: string
  lastName: string
  profilePicturePath?: string
  phoneNumber: string
  roles: string
  address: string
  country: string
  coverPhotoPath?: string
  applicationUser: ApplicationUser
}
