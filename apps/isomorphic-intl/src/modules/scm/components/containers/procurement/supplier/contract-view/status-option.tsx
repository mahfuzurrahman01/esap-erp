import { Badge } from "@/components/ui"

export function getStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
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
