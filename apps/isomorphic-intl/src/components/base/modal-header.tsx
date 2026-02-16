"use client"

import cn from "@core/utils/class-names"
import { PiXBold } from "react-icons/pi"
import { ActionIcon, Title } from "rizzui"

import SelectIcon from "../icons/select"
import TrashIcon from "../icons/trash"

type ModalHeaderProps = {
  heading?: string
  onClose: () => void
  onDelete?: () => void
  onSelect?: () => void
  headerClassName?: string
  children?: React.ReactNode
}

export default function ModalHeader({
  onClose,
  onDelete,
  onSelect,
  heading,
  headerClassName,
  children,
}: ModalHeaderProps) {
  return (
    <div
      className={cn(
        "mb-4 flex items-center justify-between border-b border-gray-500/20 px-6 py-[14px]",
        headerClassName
      )}>
      <div className="flex items-center gap-4">
        {children}
        {heading && (
          <Title as="h4" className="font-bold">
            {heading}
          </Title>
        )}
      </div>

      <div className="flex items-center">
        {onDelete && (
          <ActionIcon
            variant="outline"
            onClick={onDelete}
            className="border-0 p-0">
            <TrashIcon className="h-auto w-5" />
          </ActionIcon>
        )}
        {onSelect && (
          <ActionIcon
            variant="outline"
            onClick={onSelect}
            className="border-0 p-0">
            <SelectIcon className="h-auto w-5" />
          </ActionIcon>
        )}
        <ActionIcon
          variant="outline"
          onClick={onClose}
          className="border-0 p-0">
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
    </div>
  )
}
