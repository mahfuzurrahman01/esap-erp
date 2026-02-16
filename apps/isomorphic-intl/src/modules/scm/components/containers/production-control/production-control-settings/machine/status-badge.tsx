import { Badge } from "@/components/ui"

export function getMachineStatusBadge(status: string | null | undefined) {
  const safeStatus = status?.toLowerCase() || "unknown"
  switch (safeStatus) {
    case "active":
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
