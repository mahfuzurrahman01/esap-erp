import { Badge } from "@/components/ui"

export function getPayslipStatusBadge(status: string | null | undefined) {
  const safeStatus = status || "Draft"
  switch (safeStatus) {
    case "Draft":
      return (
        <Badge color="warning" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "Paid":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "Cancelled":
      return (
        <Badge color="danger" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "Rejected":
      return (
        <Badge color="danger" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "Submitted":
      return (
        <Badge color="info" variant="flat" rounded="lg">
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
