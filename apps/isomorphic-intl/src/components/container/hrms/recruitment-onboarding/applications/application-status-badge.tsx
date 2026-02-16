import { Badge } from "@/components/ui"

export const applicationStatusOptions = [
  { label: "Screening", value: "screening" },
  { label: "Interview", value: "interview" },
  { label: "Selected", value: "selected" },
  { label: "Rejected", value: "rejected" },
]

export function getApplicationStatusBadge(status: string | null | undefined) {
  const safeStatus = status?.toLowerCase() || "unknown"
  switch (safeStatus) {
    case "screening":
      return (
        <Badge color="info" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "interview":
      return (
        <Badge color="primary" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "selected":
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

export function getListApplicationStatusBadge(
  status: string | null | undefined
) {
  const safeStatus = status?.toLowerCase() || "unknown"
  switch (safeStatus) {
    case "screening":
      return (
        <Badge color="info" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "interview":
      return (
        <Badge color="primary" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "selected":
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
