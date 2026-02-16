"use client"

import { useState } from "react"

import { useTranslations } from "next-intl"
import { ActionIcon, Flex, Popover } from "rizzui"

import { FolderIcon } from "@/components/icons/hrms/folder-icon"
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

type MenuPopoverProps = {
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

export default function MenuPopover({
  wrapperClassName,
  listClassName,
  placement = "bottom-end",
  size = "sm",
  rounded = "md",
  triggerButton,
  children,
}: MenuPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations("common")
  const trigger = triggerButton || (
    <ActionIcon
      variant="text"
      aria-label="Help"
      title="Help"
      className="flex h-[34px] w-[34px] dark:bg-gray-800 dark:text-gray-0 md:h-9 md:w-9">
      <FolderIcon className="size-5" />
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
      <Popover.Trigger>
        <div className="flex w-[80px] cursor-pointer items-center rounded-md backdrop-blur-md dark:bg-gray-800 dark:text-gray-0">
          {trigger}
          <span className="text-sm font-semibold">
            {t("text-documents-help")}
          </span>
        </div>
      </Popover.Trigger>
      <Popover.Content
        className={cn(
          "dropdown-gr card-shadow z-[9999] border-none px-2 py-2 dark:bg-paper",
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
