import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import Avatar from "@/components/ui/avatar"
import demoAvatar from "@public/auth/avatar.webp"
import { useUserById } from "@/hooks/auth/use-user"
import { UserList } from "@/types/auth"

interface AssignedToCellProps {
  id?: string
}

const OponentAvatar = ({ id }: AssignedToCellProps) => {
  const t = useTranslations("crm")
  const {
    data,
    isLoading: isUserLoading,
    error,
  } = useUserById(id) as {
    data: { data: UserList } | undefined
    isLoading: boolean
    error: Error | null
  }

  if (isUserLoading) {
    return (
      <Text className="font-medium text-gray-900 dark:text-gray-0">
        {t("text-loading")}
      </Text>
    )
  }

  if (error || !data) {
    return (
      <Avatar
        src={demoAvatar.src}
        name={"User"}
        className="flex-shrink-0 shadow-sm xs:!h-8 xs:!w-8"
      />
    )
  }

  return (
    <Avatar
      src={data?.data?.profilePicturePath || demoAvatar.src}
      name={data?.data?.firstName || "User"}
      className="flex-shrink-0 shadow-sm xs:!h-8 xs:!w-8"
    />
  )
}

export default OponentAvatar
