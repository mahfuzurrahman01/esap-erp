"use client"

import { useMemo } from "react"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Loader, Text } from "rizzui"

import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useReturnProcessById } from "@/modules/scm/hooks/logistic-and-transport/return-process/use-return-process"
import { ReturnProcess } from "@/modules/scm/types/logistics-and-transport/return-process/return-process-types"

import { getReturnProcessStatusBadge } from "./status-badge"

export default function ReturnProcessViewDrawer({
  initialData,
}: {
  initialData: ReturnProcess
}) {
  const t = useTranslations("common")
  const { closeDrawer } = useDrawer()

  // Call useStockById directly in the component
  const { data, isLoading } = useReturnProcessById(Number(initialData?.id))

  // Use useMemo to memoize any derived data if needed
  const memoizedData: ReturnProcess | undefined = useMemo(
    () => data as ReturnProcess,
    [data]
  )

  if (isLoading) return <Loader />

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("text-return-process-details")}
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4 px-8 py-4">
        <div className="flex space-x-4">
          <table className="w-full">
            <tbody>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-shipment-id")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.shipmentId}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-product-name")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.productName}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-reason-for-return")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.reasonForReturn}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-quantity-returned")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.quantityReturned}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-request-date")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {memoizedData?.requestDate
                      ? dayjs(memoizedData.requestDate).format("YYYY/MM/DD")
                      : "-"}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-return-status")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {getReturnProcessStatusBadge(
                      memoizedData?.returnStatus || "in-progress"
                    )}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-created-date")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {memoizedData?.createdDate
                      ? dayjs(memoizedData.createdDate).format("YYYY/MM/DD")
                      : "-"}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-updated-date")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {memoizedData?.updatedDate
                      ? dayjs(memoizedData.updatedDate).format("YYYY/MM/DD")
                      : "-"}
                  </Text>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
