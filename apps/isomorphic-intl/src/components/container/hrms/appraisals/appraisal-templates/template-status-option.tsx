import { Badge } from "@/components/ui"

export function getListTemplateStatusBadge(status: string | null | undefined) {
  const safeStatus = status?.toLowerCase() || "unknown"
  switch (safeStatus) {
    case "active":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "inactive":
      return (
        <Badge color="danger" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "expired":
      return (
        <Badge color="danger" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "running":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "pending":
      return (
        <Badge color="warning" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "reviewed":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "new":
      return (
        <Badge color="warning" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "submitted":
      return (
        <Badge color="info" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "cancelled":
      return (
        <Badge color="danger" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "done":
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
