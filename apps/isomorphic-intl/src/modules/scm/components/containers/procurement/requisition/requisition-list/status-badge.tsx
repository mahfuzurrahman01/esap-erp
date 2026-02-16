import { Badge } from "@/components/ui"

export function getBillingStatusBadge(status: string) {
  switch (status) {
    case "paid":
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

export function getPriorityStatusBadge(status: string) {
  switch (status) {
    case "low":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "high":
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
  const safeStatus = status || "unknown"
  switch (safeStatus) {
    case " approved":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case " rejected":
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

export function getApprovalStatusViewBadge(status: string | null | undefined) {
  const safeStatus = status || "unknown"
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
