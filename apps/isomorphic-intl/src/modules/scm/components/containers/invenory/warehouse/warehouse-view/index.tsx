"use client"

import { useTranslations } from "next-intl"
import { Checkbox, Text } from "rizzui"

import Box from "@/components/ui/box"
import { Warehouse } from "@/modules/scm/types/inventory/warehouse/warehouse-types"

import { getWarehouseStatusBadge } from "./status-option"

export default function WarehouseView({
  initialData,
}: {
  initialData: Warehouse
}) {
  const t = useTranslations("common")
  return (
    <Box className="p-6">
      <div className="grid w-full grid-cols-3 gap-x-6 gap-y-4">
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-warehouse-name")}
          </Text>

          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.warehouseName}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-warehouse-manager")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.warehouseManagerName}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-company")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.companyName}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-locations")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.location}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-operational-hours")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.startHour} - ${initialData?.endHour}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-capacity")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.capacity}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-in-use-capacity")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.inUseCapacity}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-bin-location")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.binLocation}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-zoning-location")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.zoningLocation}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-emergency-contact")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.emergencyContact}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-picked-by")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.pickedBy}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-packed-by")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.packedBy}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-date-picked")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.datePicked}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-quantity-to-pick")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${initialData?.quantityToPick}`}
          </Text>
        </div>

        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-status")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {getWarehouseStatusBadge(initialData?.status ?? false)}
          </Text>
        </div>
        <div className="col-span-full flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-fire-safety-compliance")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            <Checkbox
              label={t("text-fire-safety-compliance")}
              checked={initialData?.fireSafetyCompliance}
              readOnly
            />
          </Text>
        </div>
        <div className="col-span-full flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-temperature-controlled")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            <Checkbox
              label={t("text-temperature-controlled")}
              checked={initialData?.temperatureControlled}
              readOnly
            />
          </Text>
        </div>
      </div>
    </Box>
  )
}
