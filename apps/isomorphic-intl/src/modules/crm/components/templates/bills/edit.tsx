"use client"

import SkeletonLoader from "@/components/base/skeleton-loader"
import { useBillById } from "@/modules/crm/hooks/use-bill"
import { Bill } from "@/modules/crm/types/bill"

import BillForm from "@/modules/crm/components/containers/bills/form"

export default function BillEditTemplate({ id }: { id: string }) {
  const { data: billData, isLoading } = useBillById(id) as {
    data: Bill | undefined
    isLoading: boolean
  }

  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <BillForm id={id} billData={billData} />
  )
}
