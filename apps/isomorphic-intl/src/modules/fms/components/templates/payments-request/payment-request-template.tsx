"use client"

import { useTranslations } from "next-intl"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import { PrintIcon } from "@/components/icons/print"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import TranslatableButton from "@/modules/fms/components/base/translatable-button"
import CreateEditPaymentRequestForm from "@/modules/fms/components/containers/payment-request/create-edit-payment-request-form"
import CancelIcon from "@/components/icons/cancel"
import { usePaymentRequestById, useUpdatePaymentRequestStatus } from "@/modules/fms/hooks/use-payments-request"
import { toast } from "react-hot-toast"

export default function PaymentRequestTemplate({
  id,
  pageHeader,
}: {
  id: number
  pageHeader: PageHeaderTypes
}) {
  const t = useTranslations("common")
  const { data: paymentRequest, refetch } = usePaymentRequestById(id)
  const { mutate: updateStatus, isPending } = useUpdatePaymentRequestStatus()

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <TranslatableButton
            href={routes.fms.printPaymentRequest(id)}
            icon={<PrintIcon className="h-[17px] w-[17px]" />}
            variant="outline"
          />
          {paymentRequest?.status !== "Cancelled" && paymentRequest?.status === "Approved" && (
            <TranslatableButton
              href={routes.fms.createPayment}
              title="text-create-payment-entry"
            />
          )}
          {paymentRequest?.status !== "Cancelled" && (
            <Button
              disabled={isPending}
              onClick={() => {
                updateStatus(
                  { id, status: "Cancelled" },
                  {
                    onSuccess: () => {
                      toast.success(t("text-payment-request-cancelled"))
                      refetch()
                    },
                  }
                )
              }}>
              {t("text-cancel")}
            </Button>
          )}
        </div>
      </PageHeader>
      <CreateEditPaymentRequestForm id={id} mode="view" />
    </>
  )
}
