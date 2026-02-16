"use client"

import { Badge } from "@/components/ui"

export function getStockStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case "in stock":
      return (
        <Badge color="success" variant="flat" rounded="lg">
          {status}
        </Badge>
      )
    case "out of stock":
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
