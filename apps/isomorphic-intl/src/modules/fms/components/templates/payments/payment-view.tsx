"use client"

import { useRef } from "react"
import type { MouseEvent } from "react"

import { useReactToPrint } from "react-to-print"

import PageHeader from "@/components/base/page-header"
import { DownloadIcon } from "@/components/icons/download"
import { PrintIcon } from "@/components/icons/print"
import { Button } from "@/components/ui"
import PaymentInformation from "@/modules/fms/components/containers/payments/view/payment-information"
import { usePaymentById } from "@/modules/fms/hooks/use-payments"

export default function PaymentView({ id }: { id: number }) {
  const { data: payment } = usePaymentById(id)
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef })

  const onPrintClick = (e: MouseEvent) => {
    e.preventDefault()
    if (reactToPrintFn) {
      reactToPrintFn()
    }
  }

  return (
    <>
      <PageHeader title="text-print">
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button>
            <DownloadIcon className="h-[17px] w-[17px]" />
          </Button>
          <Button onClick={onPrintClick}>
            <PrintIcon className="h-[17px] w-[17px]" />
          </Button>
        </div>
      </PageHeader>

      <section className="print-a4 mx-auto mt-5 max-w-[1120px] @container">
        <PaymentInformation data={payment!} ref={contentRef} />
      </section>
    </>
  )
}
