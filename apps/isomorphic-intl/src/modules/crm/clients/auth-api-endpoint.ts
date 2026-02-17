export const AuthApiEndpoints = {
  // ---- Auth Endpoints (all prefixed with /auth) ----
  login: "/auth/v1/auth/login",
  register: "/auth/v1/auth/register",
  forgotPassword: "/auth/v1/auth/forgot-password",
  resetPassword: "/auth/v1/auth/reset",
  logout: "/auth/v1/auth/logout",
  loginWithGoogle: "/auth/v1/auth/validate-provider-access",
  enable2fa: "/auth/v1/auth/enable-2fa",
  verify2fa: "/auth/v1/auth/verify-2fa",
  profileResetPassword: "/auth/v1/auth/profile-reset-password",

  // ---- Auth User Management ----
  users: "/auth/v1/users",
  usersByEmail: "/auth/v1/users/email",
  bulkDeleteUser: "/auth/v1/users/range",

  // ---- Auth Roles & Permissions ----
  roles: "/auth/v1/roles",
  bulkDeleteRole: "/auth/v1/roles/delete-range",
  roleWithPermission: "/auth/v1/roles/role-with-permission",
  permissions: "/auth/v1/permissions",
  bulkDeletePermission: "/auth/v1/permissions/delete-range",
}
