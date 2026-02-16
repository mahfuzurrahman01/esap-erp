import { cn } from "@/utils/cn"
import { Skeleton } from "./skeleton"

export interface TableSkeletonProps {
  rows?: number
  columns?: number
  className?: string
  showHeader?: boolean
  columnWidths?: number[]
  rowClassName?: string
  headerClassName?: string
}

export function TableSkeleton({
  rows = 10,
  columns = 5,
  className,
  showHeader = true,
  columnWidths,
  rowClassName,
  headerClassName,
}: TableSkeletonProps) {
  // Use provided column widths or generate default ones
  const widths = columnWidths || Array(columns).fill(240)

  return (
    <div className={cn("space-y-4 animate-fade-in", className)}>
      {/* Header skeleton */}
      {showHeader && (
        <div className={cn("flex items-center gap-4", headerClassName)}>
          {widths.map((width, idx) => (
            <Skeleton
              key={`header-${idx}`}
              className={cn(
                "h-8",
                idx === 0 ? "w-[60px]" : `w-[${width}px]`
              )}
            />
          ))}
        </div>
      )}

      {/* Rows skeleton */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div 
          key={`row-${rowIdx}`} 
          className={cn(
            "flex items-center gap-4 transition-opacity",
            rowClassName
          )}
          style={{
            opacity: 1 - rowIdx * 0.1, // Fade out effect for lower rows
          }}
        >
          {widths.map((width, colIdx) => (
            <Skeleton
              key={`cell-${rowIdx}-${colIdx}`}
              className={cn(
                "h-12",
                colIdx === 0 ? "w-[60px]" : `w-[${width}px]`
              )}
            />
          ))}
        </div>
      ))}
    </div>
  )
} 