import demoAvatar from "@public/auth/avatar.webp"

import Avatar from "@/components/ui/avatar"
import { useUserById } from "@/hooks/auth/use-user"
import { UserList } from "@/types/auth"

interface AssignedToCellProps {
  userId?: string
}

const UserAvatar = ({ userId }: AssignedToCellProps) => {
  const { data, error } = useUserById(userId) as {
    data: { data: UserList } | undefined
    isLoading: boolean
    error: Error | null
  }

  if (error || !data) {
    return (
      <Avatar
        src={demoAvatar.src}
        name={"User"}
        className="flex-shrink-0 shadow-sm xs:!h-10 xs:!w-10"
      />
    )
  }

  return (
    <Avatar
      src={data?.data?.profilePicturePath || demoAvatar.src}
      name={data?.data?.firstName || "User"}
      className="flex-shrink-0 shadow-sm xs:!h-10 xs:!w-10"
    />
  )
}

export default UserAvatar
