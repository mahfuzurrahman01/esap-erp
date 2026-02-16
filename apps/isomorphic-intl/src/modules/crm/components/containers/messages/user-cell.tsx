import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import Avatar from "@/components/ui/avatar"
import demoAvatar from "@public/auth/avatar.webp"
import { useUserById } from "@/hooks/auth/use-user"
import { UserList } from "@/types/auth"

interface AssignedToCellProps {
  assignedTo?: string
  messageContent?: string
}

const UserCell = ({ assignedTo, messageContent }: AssignedToCellProps) => {
  const t = useTranslations("crm")
  const {
    data,
    isLoading: isUserLoading,
    error,
  } = useUserById(assignedTo) as {
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
      <>
        <Avatar
          src={demoAvatar.src}
          name="User"
          className="flex-shrink-0 shadow-sm xs:!h-10 xs:!w-10 max-sm:right-[2.5px]"
        />
        <div>
          <div className="font-semibold text-title">{t("text-username")}</div>
          <p className="truncate text-sm text-gray-500">{t("text-no-message-yet")}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Avatar
        src={data?.data?.profilePicturePath || demoAvatar.src}
        name={data?.data?.firstName || "User"}
        className="flex-shrink-0 shadow-sm xs:!h-12 xs:!w-12 max-sm:right-[2.5px]"
      />
      <div className="max-sm:hidden">
        <div className="w-[180px] truncate font-semibold text-title">{data?.data?.firstName ?? "User"} {data?.data?.lastName}</div>
        <p className="w-[180px] truncate text-sm text-gray-500">
          {messageContent || data?.data?.applicationUser?.email}
        </p>
      </div>
    </>
  )
}

export default UserCell
