"use client"

import { cn } from "@/utils/cn"
import { ReactNode } from "react"

export function PreviewItem({
  label,
  value,
  className,
}: {
  label: string
  value: string | number | null | ReactNode
  className?: string
}) {
  return (
    <li className={cn("grid grid-cols-2", className)}>
      <span className="text-sm text-body">{label} :</span>
      <span className="text-sm font-semibold text-title">
        {typeof value === "string" || typeof value === "number" ? value || "--" : value}
      </span>
    </li>
  )
}
