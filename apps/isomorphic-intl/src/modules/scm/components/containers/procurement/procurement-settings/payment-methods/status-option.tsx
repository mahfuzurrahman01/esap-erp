import { Badge } from "@/components/ui"

export function getPaymentMethodStatusBadge(status: boolean) {
  switch (status) {
    case true:
      return (
        <Badge color="success" variant="flat" rounded="lg">
          Active
        </Badge>
      )
    default:
      return (
        <Badge color="danger" variant="flat" rounded="lg">
          Inactive
        </Badge>
      )
  }
}
