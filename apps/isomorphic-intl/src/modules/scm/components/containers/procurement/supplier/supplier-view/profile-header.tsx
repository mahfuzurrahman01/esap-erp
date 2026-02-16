"use client"

import Image from "next/image"
import Link from "next/link"
import React from "react"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import { Supplier } from "@/modules/scm/types/procurement/supplier/supplier-types"

interface SupplierProfileHeaderProps {
  supplier: Supplier
}

export default function SupplierProfileHeader({
  supplier,
}: SupplierProfileHeaderProps) {
  const t = useTranslations("common")
  return (
    <div className="card-shadow mx-4 mb-2 rounded-lg border-none bg-gray-0 px-6 pb-2 @container dark:bg-gray-800">
      <div className="relative z-0 px-4 pt-40 md:-mx-5 md:px-5 lg:-mx-8 lg:px-8 xl:-mx-6 xl:px-6 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10">
        <div className="absolute left-0 top-0 z-0 grid w-full grid-cols-1 gap-6 rounded-t-lg">
          <div className="overflow-hidden rounded-lg pb-6">
            <div className="relative h-40 mx-2">
              <Image
                src="https://res.cloudinary.com/dtsm9eluo/image/upload/v1731687214/Rectangle_34624413_rdfwxu.jpg"
                alt="userCover"
                className="h-full w-full rounded-t-lg"

                fill
                layout="auto"
              />
              <div className="absolute inset-0 bg-black opacity-60 rounded-t-lg"></div>
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
                      src={
                        supplier.imageUrl ||
                        "https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-01.webp"
                      }
                      className="rounded-full bg-white"
                      style={{ objectFit: "cover" }}
                    />
                  </figure>
                </div>
                <h2 className="z-0 text-2xl font-medium text-white">
                  {supplier.firstName} {supplier.lastName}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-screen-2xl py-6">
          {/* Supplier Information */}
          <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4">
            {/* Left Column */}
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("text-supplier-name")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {`${supplier.firstName} ${supplier.middleName} ${supplier.lastName}`}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("text-company-address")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {`${supplier.companyAddress ? supplier.companyAddress : "--"}`}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("text-company-name")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {supplier.companyName ? supplier.companyName : "--"}
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("text-zip-code")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {supplier.zipCode ? supplier.zipCode : "--"}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("text-country")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {supplier.countryName ? supplier.countryName : "--"}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("text-street")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {supplier.street ? supplier.street : "--"}
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("text-contact-number")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {supplier.contactNumber ? supplier.contactNumber : "--"}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("text-contact-email")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {supplier.contactEmail ? supplier.contactEmail : "--"}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("text-city")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {supplier.city ? supplier.city : "--"}
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 border-b border-dashed border-gray-500/20 py-3">
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("text-state")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {supplier.state ? supplier.state : "--"}
                </Text>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("text-company-website")}
                </Text>
                <Link
                  href={supplier.companyWebsite || "--"}
                  className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {supplier.companyWebsite
                    ? supplier.companyWebsite.length > 15
                      ? `${supplier.companyWebsite.slice(0, 15)}...`
                      : supplier.companyWebsite
                    : "--"}
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <Text className="font-base text-gray-500 dark:text-gray-400">
                  {t("text-supplier-category")}
                </Text>
                <Text className="mr-5 font-semibold text-gray-900 dark:text-gray-0">
                  {supplier.supplierCategoryName ? supplier.supplierCategoryName : "--"}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
