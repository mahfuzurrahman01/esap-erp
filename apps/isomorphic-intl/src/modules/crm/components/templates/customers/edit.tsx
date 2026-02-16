"use client"

import SkeletonLoader from "@/components/base/skeleton-loader"
import CustomerEditForm from "@/modules/crm/components/containers/customers/edit-form"
import { useCustomerById } from "@/modules/crm/hooks/use-customers"

export default function CustomerEditTemplate({ id }: { id: string }) {
  const { data, isLoading }: any = useCustomerById(id)

  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <CustomerEditForm id={id} customerData={data} />
  )
}
