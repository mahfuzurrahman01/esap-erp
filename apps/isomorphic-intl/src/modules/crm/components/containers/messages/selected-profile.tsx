import React from "react"
import Image from "next/image"
import demoAvatar from "@public/auth/avatar.webp"
import { useTranslations } from "next-intl"
import { BsTelephoneFill } from "react-icons/bs"
import { FaEnvelope } from "react-icons/fa"
import { useUserById } from "@/modules/crm/hooks"
import { UserList } from "@/types/auth"
import SkeletonLoader from "@/components/base/skeleton-loader"
import { MapPinIcon } from "@/components/icons/crm/map-pin"
import { EmailIcon } from "@/components/icons/crm/email"
import { TelIcon } from "@/components/icons/crm/tel"

export default function SelectedProfile({ id }: { id: string }) {
  const t = useTranslations("crm")
  const {
    data,
    isLoading: isUserLoading,
    error,
  } = useUserById(id) as {
    data: { data: UserList } | undefined
    isLoading: boolean
    error: Error | null
  }

  if (isUserLoading) {
    return <SkeletonLoader />
  }
  return (
    <div className="mx-auto border-l bg-white py-8 text-center dark:border-gray-700 dark:bg-gray-800 max-sm:hidden md:w-1/4">
      <div className="flex flex-col items-center py-2">
        <Image
          src={data?.data?.profilePicturePath || demoAvatar.src}
          alt="User Avatar"
          width={80}
          height={80}
          className="rounded-full"
        />
        <h2 className="mt-3 text-lg font-medium">
          {" "}
          {data?.data?.firstName || "---"}
        </h2>
        <p className="pt-1 text-sm text-gray-500 px-5 break-all">
          {data?.data?.roles || "---"}
        </p>
      </div>
      <div className="mt-8">
        <h3 className="bg-[#f4f6f8] px-5 py-3 text-left text-xs font-semibold font-sans text-[#637381] dark:bg-gray-700 dark:text-gray-500 uppercase">
          {t("text-information")}
        </h3>
        <div className="mt-3 space-y-3 px-5 text-left">
          <div className="flex items-center py-2 text-sm text-gray-700">
            <MapPinIcon className="-ml-1 size-5 text-gray-500" />
            <span className="ml-2 dark:text-gray-100">
              {data?.data?.address || "---"}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-700 -ml-1">
            <TelIcon className="mr-2 size-5 text-gray-500" />
            <span className="dark:text-gray-100">
              {data?.data?.phoneNumber || "---"}
            </span>
          </div>
          <div className="flex items-center py-2 text-sm text-gray-700 -ml-1">
            <EmailIcon className="mr-2 size-5 text-gray-500" />
            <span className="dark:text-gray-100">
              {data?.data?.applicationUser?.email || "---"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
