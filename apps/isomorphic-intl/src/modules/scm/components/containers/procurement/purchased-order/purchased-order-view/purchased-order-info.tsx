"use client"

import React from "react"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { getBillingStatusBadge } from "../purchased-order-list/status-badge"

interface InformationProps {
  purchasedOrderData?: any
}

const PurchasedOrderInfo: React.FC<InformationProps> = ({
  purchasedOrderData,
}) => {
  const t = useTranslations("form")

  return (
    <div className="p-6">
      <Text className="mb-4 text-lg font-bold">{t("form-information")}</Text>
      <div className="grid grid-cols-3 gap-6">
        <div>
          <Text className="font-medium">{t("form-supplier-name")}</Text>
          <Text className="font-bold">{purchasedOrderData?.supplierName}</Text>
        </div>
        <div>
          <Text className="font-medium">
            {t("form-expected-delivery-date")}
          </Text>
          <Text className="font-bold">
            {purchasedOrderData?.expectedDeliveryDate}
          </Text>
        </div>
        <div>
          <Text className="font-medium">
            {t("form-requisition-fiscal-position")}
          </Text>
          <Text className="font-bold">
            {purchasedOrderData?.fiscalPosition}
          </Text>
        </div>
        <div>
          <Text className="font-medium">
            {t("form-requisition-payments-terms")}
          </Text>
          <Text className="font-bold">{purchasedOrderData?.paymentTerms}</Text>
        </div>
        <div>
          <Text className="font-medium">
            {t("form-requisition-total-amount")}
          </Text>
          <Text className="font-bold">{purchasedOrderData?.totalAmount}</Text>
        </div>
        <div>
          <Text className="font-medium">{t("form-billing-status")}</Text>
          <Text className="font-bold">
            {getBillingStatusBadge(purchasedOrderData?.billingStatus)}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default PurchasedOrderInfo
