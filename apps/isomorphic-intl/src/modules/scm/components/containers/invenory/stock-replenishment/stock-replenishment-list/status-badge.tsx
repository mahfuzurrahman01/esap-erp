import { Badge } from "@/components/ui"

export function getStockReplenishmentStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case "completed":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "cancelled":
      return (
        <Badge color="danger" variant="flat" rounded="lg">
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

export function getApprovalStatusBadge(status: string | null | undefined) {
  const safeStatus = status?.toLowerCase() || "unknown"
  switch (safeStatus) {
    case "approved":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "rejected":
      return (
        <Badge color="danger" variant="flat" rounded="lg">
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
