"use client"

import { PiArrowDownRight, PiArrowUpRight } from "react-icons/pi"
import { Title } from "rizzui/typography"

import { cn } from "@/utils/cn"

interface StatsCardProps {
  className?: string
  icon: React.ReactNode
  label: string
  value: string | number
  growth?: number
  color?: "primary" | "success" | "warning" | "info" | "secondary"
}

const colorStyles = {
  primary: {
    icon: "bg-primary/10 text-primary dark:bg-primary/20",
    growth: {
      positive: "text-primary",
      negative: "text-red",
    },
  },
  success: {
    icon: "bg-green/10 text-green dark:bg-green/20",
    growth: {
      positive: "text-green",
      negative: "text-red",
    },
  },
  warning: {
    icon: "bg-orange/10 text-orange dark:bg-orange/20",
    growth: {
      positive: "text-orange",
      negative: "text-red",
    },
  },
  info: {
    icon: "bg-blue/10 text-blue dark:bg-blue/20",
    growth: {
      positive: "text-blue",
      negative: "text-red",
    },
  },
  secondary: {
    icon: "bg-secondary/10 text-secondary dark:bg-secondary/20",
    growth: {
      positive: "text-secondary",
      negative: "text-red",
    },
  },
}

export default function StatsCard({
  className,
  icon,
  label,
  value,
  growth,
  color = "primary",
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "gradient-to-b rounded-xl bg-white bg-opacity-20 p-5",
        className
      )}>
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg",
            colorStyles[color].icon
          )}>
          {icon}
        </div>

        {typeof growth !== "undefined" && (
          <div
            className={cn(
              "flex items-center gap-1 font-medium",
              growth >= 0
                ? colorStyles[color].growth.positive
                : colorStyles[color].growth.negative
            )}>
            {growth > 0 ? (
              <PiArrowUpRight className="h-5 w-5" />
            ) : growth < 0 ? (
              <PiArrowDownRight className="h-5 w-5" />
            ) : null}
            <span>{Math.abs(growth)}%</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col">
        <Title as="h4" className="mb-0.5 text-2xl font-semibold">
          {value}
        </Title>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  )
}
