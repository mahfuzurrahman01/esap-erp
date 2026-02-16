import { Badge } from "@/components/ui"

export const approvalStatusOptions = [
  { label: "Approved", value: "Approved" },
  { label: "Rejected", value: "Rejected" },
]

export function getApprovalStatusBadge(status: string | null | undefined) {
  const safeStatus = status?.toLowerCase() || "unknown"
  switch (safeStatus) {
    case "Approved":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          Approved
        </Badge>
      )
    case "Rejected":
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

export function getListApprovalStatusBadge(status: string | null | undefined) {
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
