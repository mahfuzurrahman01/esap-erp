"use client"

import React, { ReactNode } from "react"

import { PiStarFill } from "react-icons/pi"
import { Flex } from "rizzui/flex"

import { Badge } from "@/components/ui"
import Box from "@/components/ui/box"
import { cn } from "@/utils/cn"

interface BoxLayoutProps {
  children: ReactNode
  title: string
  headingRight?: ReactNode
  isFeatured?: boolean
  className?: string
  headingClassName?: string
}

export default function BoxLayout({
  children,
  title,
  headingRight,
  isFeatured = false,
  className,
  headingClassName,
}: BoxLayoutProps) {
  return (
    <Box
      className={cn(
        "border-transparent p-6 !shadow-none @container @5xl:p-10 @7xl:rounded-[40px] @7xl:p-12",
        className
      )}>
      <div
        className={cn(
          "flex items-center justify-between pb-6 @xl:pb-12",
          headingClassName
        )}>
        <Flex className="items-center gap-4">
          <h2 className="text-2xl @xl:text-[32px] font-bold">{title}</h2>
          {isFeatured && (
            <Badge
              color="danger"
              className="hidden gap-1 @xl:inline-flex @xl:h-8">
              <PiStarFill />
              Featured
            </Badge>
          )}
        </Flex>
        {headingRight}
      </div>
      {children}
    </Box>
  )
}
