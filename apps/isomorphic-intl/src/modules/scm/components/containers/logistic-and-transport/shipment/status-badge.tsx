import { Badge } from "@/components/ui"

export function getShipmentStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case "delivered":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    default:
      return (
        <Badge color="warning" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
  }
}

export function getShipmentReceivedApproval(status: string) {
  switch (status?.toLowerCase()) {
    case "delivered-goods":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    default:
      return (
        <Badge color="danger" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
  }
}
