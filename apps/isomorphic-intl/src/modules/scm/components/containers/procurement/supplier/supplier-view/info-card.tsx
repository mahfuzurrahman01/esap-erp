"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { Supplier } from "@/modules/scm/types/procurement/supplier/supplier-types"

type indexProps = {
  supplierData: Supplier // Ensure this is defined as needed
}

export default function SupplierInfoCard({ supplierData }: indexProps) {
  const t = useTranslations("common")
  return (
    <div className="card-shadow mx-4 my-6 rounded-lg border-none bg-gray-0 p-6 @container dark:bg-gray-800">
      <div className="mb-6 flex-shrink-0">
        <Image
          // src={
          //   supplierData?.imageUrl
          //     ? supplierData.imageUrl
          //     : "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-01.webp"
          //   }
          src={`https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-01.webp`}
          alt={`${supplierData?.firstName || "Supplier"}'s avatar`}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full"
        />
      </div>

      {/* Supplier Information */}
      <div className="grid w-full grid-cols-3 gap-x-6 gap-y-4">
        {/* Left Column */}
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-supplier-name")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${supplierData?.firstName} ${supplierData?.middleName} ${supplierData?.lastName}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-company-address")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {`${supplierData?.companyAddress}`}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-company-name")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {supplierData?.companyName}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-zip-code")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {supplierData?.zipCode}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-country")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {supplierData?.countryId}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-street")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {supplierData?.street || "--"}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-contact-number")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {supplierData?.contactNumber}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-contact-email")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {supplierData?.contactEmail}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-city")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {supplierData?.city}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-state")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {supplierData?.state}
          </Text>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-company-website")}
          </Text>
          <Link
            href={supplierData?.companyWebsite || ""}
            className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {supplierData?.companyWebsite
              ? supplierData?.companyWebsite.length > 15
                ? `${supplierData?.companyWebsite.slice(0, 15)}...`
                : supplierData?.companyWebsite
              : " - "}
          </Link>
        </div>
        <div className="flex items-center">
          <Text className="font-base text-gray-500 dark:text-gray-400">
            {t("text-supplier-category")}
          </Text>
          <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
            {supplierData?.supplierCategoryId}
          </Text>
        </div>
      </div>
    </div>
  )
}
