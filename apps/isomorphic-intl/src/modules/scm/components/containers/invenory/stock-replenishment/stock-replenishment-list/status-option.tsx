import { Badge, Text } from "rizzui"

export const stockReplenishmentStatusOptions = [
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
  {
    value: "pending",
    label: "Pending",
  },
]

export const approvalStatusOptions = [
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
]

export function renderStockReplenishmentStatusOptionDisplayValue(
  value: string
) {
  switch (value.toLowerCase()) {
    case "approved":
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      )
    case "cancelled":
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            {value}
          </Text>
        </div>
      )
    default:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-orange-dark">
            {value}
          </Text>
        </div>
      )
  }
}
