import React from "react"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import FormGroup from "@/components/base/form-group"

export default function QuotationSummary(data: any) {
  const t = useTranslations("form")
  const summary = data?.summary
  return (
    <FormGroup title={t("form-total")} className="pt-7">
      <div className="col-span-2 ms-auto grid w-full gap-3.5 px-5 pb-7 text-sm text-gray-600 @xl:max-w-xs">
        <Text className="flex items-center justify-between">
          Subtotal:{" "}
          <Text as="span" className="font-medium text-gray-700">
            {summary?.subtotal || 0}
          </Text>
        </Text>
        <Text className="flex items-center justify-between">
          Discount:{" "}
          <Text as="span" className="font-medium text-gray-700">
            {summary?.discountAmount || 0}
          </Text>
        </Text>
        <Text className="flex items-center justify-between">
          Tax:{" "}
          <Text as="span" className="font-medium text-red">
            {summary?.taxes || 0}
          </Text>
        </Text>
        <Text className="flex items-center justify-between text-base font-semibold text-gray-900">
          Total: <Text as="span">{summary?.total || 0}</Text>
        </Text>
      </div>
    </FormGroup>
  )
}
