"use client"

import Image from "next/image"

import manager from "@public/auth/manager.png"
import userCover from "@public/auth/user-cover.png"
import { useTranslations } from "next-intl"

import SkeletonLoader from "@/components/base/skeleton-loader"
import { useCustomerById } from "@/modules/crm/hooks/use-customers"
import { CustomerData } from "@/modules/crm/types/customer"
import { useCountryById } from "@/modules/fms/hooks/use-country"
import { useCurrencyById } from "@/modules/fms/hooks/use-currency"
import { useCOAById } from "@/modules/fms/hooks/use-coa"

export default function CustomerDetailsContainer({ id }: { id: string }) {
  const t = useTranslations("crm")
  const { data, isLoading } = useCustomerById(id) as {
    data: CustomerData | undefined
    isLoading: boolean
  }
  const { data: country } = useCountryById(Number(data?.country!))
  const { data: currencyById } : any = useCurrencyById(data?.currency!)
  const { data: coaById } : any = useCOAById(data?.chartOfAccountId!)

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl p-4">
        <SkeletonLoader />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      {data ? (
        <div className="mx-auto flex flex-col items-center">
          <div className="card-shadow min-w-3xl w-[46rem] mt-4 flex max-w-3xl flex-col gap-4 rounded-lg border border-none border-muted bg-gray-0 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-6">
              <div className="overflow-hidden rounded-lg pb-6">
              <div className="relative h-40 flex justify-center items-center">
                  <Image
                    src={data?.coverPhotoPath || userCover}
                    alt="userCover"
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
                          src={data?.photoPath || manager.src}
                          className="rounded-full bg-white"
                          style={{ objectFit: "cover" }}
                        />
                      </figure>
                    </div>
                    <h2 className="z-0 text-2xl font-medium text-white">
                      {data?.firstName} {data?.lastName}
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
                              {data?.email}
                            </p>
                          </td>
                          <td className="pb-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-account-no")}:
                            </p>
                          </td>
                          <td className="pb-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {data?.accountNo}
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
                              {data?.phone}
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-bank-name")}:
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {data?.bankName}
                            </p>
                          </td>
                        </tr>
                        <tr className="border-b border-dashed dark:border-gray-700">
                          <td className="py-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-currency")}:
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {currencyById?.currencyName}
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-account-head")}:
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {coaById?.chartOfAccountName}
                            </p>
                          </td>
                        </tr>
                        <tr className="border-b border-dashed dark:border-gray-700">
                          <td className="py-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-status")}:
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {data?.approvalStatus}
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-payment-terms")}:
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {data?.paymentTerms}
                            </p>
                          </td>
                        </tr>
                        <tr className="border-b border-dashed dark:border-gray-700">
                          <td className="py-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-company")}:
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {data?.company}
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-residence-permit-no")}:
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {data?.residencePermitNo}
                            </p>
                          </td>
                        </tr>
                        <tr className="border-b border-dashed dark:border-gray-700">
                          <td className="py-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-house")}:
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {data?.house}
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-street")}:
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {data?.street}
                            </p>
                          </td>
                        </tr>
                        <tr className="border-b border-dashed dark:border-gray-700">
                          <td className="py-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-city")}:
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {data?.city}
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-state")}:
                            </p>
                          </td>
                          <td className="py-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {data?.state}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td className="pt-5">
                            <p className="font-medium text-[#919EAB]">
                              {t("text-zip")}:
                            </p>
                          </td>
                          <td className="pt-5">
                            <p className="font-medium text-black dark:text-gray-0">
                              {data?.zip}
                            </p>
                          </td>
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
                        </tr> 
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 p-5">
          <p className="p-6 text-center">{t("text-no-data-available")}</p>
        </div>
      )}
    </div>
  )
}
