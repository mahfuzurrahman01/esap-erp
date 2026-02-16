import Link from "next/link"
import React, { useEffect, useState } from "react"

import { pdf } from "@react-pdf/renderer"
import { useTranslations } from "next-intl"
import { useReactToPrint } from "react-to-print"
import { Tooltip } from "rizzui/tooltip"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import { DownloadIcon } from "@/components/icons/crm/download"
import PencilIcon from "@/components/icons/pencil"
import { PrintIcon } from "@/components/icons/print"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"

import { useProductList } from "@/modules/scm/hooks"
import PaymentsIcon from "@/components/icons/paymets"
import SalesInvoicePdfDocument from "./invoice-pdf-document"

type salesInvoiceDetailsHeaderProps = {
  pageHeader: PageHeaderTypes
  salesInvoiceData: any
  printRef: any
}

export default function SalesInvoiceDetailsHeader({
  pageHeader,
  salesInvoiceData,
  printRef,
}: salesInvoiceDetailsHeaderProps) {
  const tableT = useTranslations("table")
  const reactToPrintContent = () => printRef.current
  const handlePrint = useReactToPrint({
    documentTitle: `SalesOrder_${salesInvoiceData?.id}`,
  })
  const { data: productList }: any = useProductList({ pageSize: 100 })

  const [productNames, setProductNames] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (!salesInvoiceData || !productList?.data) return
    const productDataMap: { [key: string]: string } = {}
    salesInvoiceData?.invoiceProductDetailsDTOs?.forEach((item: any) => {
      const product = productList?.data.find((p: any) => p.id == item.productId)
      if (product) {
        productDataMap[item.productId] = product.productName
      }
    })
    setProductNames(productDataMap)
  }, [salesInvoiceData, productList])

  const handleDownload = async () => {
    if (!salesInvoiceData) return
    const salesOrderDetails = salesInvoiceData?.invoiceProductDetailsDTOs?.map((item: any) => ({
      id: item.productId,
      productName: productNames[item.productId] || "Unknown Product",
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }))

    try {
      const blob = await pdf(
        <SalesInvoicePdfDocument data={salesInvoiceData} salesInvoiceDetails={salesOrderDetails} />
      ).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `sales-invoice-${salesInvoiceData?.shortOrder}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  return (
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Tooltip
            size="sm"
            content={tableT("table-text-payment")}
            placement="top"
            className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
            arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
            color="invert">
            <Link
              href={routes.crm.payInvoice(salesInvoiceData?.id)}
              className="w-full @lg:w-auto">
              <Button
                variant="outline">
                <PaymentsIcon className="h-[17px] w-[17px]" />
              </Button>
            </Link>
          </Tooltip>
          <Tooltip
            size="sm"
            content={tableT("table-text-pdf")}
            placement="top"
            className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
            arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
            color="invert">
            <Button
              variant="outline"
              onClick={handleDownload}>
              <DownloadIcon className="h-[20px] w-[20px]" />
            </Button>
          </Tooltip>
          <Tooltip
            size="sm"
            content={tableT("table-text-print")}
            placement="top"
            className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
            arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
            color="invert">
            <Button
              variant="outline"
              onClick={() => handlePrint(reactToPrintContent)}>
              <PrintIcon className="h-[17px] w-[17px]" />
            </Button>
          </Tooltip>
          <Tooltip
            size="sm"
            content={tableT("table-text-edit")}
            placement="top"
            className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
            arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
            color="invert">
            <Link
              href={routes.crm.editInvoice(salesInvoiceData?.id)}
              className="w-full @lg:w-auto">
              <Button
                variant="outline">
                <PencilIcon className="h-[17px] w-[17px]" />
              </Button>
            </Link>
          </Tooltip>
        </div>
      </PageHeader>
  )
}
