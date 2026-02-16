"use client"

import SkeletonLoader from "@/components/base/skeleton-loader"
import QuotationCreateForm from "@/modules/crm/components/containers/quotation/form"
import { useQuotationById } from "@/modules/crm/hooks/use-quotation"
import { Quotation } from "@/modules/crm/types/quotation"

export default function QuotationEditComponent({ id }: { id: string }) {
  const { data, isLoading } = useQuotationById(id) as {
    data: { data: Quotation } | undefined
    isLoading: boolean
  }

  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <QuotationCreateForm id={id} quotationData={data?.data} />
  )
}
