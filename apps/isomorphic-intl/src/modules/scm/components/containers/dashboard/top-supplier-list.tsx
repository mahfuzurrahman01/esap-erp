"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"
import { Text } from "rizzui"

import Avatar from "@/components/ui/avatar"
import { cn } from "@/utils/cn"

//test data
// const data = [
//   {
//     sl: 5,
//     supplierId: 60,
//     supplierName: "Ali C. Khan",
//     avatar:
//       "http://res.cloudinary.com/drpqnyimp/image/upload/v1733858304/Suppliers/qqiza5vhba5lmmnltnii.jpg",
//     totalOrders: 3,
//     totalValue: 189524.4,
//   },
//   {
//     sl: 6,
//     supplierId: 61,
//     supplierName: "test 404 test test",
//     avatar:
//       "http://res.cloudinary.com/drpqnyimp/image/upload/v1734954759/Suppliers/spywktdxhyvdeeyeg3uh.jpg",
//     totalOrders: 2,
//     totalValue: 196634,
//   },
//   {
//     sl: 3,
//     supplierId: 22,
//     supplierName: "Global  Supply  Co.",
//     avatar: "",
//     totalOrders: 2,
//     totalValue: 194210,
//   },
//   {
//     sl: 2,
//     supplierId: 2,
//     supplierName: "Amara L. Johnson",
//     avatar:
//       "http://res.cloudinary.com/drpqnyimp/image/upload/v1732184775/Suppliers/moha6b9uikwuhedqqv6d.jpg",
//     totalOrders: 2,
//     totalValue: 86382.53,
//   },
//   {
//     sl: 1,
//     supplierId: 1,
//     supplierName: "John A Smith",
//     avatar:
//       "http://res.cloudinary.com/drpqnyimp/image/upload/v1732183801/Suppliers/hcmja1195ibzg5da0oyn.jpg",
//     totalOrders: 1,
//     totalValue: 332530,
//   },
// ]

export default function TopSupplierList({ className, data }: { className?: string, data?: any }) {
  const t = useTranslations("common")
  return (
    <div
      title={t("text-top-supplier-list")}
      className={cn("mb-2 @2xl:mb-5", className)}>
      <Text className="text-title text-lg font-semibold mb-4">{t("text-top-supplier-list")}</Text>
      <div className="flex flex-col gap-4">
        {data?.length > 0 ? (
          data.map((item: any) => (
            <Link
              href={`/scm/suppliers/${item.supplierId}`}
              key={item.supplierId}>
              <div className="flex items-center gap-2 gap-y-4">
                <div className="flex h-20 w-20 items-center justify-center">
                  <Avatar src={item.avatar} size="3xl" rounded="md" />
                </div>
                <div className="text-title">
                  <Text className="text-lg font-semibold">
                    {item.supplierName}
                  </Text>
                  <Text className="text-sm">
                    {t("text-total-orders")}: {item.totalOrders}
                  </Text>
                  <Text className="text-sm">
                    {t("text-total-value")}: {item.totalValue}
                  </Text>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <Text className="text-center text-gray-500">{t("text-no-suppliers")}</Text>
        )}
      </div>
    </div>
  )
}
