import { Badge } from "@/components/ui"

type BadgeColor = "black" | "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "info" | "gray" | undefined;

export function getApprovalStatusBadge(status: string | null | undefined) {
  const safeStatus = status?.toLowerCase() || "unknown";

  const statusColorMap: Record<string, BadgeColor> = {
    "approved": "success",
    "active": "success",
    "pending": "warning",
    "draft": "gray",
    "completed": "success",
    "in review": "secondary",
    "to do": "info",
    "low": "info",
    "declined": "danger",
    "on hold": "danger",
    "hold": "danger",
    "high": "danger",
    "inactive": "danger",
    "overdue": "danger",
    "cancelled": "danger",
    "submitted": "primary"
  };

  const color: BadgeColor = statusColorMap[safeStatus] || "warning";

  return (
    <Badge color={color} variant="flat" rounded="lg">
      {status}
    </Badge>
  );
}