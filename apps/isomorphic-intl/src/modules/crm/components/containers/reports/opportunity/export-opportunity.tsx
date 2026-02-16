"use client"

import React from "react"
import ExportButton from "@/components/ui/export-button"

const headers = [
  "Stage",
  "Stage Count",
  "Customer Name",
  "Closing Date",
  "Probability",
  "Amount",
].join(", ")

const transformData = (data: any) =>
  data.map((item: any) => ({
    stage: item.stage,
    stageCount: item.stageCount,
    customerName: item.customerName || "",
    closingDate: item.closingDate,
    probability: item.probability,
    amount: item.amount,
  }))

export default function ExportOpportunity({ data }: { data: any }) {
  // console.log('data 1', data)
  return (
    <ExportButton
      data={transformData(data)}
      fileName="Opportunity-data"
      header={headers}
    />
  )
}