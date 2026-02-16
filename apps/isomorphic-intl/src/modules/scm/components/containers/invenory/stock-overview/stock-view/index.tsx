"use client"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import Box from "@/components/ui/box"
import { Stock } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types"

export default function StockView({ initialData }: { initialData: Stock }) {
  const t = useTranslations("common")

  return (
    <Box className="p-6">
      <div className="grid w-full grid-cols-3 gap-x-6 gap-y-4">
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
            {t("text-current-quantity")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.currentQuantity}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-reorder-level")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.reorderLevel}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-reorder-quantity")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.reorderQuantity}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-serials-number")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.serialNumber}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-stocks-location")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.stockLocation}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-stock-valuation-method")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.stockValuationMethod}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-sku")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {initialData?.sku}
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
