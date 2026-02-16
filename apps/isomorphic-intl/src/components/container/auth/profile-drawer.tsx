"use client"

import Link from "next/link"

import manager from "@public/auth/manager.png"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import { useTranslations } from "next-intl"
import { Avatar, Text, Title } from "rizzui"

import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { PermissionIcon } from "@/components/icons/crm/permission"
import { ProfileIcon } from "@/components/icons/crm/profile"
import { RoleIcon } from "@/components/icons/crm/role"
import { SettingIcon } from "@/components/icons/crm/setting"
import { UserIcon } from "@/components/icons/crm/user"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { useUserById, useUserList } from "@/hooks/auth/use-user"
import { AiOutlinePlus } from "react-icons/ai"
import { UserList } from "@/types/auth"

export default function ProfileDrawerView({ user }: { user: User }) {
  const t = useTranslations("common")
  const { closeDrawer } = useDrawer()
  const {
    data:userData,
  } = useUserById(user?.id) as {
    data: { data: UserList } | undefined
  }

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  const menuItems = [
    {
      name: "text-my-profile",
      href: routes.crm.viewProfile(user?.id!),
      icon: ProfileIcon,
    },
    {
      name: "text-edit-profile",
      href: routes.crm.editProfile(user?.id!),
      icon: SettingIcon,
    },
    {
      name: "text-user",
      href: routes.crm.users,
      icon: UserIcon,
    },
    {
      name: "text-roles",
      href: routes.crm.roles,
      icon: RoleIcon,
    },
    {
      name: "text-permissions",
      href: routes.crm.permissions,
      icon: PermissionIcon,
    },
    {
      name: "text-activity-log",
      href: routes.crm.activityLog,
      icon: UserIcon,
    },
  ]

  const { data } = useUserList()
  const users = data?.data || []
  const latestUsers = [...users]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3)

  return (
    <>
      <DrawerHeader
        heading=""
        onClose={handleCloseDrawer}
        headerClassName="absolute border-none p-4"
      />
      <div className="flex h-full flex-col">
        {/* Header Section */}
        <div className="mt-8 flex flex-col items-center border-b border-dashed px-6 py-8 border-gray-300 dark:border-gray-700">
          <Avatar
            src={userData?.data?.profilePicturePath || user?.avatar || manager.src}
            name={userData?.data?.firstName || user?.name || "User"}
            customSize={86}
            className="rounded-full border-2 border-green-500"
          />
          <div className="my-4 text-center">
            <Title as="h6" className="text-lg font-semibold text-gray-800 pt-4 pb-2">
              {userData?.data?.firstName || user?.name || "User"}
            </Title>
            <Text className="text-sm text-gray-500">
              {user?.email || "user@example.com"}
            </Text>
          </div>
          <div className="mt-4 flex gap-2">
            {latestUsers.slice(0, 3).map((userItem, index) => {
              const profilePicture = userItem.profilePicturePath
                ? userItem.profilePicturePath
                : manager.src
              return (
                <Link
                  href={`${routes.crm.users}/${userItem?.userId}`}
                  title={t("text-user-details")}
                  key={index}>
                  <Avatar
                    src={profilePicture!}
                    name={userItem.firstName || "User"}
                    className="h-8 w-8 rounded-full border-2 border-gray-300"
                  />
                </Link>
              )
            })}
            <Link href={routes.crm.userCreate} title={t("text-add-new-user")}>
              <Button
                className="flex h-10 w-10 items-center justify-center rounded-full border-[1px] bg-gray-100 border-dashed border-gray-300 dark:bg-gray-700 dark:border-gray-600 p-0"
                variant="text">
                <AiOutlinePlus className="size-5 dark:text-gray-500" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Menu Section */}
        <div className="flex-grow px-6 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex gap-3 rounded-lg px-4 py-3 font-medium duration-200 hover:bg-primary/15 hover:text-primary items-center">
              <item.icon className="size-6" />
              {t(item.name)}
            </Link>
          ))}
        </div>

        {/* Logout Section */}
        <div className="border-t px-6 py-4 border-gray-300 dark:border-gray-700 border-dashed">
          <Button
            className="w-full rounded-md  py-6 text-sm font-bold"
            onClick={() => signOut()}>
            {t("text-sign-out")}
          </Button>
        </div>
      </div>
    </>
  )
}
