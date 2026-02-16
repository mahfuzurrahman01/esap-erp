import { Badge, Text } from "rizzui"

export const workOrderTrackingStatusOptions = [
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "in-Progress",
    label: "In Progress",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
  {
    value: "notStarted",
    label: "Not Started",
  },
]

export function renderWorkOrderTrackingStatusOptionDisplayValue(value: string) {
  switch (value.toLowerCase()) {
    case "completed":
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      )
    case "in-progress":
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-orange-dark">
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
          <Badge color="info" renderAsDot />
          <Text className="text-gray-dark ms-2 font-medium capitalize">
            {value}
          </Text>
        </div>
      )
  }
}
