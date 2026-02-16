"use client"

import React, { useRef } from "react"

import { useTranslations } from "next-intl"

import { PageHeaderTypes } from "@/components/base/page-header"
import { Skeleton } from "@/components/ui"
import Box from "@/components/ui/box"
import BoxContainer from "@/components/ui/box-container"
import BoxGroup from "@/components/ui/box-group"
import SkeletonLoader from "@/components/base/skeleton-loader"
import QuotationDetailsHeader from "@/modules/crm/components/containers/quotation/header-details"
import QuotationDetailsContainer from "@/modules/crm/components/containers/quotation/view"
import { useQuotationById } from "@/modules/crm/hooks/use-quotation"
import { QuotationDetailsView } from "@/modules/crm/types/quotation"

export default function QuotationDetailsTemplate({
  pageHeader,
  id,
}: {
  pageHeader: PageHeaderTypes
  id: string
}) {
  const printRef = useRef(null)
  const { data, isLoading, refetch } = useQuotationById(id) as {
    data: { data: QuotationDetailsView } | undefined
    isLoading: boolean
    refetch: () => void
  }
  const quotationData = data?.data
  const t = useTranslations("form")
  const renderSkeleton = () => (
    <>
      <BoxGroup
        title={t("form-information")}
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
        title={t("form-address")}
        className="pt-4 @2xl:pt-7 @3xl:pt-9"
        childrenContainerClassName="@2xl:grid-cols-1 @4xl:col-span-12 pt-4">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      </BoxGroup>

      <BoxGroup
        title={t("form-items")}
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

  return (
    <>
      <QuotationDetailsHeader
        pageHeader={pageHeader}
        quotationData={quotationData}
        refetch={refetch}
        printRef={printRef}
        id={id}
      />
      {isLoading ? (
        <div className="mx-auto flex w-full items-center justify-center">
          <Box className="flex max-w-[210mm] grow flex-col justify-between pt-7 @container @2xl:pt-9 @3xl:px-4 @3xl:pt-11">
            <BoxContainer>
              <div className="flex flex-col gap-3">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-6 w-48" />
              </div>
              {renderSkeleton()}
            </BoxContainer>
          </Box>
        </div>
      ) : (
        <QuotationDetailsContainer
          quotationData={quotationData}
          printRef={printRef}
        />
      )}
    </>
  )
}
