import AvatarCard from "@core/ui/avatar-card"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { useUserById } from "@/hooks/auth/use-user"
import { UserList } from "@/types/auth"

interface AssignedToCellProps {
  assignedTo?: string
}

const AssignedToCell = ({ assignedTo }: AssignedToCellProps) => {
  const tableT = useTranslations("table")
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
        {tableT("table-text-loading")}
      </Text>
    )
  }

  if (error || !data) {
    return (
      <Text className="font-medium text-gray-900 dark:text-gray-0">
        {tableT("table-text-no-data")}
      </Text>
    )
  }

  return (
    <AvatarCard
      src={data.data.profilePicturePath || ""}
      name={`${data?.data?.firstName || tableT("table-text-user")} ${data?.data?.lastName || ""}`}
    />
  )
}

export default AssignedToCell
