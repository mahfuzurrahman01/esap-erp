"use client"

import { useParams, useRouter } from "next/navigation"
import React from "react"

import { useTranslations } from "next-intl"

import PageHeader from "@/components/base/page-header"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateEditInvoiceBills from "@/modules/scm/components/containers/procurement/invoice-bills/create-invoice-bills"
import { useInvoiceById } from "@/modules/scm/hooks/procurement/invoice/use-invoice"
import { Invoice } from "@/modules/scm/types/procurement/invoice/invoice-types"
import { PrintIcon } from "@/components/icons/print"
import PageLoading from "@/modules/scm/components/base/page-loading"

export const pageHeader = {
  title: "text-invoice-bill-details",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-invoice-bills-list",
      href: routes.scm.procurement.invoiceBills.invoiceBills,
    },
    {
      name: "text-invoice-bill-details",
    },
  ],
}

export default function InvoiceBillDetailsPage() {
  const t = useTranslations("common")
  const { id } = useParams()
  const router = useRouter()
  const { data: invoiceBillData, isLoading } = useInvoiceById(Number(id))
  if (isLoading) return <PageLoading />
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
           <TranslatableButton
            href={routes.scm.procurement.invoiceBills.printInvoiceBills(
              Number(id)
            )}
            icon={<PrintIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          />
          {/* <TranslatableButton

            href={routes.scm.procurement.invoiceBills.editInvoiceBills(
              Number(id)
            )}
            icon={<PencilIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          /> */}
          <Button onClick={() => router.back()}>{t("text-back")}</Button>
        </div>
      </PageHeader>
      <CreateEditInvoiceBills
        isEditForm={false}
        isViewForm={true}
        initialData={invoiceBillData as Invoice}
      />
    </>
  )
}
