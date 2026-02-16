"use client"

import { useMemo } from "react"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Loader, Text } from "rizzui"

import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useWarehouseManagerById } from "@/modules/scm/hooks/inventory/warehouse/use-warehouse-manager"
import { WarehouseManager } from "@/modules/scm/types/inventory/warehouse/warehouse-manager-types"

export default function WarehouseManagerDrawerView({
  initialData,
}: {
  initialData: WarehouseManager
}) {
  const t = useTranslations("common")
  const { closeDrawer } = useDrawer()

  // Call useStockById directly in the component
  const { data, isLoading } = useWarehouseManagerById(Number(initialData?.id))

  // Use useMemo to memoize any derived data if needed
  const memoizedData: WarehouseManager | undefined = useMemo(
    () => data as WarehouseManager,
    [data]
  )

  if (isLoading) return <Loader />

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("text-warehouse-details")}
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
                    {t("text-name")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.name}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 px-5">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-contact")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.contact}`}
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
                    {dayjs(memoizedData?.createdDate).isValid()
                      ? dayjs(memoizedData?.createdDate).format("YYYY/MM/DD")
                      : ""}
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
                    {dayjs(memoizedData?.updatedDate).isValid()
                      ? dayjs(memoizedData?.updatedDate).format("YYYY/MM/DD")
                      : ""}
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
