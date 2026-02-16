import { Badge } from "@/components/ui"

export function getProgressStatusBadge(status: string | null | undefined) {
  const safeStatus = status || "0%"
  switch (safeStatus) {
    case "0%":
      return (
        <Badge color="gray" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "25%":
      return (
        <Badge color="warning" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "50%":
      return (
        <Badge color="info" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "75%":
      return (
        <Badge color="secondary" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "100%":
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
