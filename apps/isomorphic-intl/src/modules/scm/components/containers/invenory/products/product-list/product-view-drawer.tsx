"use client"

import Image from "next/image"
import { useMemo, useState } from "react"

import { useTranslations } from "next-intl"
import { Loader, Text } from "rizzui"

import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useProductById } from "@/modules/scm/hooks/inventory/product/use-product"
import { Product } from "@/modules/scm/types/inventory/products/products-types"

import { getWarehouseStatusBadge } from "../../warehouse/warehouse-list/status-badge"

export default function ProductViewDrawer({
  initialData,
}: {
  initialData: Product
}) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const t = useTranslations("common")
  const { closeDrawer } = useDrawer()

  // Call useStockById directly in the component
  const { data, isLoading } = useProductById(Number(initialData?.id))

  // Use useMemo to memoize any derived data if needed
  const memoizedData: Product | undefined = useMemo(
    () => data as Product,
    [data]
  )

  if (isLoading) return <Loader />

  const rawDescription = memoizedData?.description || ""
  const textWithoutHtml = rawDescription.replace(/<[^>]*>/g, "")
  const isLongDescription = textWithoutHtml.length > 200
  const displayedDescription =
    isLongDescription && !showFullDescription
      ? `${textWithoutHtml.substring(0, 200)}...`
      : textWithoutHtml

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("text-product-details")}
        onClose={closeDrawer}
        headerClassName="mb-0"
      />
      <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4 p-4">
        <div className="mx-auto pb-4">
          <Image
            src={
              memoizedData?.imageUrl ||
              "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp"
            }
            alt={`${memoizedData?.productName || "Product"}'s image`}
            width={400}
            height={353}
            className="rounded-md"
          />
        </div>
        <div className="flex space-x-4 px-4">
          <table className="w-full">
            <tbody>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-product-name")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.productName}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-product-category")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.productCategoryName}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-product-code")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.productCode}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-product-type")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.productType}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-is-fixed-asset")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.isFixedAsset ? "Yes" : "No"}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-item-unit")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.itemUnitName}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-company")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.companyName}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-asset-category")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.assetCategoryName === null ? "N/A" : memoizedData?.assetCategoryName}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-cost")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.cost}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-selling-price")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.sellingPrice}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-sale-tax")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.salesTax}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-purchase-price")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.purchasePrice}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-purchase-tax")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.purchaseTax}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-discount")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {`${memoizedData?.discount}`}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-status")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {getWarehouseStatusBadge(memoizedData?.status ?? false)}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-description")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {displayedDescription}
                  </Text>
                  {isLongDescription && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="text-blue-500 hover:underline">
                      {showFullDescription
                        ? t("text-show-less")
                        : t("text-show-more")}
                    </button>
                  )}
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-created-date")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {memoizedData?.createdDate
                      ? new Date(memoizedData.createdDate).toLocaleDateString(
                          "en-CA"
                        )
                      : ""}
                  </Text>
                </td>
              </tr>
              <tr className="gap-4 border-b border-dotted border-gray-500/20 pb-4">
                <td className="py-5">
                  <Text className="font-base text-gray-500 dark:text-gray-400">
                    {t("text-updated-date")}
                  </Text>
                </td>
                <td className="py-5">
                  <Text className="ml-3 font-semibold text-gray-900 dark:text-gray-0">
                    {memoizedData?.updatedDate
                      ? new Date(memoizedData.updatedDate).toLocaleDateString(
                          "en-CA"
                        )
                      : ""}
                  </Text>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
