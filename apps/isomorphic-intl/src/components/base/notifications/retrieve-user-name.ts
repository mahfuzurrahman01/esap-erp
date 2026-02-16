import { useUserById } from "@/hooks/auth/use-user";
import { UserList } from "@/types/auth";

export function useUserName(userId?: string) {
  const {
    data,
    isLoading,
    error,
  } = useUserById(userId) as {
    data: { data: UserList } | undefined;
    isLoading: boolean;
    error: Error | null;
  };

  if (isLoading) {
    return { name: "Loading...", isLoading, error: null };
  }

  if (error || !data) {
    return { name: "Unknown User", isLoading: false, error };
  }

  const name = `${data.data.firstName} ${data.data.lastName}`.trim() || "User";
  return { name, isLoading: false, error: null };
}