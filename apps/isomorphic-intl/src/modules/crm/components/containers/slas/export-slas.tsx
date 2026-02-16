"use client"

import React from "react"

import ExportButton from "@/components/ui/export-button"
import { formatDate } from "@/utils/format-date"

const headers = ["Name", "Response Time", "Resolution Time", "Status"].join(", ")

const transformData = (data: any) =>
data.map((item: any) => ({
  name: item.name || "N/A",
  responseTime: item.responseTime ? formatDate(item.responseTime, "DD/MM/YYYY") : "",
  resolutionTime: item.resolutionTime ? formatDate(item.resolutionTime, "DD/MM/YYYY") : "",
  status: item.status || "N/A",
}))

export default function ExportSlasReport({ data }: { data: any }) {
  const slasData = data || []
  return (
    <ExportButton
      data={transformData(slasData)}
      fileName="slas-data"
      header={headers}
    />
  )
}
