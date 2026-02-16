import { Badge } from "@/components/ui"

export function getBillingStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case "paid":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "unpaid":
      return (
        <Badge color="pending" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "partly-paid":
      return (
        <Badge color="warning" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "overdue":
      return (
        <Badge color="secondaryerror" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "submitted":
      return (
        <Badge color="emerald" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "return":
      return (
        <Badge color="info" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "debit-return-issued":
      return (
        <Badge color="babypink" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "cancelled":
      return (
        <Badge color="error" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "internal-transfer":
      return (
        <Badge color="purple" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    default:
      return (
        <Badge color="gray" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
  }
}
