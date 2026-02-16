import { Badge, Text } from "rizzui"

export const warehouseStatusOptions = [
  {
    value: true,
    label: "Active",
  },
  {
    value: false,
    label: "Inactive",
  },
]

export function renderWarehouseStatusOptionDisplayValue(value: boolean) {
  switch (value) {
    case true:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            Active
          </Text>
        </div>
      )
    default:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            Inactive
          </Text>
        </div>
      )
  }
}
