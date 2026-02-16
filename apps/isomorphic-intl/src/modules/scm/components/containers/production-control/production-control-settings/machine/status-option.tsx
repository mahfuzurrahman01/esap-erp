import { Badge, Text } from "rizzui"

export const machineStatusOptions = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "expired",
    label: "Expired",
  },
]

export function renderMachineStatusOptionDisplayValue(value: string) {
  switch (value.toLowerCase()) {
    case "active":
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      )
    default:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            {value}
          </Text>
        </div>
      )
  }
}
