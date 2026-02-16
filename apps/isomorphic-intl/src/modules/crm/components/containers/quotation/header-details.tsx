import Link from "next/link"
import React, { useEffect, useState } from "react"

import { pdf } from "@react-pdf/renderer"
import { useTranslations } from "next-intl"
import { HiPauseCircle } from "react-icons/hi2"
import { useReactToPrint } from "react-to-print"
import { Tooltip } from "rizzui/tooltip"

import PageHeader, { PageHeaderTypes } from "@/components/base/page-header"
import { ApproveIcon } from "@/components/icons/crm/appprove"
import { DownloadIcon } from "@/components/icons/crm/download"
import { RejectIcon } from "@/components/icons/crm/reject"
import PencilIcon from "@/components/icons/pencil"
import { PrintIcon } from "@/components/icons/print"
import { Button } from "@/components/ui"
import { routes } from "@/config/routes"
import { useUpdateApproval } from "@/modules/crm/hooks/use-approval"
import { QuotationDetailsView } from "@/modules/crm/types/quotation"

import { responseForApproval } from "../../../../../components/base/notifications/approval-utils"
import QuotationPdfDocument from "./quotation-pdf-document"
import { useProductList } from "@/modules/scm/hooks"

type QuotationDetailsHeaderProps = {
  pageHeader: PageHeaderTypes
  quotationData: QuotationDetailsView | undefined
  refetch: () => void
  printRef: any
  id: string
}

export default function QuotationDetailsHeader({
  pageHeader,
  quotationData,
  refetch,
  printRef,
  id,
}: QuotationDetailsHeaderProps) {
  const tableT = useTranslations("table")
  const updateApproval = useUpdateApproval()
  const reactToPrintContent = () => printRef.current
  const handlePrint = useReactToPrint({
    documentTitle: `Quotation_${id}`,
  })
  const { data: productList }: any = useProductList({ pageSize: 100 })

  const [productNames, setProductNames] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (!quotationData || !productList?.data) return
    const productDataMap: { [key: string]: string } = {}
    quotationData?.quotationDetails?.forEach((item: any) => {
      const product = productList?.data.find((p: any) => p.id == item.productId)
      if (product) {
        productDataMap[item.productId] = product.productName
      }
    })
    setProductNames(productDataMap)
  }, [quotationData, productList])

  const handleDownload = async () => {
    if (!quotationData) return
    const quotationDetails = quotationData?.quotationDetails?.map((item: any) => ({
      id: item.productId,
      productName: productNames[item.productId] || "Unknown Product",
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }))

    try {
      const blob = await pdf(
        <QuotationPdfDocument data={quotationData} quotationDetails={quotationDetails} />
      ).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `quotation-${quotationData?.quotationNo}.pdf`
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
        {quotationData?.approvalStatus?.toLowerCase() != "draft" && (
          <>
          {quotationData?.approvalStatus !== "Approved" && (
            <Tooltip
              size="sm"
              content={tableT("table-text-approve")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Button
                variant="outline"
                onClick={async function () {
                  await responseForApproval(
                    updateApproval,
                    quotationData?.id!,
                    "Approved",
                    4 // approval type 4 for quotation
                  )
                  refetch()
                }}>
                <ApproveIcon className="size-5" />
              </Button>
            </Tooltip>)}
            {quotationData?.approvalStatus !== "Hold" && (
            <Tooltip
              size="sm"
              content={tableT("table-text-hold")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Button
                variant="outline"
                onClick={async function () {
                  await responseForApproval(
                    updateApproval,
                    quotationData?.id!,
                    "Hold",
                    4 // approval type 4 for quotation
                  )
                  refetch()
                }}>
                <HiPauseCircle className="size-5" />
              </Button>
            </Tooltip>)}
            {quotationData?.approvalStatus !== "Declined" && (
            <Tooltip
              size="sm"
              content={tableT("table-text-declined")}
              placement="top"
              className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
              arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
              color="invert">
              <Button
                variant="outline"
                onClick={async function () {
                  await responseForApproval(
                    updateApproval,
                    quotationData?.id!,
                    "Declined",
                    4 // approval type 4 for quotation
                  )
                  refetch()
                }}>
                <RejectIcon className="size-5" />
              </Button>
            </Tooltip>)}
          </>
        )}
        <Tooltip
          size="sm"
          content={tableT("table-text-pdf")}
          placement="top"
          className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
          arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
          color="invert">
          <Button variant="outline" onClick={handleDownload}>
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
        <Link href={routes.crm.editQuotation(id)} className="w-full @lg:w-auto">
          <Tooltip
            size="sm"
            content={tableT("table-text-edit")}
            placement="top"
            className="dropdown-gr card-shadow !rounded-lg border-transparent bg-paper text-title dark:bg-paper dark:text-title"
            arrowClassName="dark:fill-paper [&>path]:stroke-transparent"
            color="invert">
            <Button variant="outline">
              <PencilIcon className="h-[17px] w-[17px]" />
            </Button>
          </Tooltip>
        </Link>
      </div>
    </PageHeader>
  )
}
