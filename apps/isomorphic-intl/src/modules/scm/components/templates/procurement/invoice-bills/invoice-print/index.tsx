"use client"

import type { MouseEvent } from "react"
import { useRef } from "react"

import { pdf } from "@react-pdf/renderer"
import { useReactToPrint } from "react-to-print"

import PageHeader from "@/components/base/page-header"
import { DownloadIcon } from "@/components/icons/download"
import { PrintIcon } from "@/components/icons/print"
import { Button } from "@/components/ui"
import PaymentInformation from "@/modules/scm/components/containers/procurement/invoice-bills/create-invoice-bills/view/payment-information"
import { useInvoiceById } from "@/modules/scm/hooks"

import InvoicePdfDocument from "./pdf-document"

export default function InvoicePrintView({ id }: { id: number }) {
  const { data: invoice } = useInvoiceById(id)

  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef })

  const onPrintClick = (e: MouseEvent) => {
    e.preventDefault()
    if (reactToPrintFn) {
      reactToPrintFn()
    }
  }
  const handleDownload = async () => {
    if (!invoice) return

    try {
      // Generate PDF document
      const blob = await pdf(<InvoicePdfDocument data={invoice} />).toBlob()

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `invoice-${invoice?.id}.pdf`

      // Trigger download
      document.body.appendChild(link)
      link.click()

      // Cleanup
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  return (
    <>
      <PageHeader title="text-print">
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button onClick={handleDownload}>
            <DownloadIcon className="h-[17px] w-[17px]" />
          </Button>
          <Button onClick={onPrintClick}>
            <PrintIcon className="h-[17px] w-[17px]" />
          </Button>
        </div>
      </PageHeader>

      <section className="print-a4 mx-auto mt-5 max-w-[1120px] @container">
        <PaymentInformation data={invoice!} ref={contentRef} />
      </section>
    </>
  )
}
