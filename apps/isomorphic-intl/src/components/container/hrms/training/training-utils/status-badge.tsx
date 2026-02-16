import { Badge } from "@/components/ui"

export function getTrainingProgramStatusBadge(
  status: string | null | undefined
) {
  const safeStatus = status || "Scheduled"
  switch (safeStatus) {
    case "Scheduled":
      return (
        <Badge color="warning" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "Completed":
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
    case "Present":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "Absent":
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
