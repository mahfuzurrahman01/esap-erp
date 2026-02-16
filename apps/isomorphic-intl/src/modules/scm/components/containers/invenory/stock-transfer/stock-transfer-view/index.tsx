"use client"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { Input } from "@/components/ui"
import Box from "@/components/ui/box"
import { StockTransfer } from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-types"

import ProductViewTable from "./product-table"
import { getStockTransferStatusBadge } from "./status-option"

export default function StockTransferView({
  initialData,
}: {
  initialData: StockTransfer
}) {
  const t = useTranslations("common")
  return (
    <Box>
      <div className="grid w-full grid-cols-3 gap-x-6 gap-y-4 p-6">
        <div className="flex items-center">
          <Input
            label={t("text-transfer-to")}
            value={initialData?.transferToWarehouse}
            readOnly
            className="w-full"
            disabled
          />
        </div>
        <div className="flex items-center">
          <Input
            label={t("text-transfer-from")}
            value={initialData?.transferFromWarehouse}
            readOnly
            disabled
            className="w-full"
          />
        </div>
        <div className="flex items-center">
          <Input
            label={t("text-transfer-date")}
            value={
              initialData?.transferDate
                ? new Date(initialData.transferDate).toLocaleDateString("en-CA")
                : ""
            }
            readOnly
            disabled
            className="w-full"
          />
        </div>
        <div className="flex items-center">
          <Input
            label={t("text-created-date")}
            value={
              initialData?.createdDate
                ? new Date(initialData.createdDate).toLocaleDateString("en-CA")
                : ""
            }
            readOnly
            disabled
            className="w-full"
          />
        </div>
        <div className="flex items-center">
          <Input
            label={t("text-updated-date")}
            value={
              initialData?.updatedDate
                ? new Date(initialData.updatedDate).toLocaleDateString("en-CA")
                : ""
            }
            readOnly
            disabled
            className="w-full"
          />
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-status")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {getStockTransferStatusBadge(initialData?.status || "")}
          </Text>
        </div>
      </div>
      <ProductViewTable initialData={initialData} />
    </Box>
  )
}
