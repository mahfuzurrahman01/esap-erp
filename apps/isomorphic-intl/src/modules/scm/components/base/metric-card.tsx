"use client"

import cn from "@core/utils/class-names"
import { Text } from "rizzui/typography"

const metricCardClasses = {
  base: "border border-muted bg-paper p-5 dark:bg-paper lg:p-6",
  rounded: {
    sm: "rounded-sm",
    DEFAULT: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl",
  },
}

type MetricCardTypes = {
  title: string
  metric: React.ReactNode
  icon?: React.ReactNode
  contentClassName?: string
  chart?: React.ReactNode
  info?: React.ReactNode
  rounded?: keyof typeof metricCardClasses.rounded
  titleClassName?: string
  metricClassName?: string
  chartClassName?: string
  className?: string
}

export default function MetricCard({
  title,
  metric,
  icon,
  chart,
  info,
  rounded = "DEFAULT",
  className,
  contentClassName,
  titleClassName,
  metricClassName,
  chartClassName,
  children,
}: React.PropsWithChildren<MetricCardTypes>) {
  return (
    <div
      className={cn(
        metricCardClasses.base,
        metricCardClasses.rounded[rounded],
        className
      )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {chart ? (
            <div className={cn("h-12 w-20", chartClassName)}>{chart}</div>
          ) : null}
          <div className={cn(icon && "ps-3", contentClassName)}>
            <Text className={cn("mb-0.5 text-title font-semibold", titleClassName)}>
              {title}
            </Text>
            <Text
              className={cn(
                "font-barlow text-lg font-semibold text-title dark:text-title 2xl:xl:text-xl",
                metricClassName
              )}>
              {metric}
            </Text>

            {info ? info : null}
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}
