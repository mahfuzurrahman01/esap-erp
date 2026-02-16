"use client"

import Image from "next/image"
import React from "react"

import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { Loader, Text } from "rizzui"

import { useSupplierById } from "@/modules/scm/hooks/procurement/supplier/use-supplier"
import { PurchasedOrder } from "@/modules/scm/types/procurement/purchased-order/purchased-order-types"

import {
  getApprovalStatusBadge,
  getBillingStatusBadge,
} from "../purchased-order-list/status-badge"

interface PurchasedOrderInfoCardProps {
  purchasedOrderData: PurchasedOrder
}

export default function PurchasedOrderInfoCard({
  purchasedOrderData,
}: PurchasedOrderInfoCardProps) {
  const t = useTranslations("form")
  const { data: supplierData, isLoading } = useSupplierById(
    purchasedOrderData?.supplierId ?? 0
  )
  if (isLoading) return <Loader />
  return (
    <div className="card-shadow mx-4 mb-2 rounded-lg border-none bg-gray-0 px-6 pb-2 @container dark:bg-gray-800">
      <div className="relative z-0 px-4 pt-20 md:-mx-5 md:px-5 lg:-mx-8 lg:px-8 xl:-mx-6 xl:px-6 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10">
        <div className="absolute left-0 top-0 z-0 grid w-full grid-cols-1 gap-6 rounded-t-lg">
          <div className="overflow-hidden rounded-lg pb-6">
            <div className="relative h-40">
              <Image
                src="https://res.cloudinary.com/dtsm9eluo/image/upload/v1731687214/Rectangle_34624413_rdfwxu.jpg"
                alt="userCover"
                className="h-full w-full"
                fill
                layout="auto"
              />
              <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>
            <div
              className="col-span-2 px-6 py-4"
              style={{ marginTop: "-85px" }}>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 flex-shrink-0 place-content-center rounded-full border-[1.8px]">
                  <figure className="absolute inset-0 rounded-full">
                    <Image
                      fill
                      alt="supplier-image"
                      // src={"https://isomorphic-furyroad.s3.amazonaws.com/public/profile-image.webp"}
                      src={(supplierData as any)?.imageUrl ?? ""}
                      className="rounded-full bg-white"
                      style={{ objectFit: "cover" }}
                    />
                  </figure>
                </div>
                <h2 className="z-0 text-2xl font-medium text-white">
                  {purchasedOrderData?.supplierName}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-screen-2xl pb-6 pt-28">
          {/* Supplier Information */}
          <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4">
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-requisition-id")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {purchasedOrderData?.requisitionId}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-purchase-order-no")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {purchasedOrderData?.purchaseOrderNo}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-purchase-order-date")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {purchasedOrderData?.poDate
                    ? new Date(purchasedOrderData.poDate).toLocaleDateString(
                        "en-CA"
                      )
                    : ""}
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-requisition-payments-terms")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {purchasedOrderData?.paymentTerms}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-expected-delivery-date")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {purchasedOrderData?.expectedDeliveryDate
                    ? new Date(
                        purchasedOrderData.expectedDeliveryDate
                      ).toLocaleDateString("en-CA")
                    : ""}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-fiscal-position")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {purchasedOrderData?.fiscalPosition}
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-order-amount")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {purchasedOrderData?.orderAmount}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-currency")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {purchasedOrderData?.currencyName}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-billing-status")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {getBillingStatusBadge(
                    purchasedOrderData?.billingStatus ?? ""
                  )}
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-approved-date")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {purchasedOrderData?.purchasedOrderApproval?.approvedDate
                    ? new Date(
                        purchasedOrderData.purchasedOrderApproval.approvedDate
                      ).toLocaleDateString("en-CA")
                    : ""}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-approved-status")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {getApprovalStatusBadge(
                    purchasedOrderData?.purchasedOrderApproval
                      ?.approvalStatus ?? " pending"
                  )}
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-approved-by")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {purchasedOrderData?.purchasedOrderApproval?.approvedBy ||
                    "N/A"}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-approved-notes")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {purchasedOrderData?.purchasedOrderApproval?.approveNotes ||
                    "N/A"}
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 py-3">
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-created-date")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {purchasedOrderData?.createdDate
                    ? dayjs(purchasedOrderData.createdDate).format("YYYY-MM-DD")
                    : "N/A"}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("form-updated-date")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {purchasedOrderData?.updatedDate
                    ? dayjs(purchasedOrderData.updatedDate).format("YYYY-MM-DD")
                    : "N/A"}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
