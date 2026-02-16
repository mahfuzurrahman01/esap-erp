"use client"

import Link from "next/link"

import { PiArrowUpRightBold } from "react-icons/pi"
import { ActionIcon } from "rizzui/action-icon"

import { Badge } from "@/components/ui"
import { routes } from "@/config/routes"
import { usePaymentList } from "@/modules/fms/hooks"
import { PaymentList as PaymentListType } from "@/modules/fms/types"
import { formatDate } from "@/utils/format-date"

import BoxLayout from "./box-layout"

function getBadgeColorByStatus(status: string) {
  switch (status) {
    case "Submitted":
      return "info"
    case "Internal Transfer":
      return "purple"
    case "Paid":
      return "emerald"
    case "Cleared":
      return "primary"
    case "Cancelled":
      return "error"
    default:
      return "gray"
  }
}

export default function PaymentList() {
  const { data: payments } = usePaymentList({ pageSize: 5 })

  return (
    <BoxLayout
      title="Payment List"
      className="col-span-full @3xl:col-span-4"
      headingRight={
        <Link href={routes.fms.payments}>
          <ActionIcon
            size="lg"
            variant="flat"
            rounded="full"
            className="shrink-0 grow-0 basis-auto border-gray-500/20 bg-gray-500/20 text-title">
            <PiArrowUpRightBold className="h-6 w-6" />
          </ActionIcon>
        </Link>
      }>
      <div className="flex flex-col gap-5">
        {payments?.data?.map((payment: PaymentListType) => (
          <Link key={payment.id} href={`${routes.fms.payments}/${payment.id}`}>
            <h3 className="text-xl font-bold transition-all duration-300 hover:text-primary @3xl:text-2xl">
              {payment.serialNumber}
            </h3>
            <div className="flex items-center justify-between gap-2 pt-2">
              <div>
                <p className="text-sm font-semibold text-title">
                  {formatDate(payment.postingDate)}
                </p>
                <p className="text-base">Payment Date</p>
              </div>
              <div>
                <Badge
                  variant="flat"
                  color={getBadgeColorByStatus(payment.paymentStatus ?? "")}
                  rounded="md">
                  {payment.paymentStatus}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </BoxLayout>
  )
}
