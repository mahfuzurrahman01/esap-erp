import { Badge, Text } from "rizzui"

export const complianceStatusOptions = [
  {
    value: "compliant",
    label: "Compliant",
  },
  {
    value: "non-compliant",
    label: "Non-compliant",
  },
  {
    value: "pending",
    label: "Pending",
  },
]

export function renderComplianceStatusOptionDisplayValue(value: string) {
  switch (value.toLowerCase()) {
    case "non-compliant":
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      )
    case "compliant":
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
