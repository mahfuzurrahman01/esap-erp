"use client"

import SkeletonLoader from "@/components/base/skeleton-loader"
import SalesOrderForm from "@/modules/crm/components/containers/sales-orders/form"
import { useSalesOrderById } from "@/modules/crm/hooks/use-sales-order"
import { SalesOrder } from "@/modules/crm/types/sales-order"

export default function SalesOrderEditTemplate({ id }: { id: string }) {
  const { data, isLoading } = useSalesOrderById(id) as {
    data: { data: SalesOrder } | undefined
    isLoading: boolean
  }

  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <SalesOrderForm id={id} salesOrderData={data?.data} />
  )
}
