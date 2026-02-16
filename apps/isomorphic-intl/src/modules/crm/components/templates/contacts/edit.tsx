"use client"

import SkeletonLoader from "@/components/base/skeleton-loader"
import ContactEditForm from "@/modules/crm/components/containers/contact/edit-form"
import { useContactById } from "@/modules/crm/hooks/use-contact"
import { Contact } from "@/modules/crm/types/contact"

export default function ContactEditTemplate({ id }: { id: string }) {
  const { data: contactData, isLoading } = useContactById(id) as {
    data: Contact | undefined
    isLoading: boolean
  }
  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <ContactEditForm id={id} contactData={contactData} />
  )
}
