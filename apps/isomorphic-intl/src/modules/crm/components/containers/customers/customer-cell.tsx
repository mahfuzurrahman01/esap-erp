import AvatarCard from "@core/ui/avatar-card"
import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { useCustomerById } from "@/modules/crm/hooks/use-customers"
import { Customer } from "@/modules/crm/types/customer"

const CustomerCell = ({ customerId }: { customerId?: string }) => {
  const tableT = useTranslations("table")
  const {
    data,
    isLoading: isCustomerLoading,
    error,
  } = useCustomerById(customerId) as {
    data: Customer | undefined
    isLoading: boolean
    error: Error | null
  }

  if (isCustomerLoading) {
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
      src={data?.profilePicturePath as string}
      name={`${data?.firstName || "Customer"} ${data?.lastName}`}
    />
  )
}

export default CustomerCell
