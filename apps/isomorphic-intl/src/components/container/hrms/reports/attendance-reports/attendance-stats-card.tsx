import { IconType } from "react-icons/lib"
import { cn } from "rizzui"

export type AttendanceStatsType = {
  icon: IconType
  title: string
  value: string | number
  subtitle?: string
  valueColor?: string
  iconClassName?: string
}

export type AttendanceStatsCardProps = {
  className?: string
  stats: AttendanceStatsType
  valueClassName?: string
}

export default function AttendanceStatsCard({
  className,
  stats,
  valueClassName,
}: AttendanceStatsCardProps) {
  const { icon, title, value, subtitle, valueColor, iconClassName } = stats
  const Icon = icon
  console.log(stats)
  // Format the value to show "--" for null/undefined/NaN values
  const formattedValue = (() => {
    if (
      value === null ||
      value === undefined ||
      (typeof value === "number" && isNaN(value))
    ) {
      return "--"
    }
    // Handle percentage values (both string and number types)
    if (typeof value === "string" && value.includes("%")) {
      const numValue = parseFloat(value)
      return isNaN(numValue)
        ? "--"
        : `${Number(numValue.toFixed(1)).toString()}%`
    }
    if (typeof value === "number") {
      // Only show decimals if they're non-zero
      return Number(value.toFixed(1)).toString()
    }
    return value
  })()

  return (
    <div
      className={cn(
        "card-shadow w-full rounded-[16px] px-6 py-7 @container @2xl:py-9",
        className
      )}>
      <div className="flex items-center gap-3 @sm:gap-5">
        <div className="flex-grow space-y-4">
          <p className="text-sm font-semibold text-title">{title}</p>
          <p
            className={cn(
              "font-barlow text-2xl font-bold text-title @sm:text-[32px]",
              valueClassName
            )}
            style={{ color: valueColor }}>
            {formattedValue}
          </p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className={cn("rounded-full p-3", iconClassName)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}
