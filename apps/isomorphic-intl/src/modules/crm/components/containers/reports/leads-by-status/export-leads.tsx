"use client"

import React from "react"
import ExportButton from "@/components/ui/export-button"

const headers = [
  "SL",
  "Client Company",
  "Number of Leads",
  "Quarter",
  "Month",
  "Year",
  "Lead Source",
].join(", ")

const transformData = (data: any) =>
  data.map((item: any) => ({
    sl: item.sl,
    clientCompany: item.clientCompany,
    numbersOfLead: item.numbersOfLead,
    quarter: item.quarter,
    month: item.month,
    year: item.year,
    leadSource: item.leadSource || ""
  }))

export default function ExportLeadsReport(data: any) {
  const leadsData = data.data || []
  console.log("leadsData",leadsData)
  return (
    <ExportButton
      data={transformData(leadsData)}
      fileName="leads-data"
      header={headers}
    />
  )
}