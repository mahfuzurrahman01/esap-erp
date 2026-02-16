import React from "react"
import { Text, Title } from "rizzui"
import Avatar from "@/components/ui/avatar"
import demoAvatar from "@public/auth/avatar.webp"
import { useUserList } from "@/hooks/auth/use-user"
import SkeletonLoader from "@/components/base/skeleton-loader"
import { useTranslations } from "next-intl"

export default function UserList() {
  const t = useTranslations("crm")
  const { data, isLoading } = useUserList()
  const userList = data?.data || []
  if(isLoading){
    return <SkeletonLoader row={1} />
  }
  const limitedUserList = userList.slice(0, 2)
  return (
    <div>
      <h5 className="pb-4 font-medium text-gray-700">{t("text-new-contact")}</h5>
      {limitedUserList && limitedUserList.map((user, index) => {
        const avatarUrl =
        user.profilePicturePath &&
        user.profilePicturePath.startsWith("http")
          ? user.profilePicturePath
          : demoAvatar.src
        return(
        <div className="mb-4 flex items-center pl-[10px]" key={index}>
          <div className="relative inline-flex flex-shrink-0">
            <Avatar
              src={avatarUrl}
              name={user.firstName}
              className="flex-shrink-0 shadow-sm xs:!h-10 xs:!w-10"
            />
          </div>
          <div className="flex w-[calc(100%-44px)] items-center justify-between gap-2 ps-2.5">
            <div className="w-[calc(100%-40px)]">
              <Title as="h4" className="text-sm font-normal">
                {user.roles}
              </Title>
              <Text className="w-[98%] truncate text-gray-500">
                {user.email}
              </Text>
            </div>
          </div>
        </div>
      )}
      )}
    </div>
  )
}
