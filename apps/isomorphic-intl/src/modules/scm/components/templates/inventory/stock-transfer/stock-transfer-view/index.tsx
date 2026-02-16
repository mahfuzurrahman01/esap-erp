"use client"

import { useParams, useRouter } from "next/navigation"

import PageHeader from "@/components/base/page-header"
import { routes } from "@/config/routes"
import StockTransferCreate from "@/modules/scm/components/containers/invenory/stock-transfer/stock-transfer-create"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import PencilIcon from "@/components/icons/pencil"
import { Button } from "@/components/ui"
import { useTranslations } from "next-intl"

const pageHeader = {
  title: "text-stock-transfer-view",
  breadcrumb: [
    {
      name: "text-inventory",
    },
    {
      name: "text-stock-transfer-list",
      href: routes.scm.inventory.stockTransfer.stockTransfer,
    },
    {
      name: "text-stock-transfer-view",
    },
  ],
}

export default function StockTransferViewPage() {
  const params = useParams()
  const router = useRouter()
  const t = useTranslations("common")
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.scm.inventory.stockTransfer.editAllStockTransfer(
              Number(params.id)
            )}

            icon={<PencilIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          />
          <Button onClick={() => router.back()}>{t("text-back")}</Button>
        </div>
      </PageHeader>
      <StockTransferCreate id={Number(params?.id)} mode="view" />
    </>

  )
}
