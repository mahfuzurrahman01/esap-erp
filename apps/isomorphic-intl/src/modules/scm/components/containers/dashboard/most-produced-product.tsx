"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { MdOutlineProductionQuantityLimits } from "react-icons/md"
import { Text } from "rizzui"

import Avatar from "@/components/ui/avatar"
import Box from "@/components/ui/box"

export default function MostProducedProduct({
  className,
  data,
}: {
  className?: string
  data?: any
}) {
  const t = useTranslations("common")

  const isEmpty = !data || Object.keys(data).length === 0 || data.length === 0

  return (
    <div className={className}>
      <Text className="text-title text-2xl font-bold">{t("text-most-produced-product")}</Text>
      <div className="flex flex-col gap-5">
        {isEmpty ? (
          <Text className="text-center text-gray-500">{t("text-no-produced-products")}</Text>
        ) : (
          <div className="flex flex-col gap-4">
            {data?.slice(0, 3).map((item: any) => (
              <Box className="p-3 !rounded-xl !shadow-2xl !mt-2 md:!mt-2" key={item.productId}>
                <Link
                  href={`/scm/products`}
                  className="flex items-center gap-5">
                  <Avatar src={item.productImage} rounded="md" />

                  <div className="flex flex-col gap-2">
                    <Text className="font-semibold text-title">
                      {item.productName}
                    </Text>
                    <div className="flex items-center gap-2">
                      <MdOutlineProductionQuantityLimits className="font-bold text-yellow-500" />
                      <Text className="text-title">{item.totalQuantity}</Text>
                    </div>
                  </div>
                </Link>
              </Box>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
