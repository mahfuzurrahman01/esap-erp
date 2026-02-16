"use client"

import { useTranslations } from "next-intl"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import PencilIcon from "@/components/icons/pencil"
import { PrintIcon } from "@/components/icons/print"
import { routes } from "@/config/routes"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateEditPaymentsForm from "@/modules/fms/components/containers/payments/create-edit-payments-form"
import { usePaymentById } from "@/modules/fms/hooks/use-payments"


export default function PaymentTemplate({
  id,
  pageHeader,
}: {
  id: number
  pageHeader: PageHeaderTypes
}) {
  const t = useTranslations("common")
  const { data: payment } = usePaymentById(id)
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.printPayment(id)}
            icon={<PrintIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          />
          {payment?.paymentStatus !== "Paid" && payment?.paymentStatus !== "Cleared" && payment?.paymentStatus !== "Internal Transfer" && (
            <TranslatableButton
              href={routes.fms.editPayment(id)}
              icon={<PencilIcon className="h-[17px] w-[17px]" />}
              variant="outline"
            />
          )}
          {/* <Button variant="outline" color="danger"> {t("text-cancel")} </Button> */}
        </div>
      </PageHeader>
      <CreateEditPaymentsForm id={id} mode="view" />
    </>
  )
}
