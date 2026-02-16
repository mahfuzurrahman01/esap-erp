"use client"

import React from "react"
import Link from "next/link"

import cn from "@core/utils/class-names"
import { useTranslations } from "next-intl"
import { ActionIcon, Popover } from "rizzui"

import ThreeDotIcon from "@/components/icons/three-dot"

import { useDrawer } from "../drawer-views/use-drawer"
import { useModal } from "../modal-views/use-modal"

type ActionType = {
  label: string
  type: "link" | "modal" | "drawer"
  link?: string
  content?: React.ReactElement
  icon?: React.ReactNode
}

export default function ActionButton({
  className,
  actions,
}: {
  className?: string
  actions: Array<ActionType>
}) {
  const { openModal } = useModal()
  const { openDrawer } = useDrawer()
  const tableT = useTranslations("table")
  return (
    <div className={cn(className)}>
      <Popover shadow="sm" placement="left-start">
        <Popover.Trigger>
          <ActionIcon
            variant="outline"
            aria-label={tableT("table-text-action")}
            className="h-auto w-auto border-0 bg-transparent">
            <ThreeDotIcon className="size-5" />
          </ActionIcon>
        </Popover.Trigger>
        <Popover.Content className="card-shadow relative z-40 overflow-hidden rounded-lg border-transparent bg-paper p-1 before:absolute before:-end-4 before:-top-4 before:size-[50px] before:rounded-full before:bg-blue/50 before:blur-[50px] after:absolute after:-bottom-4 after:-start-4 after:size-[50px] after:rounded-full after:bg-red/50 after:blur-[50px] dark:bg-paper dark:text-title">
          <ul className="flex flex-col">
            {actions.map((action, index) => (
              <li
                key={index}
                className="w-full cursor-pointer gap-2 p-2 text-xs text-black hover:bg-gray-100 dark:text-gray-0 dark:hover:bg-gray-700 sm:text-sm"
                onClick={
                  action.type === "modal"
                    ? () =>
                        openModal({
                          view: action.content,
                        })
                    : action.type === "drawer"
                      ? () =>
                          openDrawer({
                            view: action.content,
                            placement: "right",
                          })
                      : undefined
                }>
                {action.type === "link" && action.link ? (
                  <Link
                    href={action.link}
                    passHref
                    className="flex items-center gap-2">
                    {action.icon && action.icon}
                    <span className="text-sm">{action.label}</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    {action.icon && action.icon}
                    <span className="text-sm">{action.label}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Popover.Content>
      </Popover>
    </div>
  )
}
