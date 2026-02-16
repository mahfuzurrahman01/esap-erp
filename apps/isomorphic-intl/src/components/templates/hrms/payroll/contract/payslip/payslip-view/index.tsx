"use client"

import type { MouseEvent } from "react"
import { useRef } from "react"

import { pdf } from "@react-pdf/renderer"
import { useReactToPrint } from "react-to-print"

import PageHeader from "@/components/base/page-header"
import PayslipPdfDocument from "@/components/container/hrms/payroll/payslip/payslip-pdf-document"
import PayslipPdfView from "@/components/container/hrms/payroll/payslip/payslip-pdf-view"
import { DownloadIcon } from "@/components/icons/download"
import { PrintIcon } from "@/components/icons/print"
import { Button } from "@/components/ui"
import { usePayslipById } from "@/hooks/hrms"

export default function PayslipView({ id }: { id: number }) {
  const { data: payslip } = usePayslipById(id)
  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({
    contentRef,
    onAfterPrint: () => {
      console.log("Printed")
    },
    pageStyle: `
      @media print {
        body {
          background: white !important;
          color: black !important;
        }
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `,
  })

  const onPrintClick = (e: MouseEvent) => {
    e.preventDefault()
    if (reactToPrintFn) {
      reactToPrintFn()
    }
  }

  const handleDownload = async () => {
    if (!payslip) return

    try {
      // Generate PDF document
      const blob = await pdf(<PayslipPdfDocument data={payslip} />).toBlob()

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `payslip-${payslip?.month}-${payslip?.year}.pdf`

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
        <PayslipPdfView data={payslip!} ref={contentRef} />
      </section>
    </>
  )
}
