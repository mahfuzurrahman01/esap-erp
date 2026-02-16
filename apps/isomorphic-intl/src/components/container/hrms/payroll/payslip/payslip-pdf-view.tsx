"use client"

import Image from "next/image"
import React, { useRef } from "react"

import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useTranslations } from "next-intl"
import { BsBuilding } from "react-icons/bs"
import { useReactToPrint } from "react-to-print"
import { Text, Title } from "rizzui"

import FileDownloadIcon from "@/components/icons/file-download-icon"
import PrintIconWhite from "@/components/icons/hrms/print-icon"
import { Button } from "@/components/ui"
import Box from "@/components/ui/box"
import BoxContainer from "@/components/ui/box-container"
import BoxGroup from "@/components/ui/box-group"
import PreviewHeader from "@/components/ui/preview/preview-header"
import { Skeleton } from "@/components/ui/skeleton"
import TableGrid from "@/components/ui/table-grid"
import { Payslip } from "@/types/hrms/payroll/payslip.types"

import { getPayslipStatusBadge } from "./payslip-progress-options"
import { deductionsColumns, earningsColumns } from "./payslip-utils"

interface PayslipPdfViewProps {
  data?: Payslip
}

const PayslipPdfView = React.forwardRef<HTMLDivElement, PayslipPdfViewProps>(
  ({ data }, ref) => {
    const componentRef = useRef(null)
    const t = useTranslations("form")

    const earningRules =
      data?.employeeContract?.salaryStructure?.salaryRules?.filter(
        (rule) => rule.salaryCategory?.transactionType === "Credit"
      ) || []

    const deductionRules =
      data?.employeeContract?.salaryStructure?.salaryRules?.filter(
        (rule) => rule.salaryCategory?.transactionType === "Debit"
      ) || []

    const handlePrint = useReactToPrint({
      contentRef: componentRef,
    })

    const handleDownload = async () => {
      const element = componentRef.current
      if (!element) return

      try {
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
        })

        const imgWidth = 210
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        const pdf = new jsPDF("p", "mm", "a4")
        const imgData = canvas.toDataURL("image/png")

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
        pdf.save(`payslip-${data?.referenceId || "download"}.pdf`)
      } catch (error) {
        console.error("Error generating PDF:", error)
      }
    }

    const renderSkeleton = () => (
      <>
        <BoxGroup
          title={t("form-employee-information")}
          className="pt-4 @2xl:pt-7 @3xl:pt-9"
          childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-48" />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-48" />
                </div>
              ))}
            </div>
          </div>
        </BoxGroup>

        <BoxGroup
          title={t("form-earnings")}
          className="pt-4 @2xl:pt-7 @3xl:pt-9"
          childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </BoxGroup>

        <BoxGroup
          title={t("form-deductions")}
          className="pt-4 @2xl:pt-7 @3xl:pt-9"
          childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </BoxGroup>
      </>
    )

    if (!data) {
      return (
        <Box className="flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:px-4 @3xl:pt-11">
          <BoxContainer>
            <div className="flex flex-col gap-3">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-6 w-48" />
            </div>
            {renderSkeleton()}
          </BoxContainer>
        </Box>
      )
    }

    return (
      <Box
        ref={ref}
        className="print-content print:non-scrollable flex grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:px-4 @3xl:pt-11">
        <BoxContainer>
          <div ref={componentRef}>
            <PreviewHeader
              title={t("form-payslip")}
              subtitle={`${t("form-payslip-for")} ${data.month} ${data.year}`}
            />

            <BoxGroup
              title={t("form-employee-information")}
              className="pt-4 @2xl:pt-7 @3xl:pt-9"
              childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
              <div className="grid grid-cols-2 gap-6 rounded-lg border-none bg-gray-100 p-6 dark:bg-gray-700">
                <div>
                  <Title as="h6" className="mb-4 text-sm font-semibold">
                    {t("form-employee-details")}
                  </Title>
                  <div className="space-y-2">
                    <Text>
                      <span className="font-medium">{t("form-name")}:</span>{" "}
                      {data.employeeContract?.employee?.firstName}{" "}
                      {data.employeeContract?.employee?.lastName}
                    </Text>
                    <Text>
                      <span className="font-medium">{t("form-badge-id")}:</span>{" "}
                      {data.employeeContract?.employee?.badgeId}
                    </Text>
                    <Text>
                      <span className="font-medium">
                        {t("form-department")}:
                      </span>{" "}
                      {
                        data.employeeContract?.employee?.department
                          ?.departmentName
                      }
                    </Text>
                    <Text>
                      <span className="font-medium">
                        {t("form-job-position")}:
                      </span>{" "}
                      {
                        data.employeeContract?.employee?.jobPosition
                          ?.jobPositionName
                      }
                    </Text>
                  </div>
                </div>

                <div>
                  <Title as="h6" className="mb-4 text-sm font-semibold">
                    {t("form-salary-summary")}
                  </Title>
                  <div className="space-y-2">
                    <Text>
                      <span className="font-medium">
                        {t("form-basic-salary")}:
                      </span>{" "}
                      {data.baseSalary?.toFixed(2)}{" "}
                      {
                        data.employeeContract?.employee?.privateInformation
                          ?.currency?.currencyName
                      }
                    </Text>
                    <Text>
                      <span className="font-medium">
                        {t("form-gross-salary")}:
                      </span>{" "}
                      {data.grossSalary?.toFixed(2)}{" "}
                      {
                        data.employeeContract?.employee?.privateInformation
                          ?.currency?.currencyName
                      }
                    </Text>
                  </div>
                </div>
              </div>
            </BoxGroup>

            <div className="grid grid-cols-2 gap-6">
              <BoxGroup
                title={t("form-earnings")}
                className="pt-4 @2xl:pt-7 @3xl:pt-9"
                childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
                <TableGrid
                  data={earningRules}
                  columns={earningsColumns(data, t)}
                  gridTemplateColumns="60% 40%"
                  className="rounded-lg border"
                />
              </BoxGroup>

              <BoxGroup
                title={t("form-deductions")}
                className="pt-4 @2xl:pt-7 @3xl:pt-9"
                childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
                {deductionRules.length > 0 ? (
                  <TableGrid
                    data={deductionRules}
                    columns={deductionsColumns(data, t)}
                    gridTemplateColumns="60% 40%"
                    className="rounded-lg border"
                  />
                ) : (
                  <Text className="text-sm text-gray-500">
                    {t("form-no-deductions-found")}
                  </Text>
                )}
              </BoxGroup>
            </div>

            <BoxGroup
              title={t("form-net-payable")}
              className="pt-4 @2xl:pt-7 @3xl:pt-9"
              childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
              <div className="w-1/2 rounded-lg border bg-gray-50 p-4">
                <div className="flex justify-between">
                  <Text className="font-semibold">
                    {t("form-net-payable")}:
                  </Text>
                  <Text className="font-bold text-green-600">
                    {data.netPayableSalary?.toFixed(2)}{" "}
                    {
                      data.employeeContract?.employee?.privateInformation
                        ?.currency?.currencyName
                    }
                  </Text>
                </div>
              </div>
            </BoxGroup>
          </div>
        </BoxContainer>
      </Box>
    )
  }
)

PayslipPdfView.displayName = "PayslipPdfView"

export default PayslipPdfView
