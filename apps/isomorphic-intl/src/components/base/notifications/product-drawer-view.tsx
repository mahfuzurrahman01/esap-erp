import Image from "next/image"
import { useTranslations } from "next-intl"
import DrawerHeader from "@/components/base/drawer-header"
import { useDrawer } from "@/components/base/drawer-views/use-drawer"
import { useProductById } from "@/modules/crm/hooks/use-product"
import { ProductView } from "@/modules/crm/types/product"
import SkeletonLoader from "@/components/base/skeleton-loader"

export default function ProductDrawerView({ id }: { id: string }) {
  const { closeDrawer } = useDrawer()
  const t = useTranslations("crm")
  const { data: outputData, isLoading } = useProductById(id) as {
    data: { data: ProductView } | undefined
    isLoading: boolean
  }
  const dataById = outputData?.data

  const handleCloseDrawer = () => {
    closeDrawer()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl p-4">
        <SkeletonLoader />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <DrawerHeader
        heading={t("text-item-details")}
        onClose={handleCloseDrawer}
        headerClassName="mb-0"
      />
      <div className="p-0">
        <div className="px-8">
          {dataById?.productPicturePath && (
            <Image
              src={dataById?.productPicturePath}
              alt={t("text-product")}
              width={400}
              height={400}
              className="mt-4"
            />
          )}
          <table className="w-full border-collapse">
            <tbody>
              {[
                { label: t("text-name"), value: dataById?.name },
                { label: t("text-code"), value: dataById?.code },
                { label: t("text-actual-price"), value: dataById?.actualPrice },
                { label: t("text-sale-price"), value: dataById?.salePrice },
                { label: t("text-unit-cost"), value: dataById?.unitCost },
                { label: t("text-category"), value: dataById?.categoryName },
                { label: t("text-vat"), value: dataById?.tax },
                { label: t("text-discount"), value: dataById?.discount },
                {
                  label: t("text-attributes"),
                  value: dataById?.attributeNames?.join(", "),
                },
              ].map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-dotted border-gray-500/20">
                  <td className="font-base w-1/3 py-4 pr-4 text-gray-500 dark:text-gray-400">
                    {item.label}
                  </td>
                  <td className="py-4 font-semibold text-gray-900 dark:text-gray-0">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
