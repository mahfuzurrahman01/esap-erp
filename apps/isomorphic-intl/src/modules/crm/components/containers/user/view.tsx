"use client"

import Image from "next/image"

import manager from "@public/auth/manager.png"
import userCover from "@public/auth/user-cover.png"
import { useTranslations } from "next-intl"

import SkeletonLoader from "@/components/base/skeleton-loader"
import { useUserById } from "@/hooks/auth/use-user"
import { UserView } from "@/modules/crm/types/user"
import { useCountryById } from "@/modules/fms/hooks/use-country"

export default function UserDetailsContainer({ id }: { id?: string }) {
  const t = useTranslations("crm")
  const { data: output, isLoading } = useUserById(id) as {
    data: { data: UserView } | undefined
    isLoading: boolean
  }
  const userData = output?.data
  const { data: country } = useCountryById(Number(output?.data?.country!))
  const avatarUrl =
    userData?.profilePicturePath &&
    userData?.profilePicturePath.startsWith("http")
      ? userData?.profilePicturePath
      : manager.src

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl p-4">
        <SkeletonLoader />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      {userData && (
        <div className="mx-auto flex flex-col items-center">
          <div className="card-shadow min-w-3xl w-[46rem] mt-4 flex max-w-3xl flex-col gap-4 rounded-lg border border-none border-muted bg-gray-0 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-6">
              <div className="overflow-hidden rounded-lg pb-6">
                <div className="relative h-40 flex justify-center items-center">
                  <Image
                    src={userData?.coverPhotoPath || userCover}
                    alt="Cover"
                    height={900}
                    width={900}
                    className="h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>
                <div className="col-span-2 -mt-20 px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 place-content-center rounded-full border-[1.8px]">
                      <figure className="absolute inset-0 rounded-full">
                        <Image
                          fill
                          alt={t("text-user-avatar")}
                          src={avatarUrl}
                          className="rounded-full bg-white"
                          style={{ objectFit: "cover" }}
                        />
                      </figure>
                    </div>
                    <h2 className="z-0 text-2xl font-medium text-white">
                      {userData?.firstName} {userData?.lastName}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="card-shadow flex w-[46rem] flex-col gap-4 rounded-lg border border-none border-muted bg-gray-0 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-lg p-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex space-x-4">
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-dashed dark:border-gray-700">
                          <td className="pb-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-email")}:
                            </p>
                          </td>
                          <td className="pb-5">
                            <p className="mr-4 font-medium text-primary">
                              {userData?.applicationUser?.email}
                            </p>
                          </td>
                          <td className="pb-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-role")}:
                            </p>
                          </td>
                          <td className="pb-5">
                            <p className="font-medium dark:text-gray-0">
                              {userData?.roles}
                            </p>
                          </td>
                        </tr>
                        <tr className="border-b border-dashed dark:border-gray-700">
                          <td className="py-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-phone")}:
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {userData?.phoneNumber}
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-two-factor")}:
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {userData?.applicationUser?.twoFactorEnabled
                                ? t("text-enabled")
                                : t("text-disabled")}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td className="pt-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-country")}:
                            </p>
                          </td>
                          <td className="pt-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {country?.countryName}
                            </p>
                          </td>
                          <td className="pt-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-address")}:
                            </p>
                          </td>
                          <td className="pt-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {userData?.address}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
