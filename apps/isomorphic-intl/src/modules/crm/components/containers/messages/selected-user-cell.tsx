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

const SelectedUserCell = ({ assignedTo }: AssignedToCellProps) => {
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
          className="flex-shrink-0 shadow-sm xs:!h-10 xs:!w-10"
        />
        <div className="flex flex-col text-title gap-1">
          {t("text-username")}
          <div className="text-neutral-500 dark:text-neutral-300 text-sm font-light">
           <span className="text-gray-500">{t("text-online")}</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Avatar
        src={data?.data?.profilePicturePath || demoAvatar.src}
        name={data?.data?.firstName || "User"}
        className="flex-shrink-0 shadow-sm xs:!h-10 xs:!w-10"
      />
      <div className="flex flex-col text-title gap-1">
        {data?.data?.firstName || "User"}
        <div className="text-neutral-500 dark:text-neutral-300 text-sm font-light">
          <span className="text-gray-500">{t("text-online")}</span>
        </div>
      </div>
    </>
  )
}

export default SelectedUserCell
