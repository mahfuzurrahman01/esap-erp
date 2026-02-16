"use client"

import React from "react"
import ExportButton from "@/components/ui/export-button"

const headers = [
  "Client Company",
  "Number of Campaigns",
  "Quarter",
  "Month",
  "Year",
  "Source",
].join(", ")

const transformData = (data: any) =>
  data.map((item: any) => ({
    clientCompany: item.clientCompany,
    numberOfCampaign: item.numberOfCampaign,
    quarter: item.quarter,
    month: item.month,
    year: item.year,
    source: item.source || ""
  }))

export default function ExportCampaignsReport({ data }: { data: any }) {
  const campaignsData = data || []
  return (
    <ExportButton
      data={transformData(campaignsData)}
      fileName="campaigns-data"
      header={headers}
    />
  )
}