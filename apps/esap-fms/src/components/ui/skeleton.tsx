"use client"

import { cn } from "@/utils/cn"
import { tv } from "tailwind-variants"

const skeletonStyles = tv({
  base: "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
  variants: {
    variant: {
      text: "h-4",
      circular: "rounded-full",
      rectangular: "rounded-md",
    },
  },
  defaultVariants: {
    variant: "rectangular",
  },
})

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular"
  className?: string
}

export function Skeleton({ 
  variant, 
  className, 
  ...props 
}: SkeletonProps) {
  return (
    <div
      className={cn(skeletonStyles({ variant }), className)}
      {...props}
    />
  )
} 