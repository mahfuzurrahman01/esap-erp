"use client"

import dynamic from "next/dynamic"
import React from "react"

import cn from "@core/utils/class-names"
import manager from "@public/auth/manager.png"
import { User } from "next-auth"
import { Avatar } from "rizzui"

import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useCurrentUser } from "@/hooks/auth/use-auth"
import { useUserById } from "@/hooks/auth/use-user"
import { UserList } from "@/types/auth"

const ProfileDrawerView = dynamic(
  () => import("@/components/container/auth/profile-drawer"),
  {
    ssr: false,
  }
)

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string
  avatarClassName?: string
}): React.ReactElement {
  const { openDrawer } = useDrawer()
  const { user, isLoading } = useCurrentUser()

  const {
      data,
    } = useUserById(user?.id) as {
      data: { data: UserList } | undefined
    }

  if (isLoading) {
    return (
      <div
        className={cn(
          "h-9 w-9 animate-pulse rounded-full bg-gray-200 sm:h-10 sm:w-10",
          buttonClassName
        )}
      />
    )
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        openDrawer({
          view: <ProfileDrawerView user={user as User} />,
          placement: "right",
          containerClassName: "max-w-[320px] dropdown-gr",
        })
      }}
      className={cn(
        "w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10",
        buttonClassName
      )}>
      <Avatar
        src={data?.data?.profilePicturePath || user?.avatar || manager.src}
        name={user?.name || "User"}
        className={cn("!h-8 w-8 sm:!h-9 sm:!w-9", avatarClassName)}
      />
    </button>
  )
}
