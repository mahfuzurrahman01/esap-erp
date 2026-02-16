import { Badge } from "@/components/ui"

export function getComplianceStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case "non-compliant":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "compliant":
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
