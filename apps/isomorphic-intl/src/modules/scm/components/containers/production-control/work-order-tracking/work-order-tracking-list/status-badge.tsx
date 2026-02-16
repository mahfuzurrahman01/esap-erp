import { Badge } from "@/components/ui"

export function getWorkOrderTrackingStatusBadge(
  status: string | null | undefined
) {
  const safeStatus = status?.toLowerCase() || "unknown"
  switch (safeStatus) {
    case "completed":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "in-progress":
      return (
        <Badge color="warning" variant="flat" rounded="lg">
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
        <Badge color="info" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
  }
}
