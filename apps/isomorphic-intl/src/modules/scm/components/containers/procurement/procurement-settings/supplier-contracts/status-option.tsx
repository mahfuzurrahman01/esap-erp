"use client"

import { useTranslations } from "next-intl"

import { Badge } from "@/components/ui"

function useSupplierContractStatusBadge(status: boolean) {
  const t = useTranslations("common")

  return (
    <Badge color={status ? "success" : "danger"} variant="flat" rounded="lg">
      {status ? t("text-active") : t("text-inactive")}
    </Badge>
  )
}

export const GetSupplierContractStatusBadge = ({
  status,
}: {
  status: boolean
}) => {
  const badge = useSupplierContractStatusBadge(status)

  return <div>{badge}</div>
}
