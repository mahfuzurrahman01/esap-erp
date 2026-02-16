"use client"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import Box from "@/components/ui/box"
import { StockReplenishment } from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-types"

import { getStockReplenishmentStatusBadge } from "./status-option"

export default function StockReplenishmentView({
  initialData,
}: {
  initialData: StockReplenishment
}) {
  const t = useTranslations("common")
  return (
    <Box className="p-6">
      <div className="grid w-full grid-cols-3 gap-x-6 gap-y-4">
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-sku")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.sku}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-product-name")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.productName}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-supplier-name")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.supplierName}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-current-stock")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.currentStock}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-replenishment-quantity")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.replenishmentQty}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-replenishment-method")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.replenishmentMethod}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-expected-delivery-date")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {initialData?.expectedDeliveryDate
              ? new Date(initialData.expectedDeliveryDate).toLocaleDateString(
                  "en-CA"
                )
              : ""}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-status")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {getStockReplenishmentStatusBadge(initialData?.status || "")}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-created-date")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {initialData?.createdDate
              ? new Date(initialData.createdDate).toLocaleDateString("en-CA")
              : ""}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-updated-date")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {initialData?.updatedDate
              ? new Date(initialData.updatedDate).toLocaleDateString("en-CA")
              : ""}
          </Text>
        </div>
      </div>
    </Box>
  )
}
