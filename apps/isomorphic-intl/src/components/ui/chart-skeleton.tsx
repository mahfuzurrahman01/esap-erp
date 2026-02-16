import { cn } from "@/utils/cn"
import { Skeleton } from "./skeleton"

export interface ChartSkeletonProps {
  className?: string
  headerClassName?: string
  showHeader?: boolean
  showLegend?: boolean
}

export function ChartSkeleton({
  className,
  headerClassName,
  showHeader = true,
  showLegend = true,
}: ChartSkeletonProps) {
  return (
    <div className={cn("animate-fade-in space-y-6", className)}>
      {/* Header */}
      {showHeader && (
        <div className={cn("flex justify-between", headerClassName)}>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-[150px]" />
              <Skeleton className="h-5 w-[60px]" />
            </div>
          </div>
          {showLegend && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-2.5 w-2.5 rounded-full" />
                <Skeleton className="h-4 w-[60px]" />
              </div>
              <div className="flex items-center gap-1.5">
                <Skeleton className="h-2.5 w-2.5 rounded-full" />
                <Skeleton className="h-4 w-[90px]" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chart Area */}
      <div className="relative h-[28rem] w-full">
        {/* Y-axis */}
        <div className="absolute left-0 top-0 flex h-full flex-col justify-between py-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="h-4 w-12" />
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-y-0 left-16 right-4 flex items-end justify-between gap-2 py-8">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className="flex flex-1 flex-col gap-2 self-stretch">
              <Skeleton 
                className={cn(
                  "w-full",
                  // Random heights for visual effect
                  `h-[${Math.floor(Math.random() * 60 + 20)}%]`
                )} 
              />
              <Skeleton 
                className={cn(
                  "w-full",
                  `h-[${Math.floor(Math.random() * 40 + 10)}%]`
                )} 
              />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 