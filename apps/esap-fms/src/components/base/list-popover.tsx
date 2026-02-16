"use client"

import { useState } from "react"

import { PiDotsThreeVerticalBold } from "react-icons/pi"
import { ActionIcon, Flex, Popover } from "rizzui"

import { cn } from "@/utils/cn"

type PopoverPlacements =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"

type PopoverSizes = "sm" | "md" | "lg" | "xl"
type PopoverRounded = "sm" | "md" | "lg" | "none" | "pill"

type ListPopoverProps = {
  wrapperClassName?: string
  listClassName?: string
  placement?: PopoverPlacements
  size?: PopoverSizes
  rounded?: PopoverRounded
  triggerButton?: React.ReactElement
  children:
    | React.ReactNode
    | ((props: { setOpen: (value: boolean) => void }) => React.ReactNode)
}

export default function ListPopover({
  wrapperClassName,
  listClassName,
  placement = "left",
  size = "sm",
  rounded = "md",
  triggerButton,
  children,
}: ListPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)

  const trigger = triggerButton || (
    <ActionIcon
      variant="outline"
      aria-label="List Item"
      className="h-7 w-7 cursor-pointer border-transparent">
      <PiDotsThreeVerticalBold className="size-5" />
    </ActionIcon>
  )
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size={size}
      rounded={rounded}
      placement={placement}
      arrowClassName="dark:fill-paper [&>path]:stroke-transparent">
      <Popover.Trigger>{trigger}</Popover.Trigger>
      <Popover.Content
        className={cn(
          "dropdown-gr card-shadow z-10 border-none px-2 py-2 text-title dark:bg-paper",
          wrapperClassName
        )}>
        {({ setOpen }) => (
          <div
            className={cn("min-w-[180px] pb-2 pt-1 text-start", listClassName)}>
            <Flex direction="col" gap="1" as="ul">
              {typeof children === "function"
                ? children({ setOpen })
                : children}
            </Flex>
          </div>
        )}
      </Popover.Content>
    </Popover>
  )
}
