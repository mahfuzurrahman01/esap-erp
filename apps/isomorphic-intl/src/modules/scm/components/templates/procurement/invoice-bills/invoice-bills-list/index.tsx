"use client"

import PageHeader from "@/components/base/page-header"
import InvoiceBillsTable from "@/modules/scm/components/containers/procurement/invoice-bills/invoice-bills-list"
import Link from "next/link"
import { routes } from "@/config/routes"
import { Button } from "@/components/ui"
import { PiPlusBold } from "react-icons/pi"
import { useTranslations } from "next-intl"

const pageHeader = {
  title: "text-purchase-invoice-list",
  breadcrumb: [
    {
      name: "text-procurement",
    },
    {
      name: "text-purchase-invoice-list",
    },
  ],
}

export default function InvoiceBillsListPage() {
  const t = useTranslations("form")
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.scm.procurement.invoiceBills.createInvoiceBill}
            className="w-full @lg:w-auto">
            <Button as="span">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              {t("form-create")}
            </Button>
          </Link>
        </div>
      </PageHeader>
      <InvoiceBillsTable />
    </>
  )
}
