import { useCurrentUser } from "@/hooks/auth/use-auth"
import { useUserById } from "@/hooks/auth/use-user"

export function useCurrentRole() {
  const { user } = useCurrentUser()
  const { data: userData } = useUserById(user?.id)
  const roles = userData?.data?.roles || []

  return {
    roles,
    isLoading: !userData,
    // Helper functions to check roles
    hasRole: (role: string) => roles.includes(role),
    hasAnyRole: (requiredRoles: string[]) =>
      requiredRoles.some((role) => roles.includes(role)),
    hasAllRoles: (requiredRoles: string[]) =>
      requiredRoles.every((role) => roles.includes(role)),
  }
}
