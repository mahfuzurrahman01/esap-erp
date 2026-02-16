"use client"

import { Text } from "rizzui"

import { Badge } from "@/components/ui"

export const stockStatusOptions = [
  {
    value: "in stock",
    label: "In Stock",
  },
  {
    value: "out of stock",
    label: "Out of Stock",
  },
  {
    value: "low stock",
    label: "Low Stock",
  },
]

export function renderStockStatusOptionDisplayValue(value: string) {
  switch (value.toLowerCase()) {
    case "in stock":
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      )
    case "out of stock":
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-red-dark">
            {value}
          </Text>
        </div>
      )
    default:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-orange-dark">
            {value}
          </Text>
        </div>
      )
  }
}
